import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import CategoryPage from './components/category/CategoryPage';
import SubCategoryPage from './components/subcategory/SubCategoryPage';
import PackagePage from './components/package/PackagePage';
import PackageDetailPage from './components/package/PackageDetailPage';
import LatihanPage from './components/latihan/LatihanPage';
import LatihanListPage from './components/latihan/LatihanListPage';
import SettingsPage from './components/settings/SettingsPage';
import type { ChangeEvent } from 'react';
import type {
  View,
  LibraryStep,
  Category,
  SubCategory,
  LearningPackage,
  LatihanHistoryEntry,
} from './types';

const STORAGE_KEY = 'expand-brain-data';

function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return {
        categories: [],
        subCategories: [],
        packages: [],
        latihanHistory: [],
      };
    const parsed = JSON.parse(raw);
    return {
      categories: parsed.categories ?? [],
      subCategories: parsed.subCategories ?? [],
      packages: parsed.packages ?? [],
      latihanHistory: parsed.latihanHistory ?? [],
    };
  } catch {
    return {
      categories: [],
      subCategories: [],
      packages: [],
      latihanHistory: [],
    };
  }
}

const initialData = loadInitialData();

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [libraryStep, setLibraryStep] = useState<LibraryStep>('kategori');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );

  const [latihanPackageId, setLatihanPackageId] = useState<string | null>(null);
  const [latihanStep, setLatihanStep] = useState<'list' | 'session'>('list');
  const [latihanHistory, setLatihanHistory] = useState<LatihanHistoryEntry[]>(
    initialData.latihanHistory
  );
  const [viewingHistoryId, setViewingHistoryId] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>(
    initialData.categories
  );
  const [subCategories, setSubCategories] = useState<SubCategory[]>(
    initialData.subCategories
  );
  const [packages, setPackages] = useState<LearningPackage[]>(
    initialData.packages
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ categories, subCategories, packages, latihanHistory })
    );
  }, [categories, subCategories, packages, latihanHistory]);

  const handleAddCategory = (name: string) => {
    setCategories((prev) => [...prev, { id: crypto.randomUUID(), name }]);
  };
  const handleEditCategory = (id: string, name: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c))
    );
  };
  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setSubCategories((prev) => prev.filter((sc) => sc.categoryId !== id));
  };
  const handleOpenCategory = (id: string) => {
    setSelectedCategoryId(id);
    setLibraryStep('subkategori');
  };

  const handleAddSubCategory = (name: string) => {
    if (!selectedCategoryId) return;
    setSubCategories((prev) => [
      ...prev,
      { id: crypto.randomUUID(), categoryId: selectedCategoryId, name },
    ]);
  };
  const handleEditSubCategory = (id: string, name: string) => {
    setSubCategories((prev) =>
      prev.map((sc) => (sc.id === id ? { ...sc, name } : sc))
    );
  };
  const handleDeleteSubCategory = (id: string) => {
    setSubCategories((prev) => prev.filter((sc) => sc.id !== id));
    setPackages((prev) => prev.filter((pkg) => pkg.subCategoryId !== id));
  };
  const handleOpenSubCategory = (id: string) => {
    setSelectedSubCategoryId(id);
    setLibraryStep('paket');
  };

  const handleUploadPackage = (
    pkg: Omit<LearningPackage, 'id' | 'subCategoryId'>
  ) => {
    if (!selectedSubCategoryId) return;
    const newPackage: LearningPackage = {
      id: crypto.randomUUID(),
      subCategoryId: selectedSubCategoryId,
      ...pkg,
    };
    setPackages((prev) => [...prev, newPackage]);
  };
  const handleDeletePackage = (id: string) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };
  const handleOpenPackage = (id: string) => {
    setSelectedPackageId(id);
    setLibraryStep('detail-paket');
  };

  const handleStartLatihan = (packageId: string) => {
    setLatihanPackageId(packageId);
    setLatihanStep('session');
    setCurrentView('latihan');
  };

  const handleFinishLatihan = (
    entry: Omit<LatihanHistoryEntry, 'id' | 'date'>
  ) => {
    const newEntry: LatihanHistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setLatihanHistory((prev) => [newEntry, ...prev]);
  };

  const handleOpenHistory = (id: string) => {
    setViewingHistoryId(id);
  };

  const handleDeleteHistory = (id: string) => {
    setLatihanHistory((prev) => prev.filter((h) => h.id !== id));
    if (viewingHistoryId === id) {
      setViewingHistoryId(null);
    }
  };

  const handleResetData = () => {
    const confirmReset = window.confirm(
      'PERHATIAN: Apakah kamu yakin ingin menghapus SEMUA data? Kategori, paket, dan riwayat latihan akan hilang permanen!'
    );
    if (confirmReset) {
      setCategories([]);
      setSubCategories([]);
      setPackages([]);
      setLatihanHistory([]);
      localStorage.removeItem(STORAGE_KEY);
      setCurrentView('dashboard');
    }
  };

  // FUNGSI BACKUP DATA
  const handleBackupData = () => {
    const dataToBackup = {
      categories,
      subCategories,
      packages,
      latihanHistory,
    };
    const jsonString = JSON.stringify(dataToBackup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Membuat elemen link tersembunyi untuk memicu download
    const link = document.createElement('a');
    link.href = url;
    // Format nama file: expand-brain-backup-YYYY-MM-DD.json
    link.download = `expand-brain-backup-${
      new Date().toISOString().split('T')[0]
    }.json`;
    document.body.appendChild(link);
    link.click();

    // Membersihkan URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // FUNGSI RESTORE DATA
  const handleRestoreData = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        // Pengecekan sederhana apakah strukturnya sesuai
        if (parsed && typeof parsed === 'object') {
          const confirmRestore = window.confirm(
            'Memulihkan data akan menimpa data kamu yang sekarang. Lanjutkan?'
          );
          if (confirmRestore) {
            setCategories(parsed.categories || []);
            setSubCategories(parsed.subCategories || []);
            setPackages(parsed.packages || []);
            setLatihanHistory(parsed.latihanHistory || []);
            alert('Data berhasil dipulihkan!');
          }
        } else {
          alert('Format file JSON tidak sesuai.');
        }
      } catch (error) {
        alert(
          'Gagal membaca file. Pastikan itu adalah file backup JSON yang valid.'
        );
      }
    };
    reader.readAsText(file);

    // Reset nilai input agar bisa memulihkan dengan file yang sama jika dibutuhkan
    event.target.value = '';
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    if (view === 'library') setLibraryStep('kategori');
    if (view === 'latihan') {
      setLatihanStep('list');
      setViewingHistoryId(null);
    }
  };

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const selectedSubCategory = subCategories.find(
    (sc) => sc.id === selectedSubCategoryId
  );
  const selectedPackage = packages.find((pkg) => pkg.id === selectedPackageId);
  const latihanPackage = packages.find((p) => p.id === latihanPackageId);

  const subCategoriesInSelectedCategory = subCategories.filter(
    (sc) => sc.categoryId === selectedCategoryId
  );
  const packagesInSelectedSubCategory = packages.filter(
    (pkg) => pkg.subCategoryId === selectedSubCategoryId
  );

  return (
    <div className="flex h-screen bg-base-gray/30">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={currentView} />
        <main className="flex-1 overflow-y-auto p-8">
          {currentView === 'dashboard' && (
            <Dashboard
              categories={categories}
              subCategories={subCategories}
              packages={packages}
            />
          )}

          {currentView === 'library' && libraryStep === 'kategori' && (
            <CategoryPage
              categories={categories}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              onOpenCategory={handleOpenCategory}
            />
          )}

          {currentView === 'library' &&
            libraryStep === 'subkategori' &&
            selectedCategory && (
              <SubCategoryPage
                category={selectedCategory}
                subCategories={subCategoriesInSelectedCategory}
                onAddSubCategory={handleAddSubCategory}
                onEditSubCategory={handleEditSubCategory}
                onDeleteSubCategory={handleDeleteSubCategory}
                onOpenSubCategory={handleOpenSubCategory}
                onBack={() => setLibraryStep('kategori')}
              />
            )}

          {currentView === 'library' &&
            libraryStep === 'paket' &&
            selectedSubCategory && (
              <PackagePage
                subCategory={selectedSubCategory}
                packages={packagesInSelectedSubCategory}
                onUploadPackage={handleUploadPackage}
                onDeletePackage={handleDeletePackage}
                onOpenPackage={handleOpenPackage}
                onBack={() => setLibraryStep('subkategori')}
              />
            )}

          {currentView === 'library' &&
            libraryStep === 'detail-paket' &&
            selectedPackage && (
              <PackageDetailPage
                pkg={selectedPackage}
                onBack={() => setLibraryStep('paket')}
                onStartLatihan={handleStartLatihan}
              />
            )}

          {currentView === 'latihan' && latihanStep === 'list' && (
            <LatihanListPage
              history={latihanHistory}
              onOpenHistory={handleOpenHistory}
              viewingHistoryId={viewingHistoryId}
              onCloseDetail={() => setViewingHistoryId(null)}
              onDeleteHistory={handleDeleteHistory}
            />
          )}

          {currentView === 'latihan' &&
            latihanStep === 'session' &&
            latihanPackage && (
              <LatihanPage
                pkg={latihanPackage}
                onFinish={handleFinishLatihan}
                onExit={() => {
                  setSelectedPackageId(latihanPackage.id);
                  setCurrentView('library');
                  setLibraryStep('detail-paket');
                  setLatihanStep('list');
                }}
              />
            )}

          {currentView === 'latihan' &&
            latihanStep === 'session' &&
            !latihanPackage && (
              <p className="text-base-black/50">
                Belum ada package yang dipilih untuk latihan.
              </p>
            )}

          {/* UPDATE: Lempar fungsi backup dan restore ke SettingsPage */}
          {currentView === 'pengaturan' && (
            <SettingsPage
              onResetData={handleResetData}
              onBackupData={handleBackupData}
              onRestoreData={handleRestoreData}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

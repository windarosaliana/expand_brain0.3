import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import type { SubCategory, LearningPackage } from '../../types';
import PackageCard from './PackageCard';
import PackageUploadForm from './PackageUploadForm';

interface PackagePageProps {
  subCategory: SubCategory;
  packages: LearningPackage[];
  onUploadPackage: (pkg: Omit<LearningPackage, 'id' | 'subCategoryId'>) => void;
  onDeletePackage: (id: string) => void;
  onOpenPackage: (id: string) => void;
  onBack: () => void;
}

export default function PackagePage({
  subCategory,
  packages,
  onUploadPackage,
  onDeletePackage,
  onOpenPackage,
  onBack,
}: PackagePageProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-base-black/50 hover:text-base-black mb-4"
      >
        <ArrowLeft size={15} />
        Kembali ke SubKategori
      </button>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-base-black">Package</h3>
          <p className="text-xs text-base-black/40 mt-0.5">di dalam "{subCategory.name}"</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors"
        >
          <Plus size={16} />
          Upload Package
        </button>
      </div>

      {packages.length === 0 ? (
        <p className="text-sm text-base-black/40">Belum ada package.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onOpen={onOpenPackage} onDelete={onDeletePackage} />
          ))}
        </div>
      )}

      {showForm && (
        <PackageUploadForm
          onUpload={(pkg) => {
            onUploadPackage(pkg);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
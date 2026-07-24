import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import type { Category, SubCategory } from '../../types';
import SubCategoryCard from './SubCategoryCard';
import SubCategoryForm from './SubCategoryForm';

interface SubCategoryPageProps {
  category: Category;
  subCategories: SubCategory[];
  onAddSubCategory: (name: string) => void;
  onEditSubCategory: (id: string, name: string) => void;
  onDeleteSubCategory: (id: string) => void;
  onOpenSubCategory: (id: string) => void;
  onBack: () => void;
}

export default function SubCategoryPage({
  category,
  subCategories,
  onAddSubCategory,
  onEditSubCategory,
  onDeleteSubCategory,
  onOpenSubCategory,
  onBack,
}: SubCategoryPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingSubCategory = subCategories.find((sc) => sc.id === editingId);

  const handleSave = (name: string) => {
    if (editingId) {
      onEditSubCategory(editingId, name);
    } else {
      onAddSubCategory(name);
    }
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-base-black/50 hover:text-base-black mb-4"
      >
        <ArrowLeft size={15} />
        Kembali ke Kategori
      </button>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-base-black">SubKategori</h3>
          <p className="text-xs text-base-black/40 mt-0.5">di dalam "{category.name}"</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors"
        >
          <Plus size={16} />
          Tambah SubKategori
        </button>
      </div>

      {subCategories.length === 0 ? (
        <p className="text-sm text-base-black/40">Belum ada subkategori.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subCategories.map((sc) => (
            <SubCategoryCard
              key={sc.id}
              subCategory={sc}
              onOpen={onOpenSubCategory}
              onEdit={(id) => {
                setEditingId(id);
                setShowForm(true);
              }}
              onDelete={onDeleteSubCategory}
            />
          ))}
        </div>
      )}

      {showForm && (
        <SubCategoryForm
          initialName={editingSubCategory?.name}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
}
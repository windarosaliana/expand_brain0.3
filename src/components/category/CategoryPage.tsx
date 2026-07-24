import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Category } from '../../types';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';

interface CategoryPageProps {
  categories: Category[];
  onAddCategory: (name: string) => void;
  onEditCategory: (id: string, name: string) => void;
  onDeleteCategory: (id: string) => void;
  onOpenCategory: (id: string) => void;
}

export default function CategoryPage({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onOpenCategory,
}: CategoryPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingCategory = categories.find((c) => c.id === editingId);

  const handleSave = (name: string) => {
    if (editingId) {
      onEditCategory(editingId, name);
    } else {
      onAddCategory(name);
    }
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-base-black">Kategori</h3>
        <button
          onClick={() => {
            setEditingId(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors"
        >
          <Plus size={16} />
          Tambah Kategori
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-base-black/40">Belum ada kategori.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onOpen={onOpenCategory}
              onEdit={(id) => {
                setEditingId(id);
                setShowForm(true);
              }}
              onDelete={onDeleteCategory}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CategoryForm
          initialName={editingCategory?.name}
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

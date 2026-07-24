import { useState } from 'react';
import { X } from 'lucide-react';

interface CategoryFormProps {
  initialName?: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export default function CategoryForm({ initialName = '', onSave, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(initialName);

  const handleSubmit = () => {
    if (name.trim().length === 0) return;
    onSave(name.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base-black">
            {initialName ? 'Edit Kategori' : 'Tambah Kategori'}
          </h3>
          <button onClick={onCancel} className="text-base-black/40 hover:text-base-black">
            <X size={18} />
          </button>
        </div>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Nama kategori"
          className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
        />

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg text-base-black/60 hover:bg-black/5"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
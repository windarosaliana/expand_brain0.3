import { Pencil, Trash2, ChevronRight, FolderTree } from 'lucide-react';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CategoryCard({
  category,
  onOpen,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 flex items-center justify-between group">
      <button
        onClick={() => onOpen(category.id)}
        className="flex items-center gap-3 flex-1 text-left"
      >
        <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 flex items-center justify-center shrink-0">
          <FolderTree size={16} className="text-accent-cyan" />
        </div>
        <span className="text-sm font-medium text-base-black">
          {category.name}
        </span>
      </button>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(category.id)}
          className="p-2 rounded-lg text-base-black/40 hover:bg-black/5 hover:text-base-black"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 rounded-lg text-base-black/40 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={15} />
        </button>
        <button
          onClick={() => onOpen(category.id)}
          className="p-2 rounded-lg text-base-black/30 group-hover:text-accent-cyan"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

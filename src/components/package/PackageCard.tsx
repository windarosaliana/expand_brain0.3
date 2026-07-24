import { Trash2, ChevronRight, Package as PackageIcon } from 'lucide-react';
import type { LearningPackage } from '../../types';

interface PackageCardProps {
  pkg: LearningPackage;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PackageCard({ pkg, onOpen, onDelete }: PackageCardProps) {
  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 flex items-center justify-between group">
      <button onClick={() => onOpen(pkg.id)} className="flex items-center gap-3 flex-1 text-left">
        <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 flex items-center justify-center shrink-0">
          <PackageIcon size={16} className="text-accent-cyan" />
        </div>
        <div>
          <p className="text-sm font-medium text-base-black">{pkg.name}</p>
          <p className="text-xs text-base-black/40">
            {pkg.materi.length} materi · {pkg.soal.length} soal
          </p>
        </div>
      </button>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onDelete(pkg.id)}
          className="p-2 rounded-lg text-base-black/40 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={15} />
        </button>
        <button
          onClick={() => onOpen(pkg.id)}
          className="p-2 rounded-lg text-base-black/30 group-hover:text-accent-cyan"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
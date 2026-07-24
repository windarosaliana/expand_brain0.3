import {
  FolderTree,
  Layers,
  Package,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import type { Category, SubCategory, LearningPackage } from '../../types';

interface DashboardProps {
  categories: Category[];
  subCategories: SubCategory[];
  packages: LearningPackage[];
}

export default function Dashboard({
  categories,
  subCategories,
  packages,
}: DashboardProps) {
  const totalSoal = packages.reduce((acc, p) => acc + (p.soal?.length ?? 0), 0);
  const totalMateri = packages.reduce(
    (acc, p) => acc + (p.materi?.length ?? 0),
    0
  );

  const stats = [
    { label: 'Total Kategori', value: categories.length, icon: FolderTree },
    { label: 'Total SubKategori', value: subCategories.length, icon: Layers },
    { label: 'Total Package', value: packages.length, icon: Package },
    { label: 'Total Materi', value: totalMateri, icon: BookOpen },
    { label: 'Total Soal', value: totalSoal, icon: HelpCircle },
  ];

  return (
    <div className="relative min-h-full">
      {/* Watermark besar */}
      <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="text-[5rem] md:text-[7rem] font-black text-base-black/[0.04] leading-none text-center">
          BY WINDA CHANTIQ
          <br />
          HEHE
        </span>
      </div>

      {/* Konten */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-black/5"
          >
            <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-3">
              <Icon size={20} className="text-accent-cyan" />
            </div>
            <p className="text-2xl font-bold text-base-black">{value}</p>
            <p className="text-sm text-base-black/50 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

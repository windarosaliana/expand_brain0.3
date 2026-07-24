import { useState } from 'react';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import type { LearningPackage } from '../../types';
import MateriViewer from '../materi/MateriViewer';
import SoalViewer from '../soal/SoalViewer';

interface PackageDetailPageProps {
  pkg: LearningPackage;
  onBack: () => void;
  onStartLatihan: (packageId: string) => void;
}

type Tab = 'materi' | 'soal';

export default function PackageDetailPage({
  pkg,
  onBack,
  onStartLatihan,
}: PackageDetailPageProps) {
  const [tab, setTab] = useState<Tab>('materi');

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-base-black/50 hover:text-base-black mb-4"
      >
        <ArrowLeft size={15} />
        Kembali ke Package
      </button>

      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-base-black">{pkg.name}</h3>
        <button
          onClick={() => onStartLatihan(pkg.id)}
          disabled={pkg.soal.length === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <PlayCircle size={16} />
          Mulai Latihan
        </button>
      </div>
      <p className="text-xs text-base-black/40 mb-5">
        {pkg.materi.length} materi · {pkg.soal.length} soal
      </p>

      <div className="flex gap-1 mb-5 bg-black/5 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab('materi')}
          className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
            tab === 'materi'
              ? 'bg-white text-base-black shadow-sm'
              : 'text-base-black/50'
          }`}
        >
          Materi
        </button>
        <button
          onClick={() => setTab('soal')}
          className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
            tab === 'soal'
              ? 'bg-white text-base-black shadow-sm'
              : 'text-base-black/50'
          }`}
        >
          Soal
        </button>
      </div>

      {tab === 'materi' && <MateriViewer materi={pkg.materi} />}
      {tab === 'soal' && <SoalViewer soal={pkg.soal} />}
    </div>
  );
}

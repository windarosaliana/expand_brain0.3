import { ArrowLeft, ClipboardList, ChevronRight, Trash2 } from 'lucide-react';
import type { LatihanHistoryEntry } from '../../types';
import LatihanResult from './LatihanResult';

interface LatihanListPageProps {
  history: LatihanHistoryEntry[];
  onOpenHistory: (id: string) => void;
  viewingHistoryId: string | null;
  onCloseDetail: () => void;
  // Tambahan tipe untuk prop hapus
  onDeleteHistory: (id: string) => void;
}

export default function LatihanListPage({
  history,
  onOpenHistory,
  viewingHistoryId,
  onCloseDetail,
  onDeleteHistory,
}: LatihanListPageProps) {
  const viewingEntry = history.find((h) => h.id === viewingHistoryId);

  if (viewingEntry) {
    return (
      <div>
        <button
          onClick={onCloseDetail}
          className="flex items-center gap-1.5 text-sm text-base-black/50 hover:text-base-black mb-4"
        >
          <ArrowLeft size={15} />
          Kembali ke Daftar Latihan
        </button>
        <LatihanResult
          packageName={viewingEntry.packageName}
          soal={viewingEntry.soal}
          answers={viewingEntry.answers}
          onRetry={onCloseDetail}
          onExit={onCloseDetail}
        />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <p className="text-sm text-base-black/40">
        Belum ada latihan yang dikerjakan. Buka sebuah Package lalu klik "Mulai Latihan".
      </p>
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-base-black mb-5">Riwayat Latihan</h3>
      <div className="flex flex-col gap-2">
        {history.map((entry) => {
          const percentage = Math.round((entry.correctCount / entry.total) * 100);
          return (
            <div
              key={entry.id}
              onClick={() => onOpenHistory(entry.id)}
              className="w-full flex items-center justify-between bg-white rounded-xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-4 py-3 text-left hover:border-accent-cyan/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 flex items-center justify-center shrink-0">
                  <ClipboardList size={16} className="text-accent-cyan" />
                </div>
                <div>
                  <p className="text-sm font-medium text-base-black">{entry.packageName}</p>
                  <p className="text-xs text-base-black/40">
                    {new Date(entry.date).toLocaleString('id-ID')} · {entry.correctCount}/{entry.total} benar
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-base-black">{percentage}%</span>
                <ChevronRight size={16} className="text-base-black/30 group-hover:text-accent-cyan transition-colors" />
                
                {/* Tombol Hapus */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah riwayat terbuka ketika tombol hapus diklik
                    if (window.confirm('Apakah kamu yakin ingin menghapus riwayat ini?')) {
                      onDeleteHistory(entry.id);
                    }
                  }}
                  className="p-1.5 ml-2 text-base-black/20 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus riwayat"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
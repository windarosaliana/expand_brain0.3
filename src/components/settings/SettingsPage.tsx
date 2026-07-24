import {
  Settings,
  AlertTriangle,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';
import type { ChangeEvent } from 'react';

interface SettingsPageProps {
  onResetData: () => void;
  onBackupData: () => void;
  onRestoreData: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SettingsPage({
  onResetData,
  onBackupData,
  onRestoreData,
}: SettingsPageProps) {
  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Header Pengaturan */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-base-black flex items-center justify-center shrink-0">
          <Settings size={20} className="text-accent-cyan" />
        </div>
        <h2 className="text-xl font-semibold text-base-black">Pengaturan</h2>
      </div>

      {/* Kartu Backup & Restore */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 mb-6">
        <h3 className="text-base font-semibold text-base-black mb-1">
          Backup & Pulihkan Data
        </h3>
        <p className="text-sm text-base-black/50 mb-5 leading-relaxed">
          Simpan data kamu (kategori, paket, dan riwayat) ke dalam file atau
          pulihkan data dari file backup sebelumnya.
        </p>

        <div className="flex items-center gap-3">
          {/* Tombol Backup */}
          <button
            onClick={onBackupData}
            className="flex items-center gap-2 px-4 py-2 bg-base-gray/40 hover:bg-black/5 text-base-black font-medium text-sm rounded-lg transition-colors"
          >
            <Download size={16} />
            Backup Data
          </button>

          {/* Tombol Restore (Menggunakan label yang membungkus input file hidden) */}
          <label className="flex items-center gap-2 px-4 py-2 bg-base-gray/40 hover:bg-black/5 text-base-black font-medium text-sm rounded-lg transition-colors cursor-pointer">
            <Upload size={16} />
            Pulihkan Data
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={onRestoreData}
            />
          </label>
        </div>
      </div>

      {/* Kartu Reset Data */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-1">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-base-black mb-1">
              Reset Semua Data
            </h3>
            <p className="text-sm text-base-black/50 mb-5 leading-relaxed">
              Tindakan ini akan menghapus{' '}
              <strong>
                seluruh kategori, paket pembelajaran, soal, dan riwayat latihan
              </strong>{' '}
              dari perangkat ini secara permanen. Data yang sudah dihapus tidak
              dapat dikembalikan.
            </p>
            <button
              onClick={onResetData}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Hapus Semua Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

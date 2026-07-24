import { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import type { LearningPackage, Materi, Soal } from '../../types';

interface PackageUploadFormProps {
  onUpload: (pkg: Omit<LearningPackage, 'id' | 'subCategoryId'>) => void;
  onCancel: () => void;
}

interface RawPackageJSON {
  package?: string;
  kategori?: string;
  subkategori?: string;
  materi?: Materi[];
  soal?: Soal[];
}

export default function PackageUploadForm({ onUpload, onCancel }: PackageUploadFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    try {
      const text = await file.text();
      const data: RawPackageJSON = JSON.parse(text);

      if (!data.package || typeof data.package !== 'string') {
        setError('Format JSON tidak valid: field "package" (nama package) wajib ada.');
        return;
      }
      if (!Array.isArray(data.materi)) {
        setError('Format JSON tidak valid: field "materi" harus berupa array.');
        return;
      }
      if (!Array.isArray(data.soal)) {
        setError('Format JSON tidak valid: field "soal" harus berupa array.');
        return;
      }

      setFileName(file.name);
      onUpload({
        name: data.package,
        materi: data.materi,
        soal: data.soal,
      });
    } catch {
      setError('Gagal membaca file. Pastikan file berformat JSON yang valid.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base-black">Upload Package JSON</h3>
          <button onClick={onCancel} className="text-base-black/40 hover:text-base-black">
            <X size={18} />
          </button>
        </div>

        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-black/10 rounded-lg py-8 cursor-pointer hover:border-accent-cyan/50 transition-colors">
          <UploadCloud size={28} className="text-base-black/30" />
          <span className="text-sm text-base-black/50 px-4 text-center">
            {fileName ?? 'Klik untuk pilih file .json'}
          </span>
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>

        {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

        <div className="flex justify-end mt-5">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg text-base-black/60 hover:bg-black/5"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
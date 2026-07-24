import { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import type { Materi } from '../../types';

interface MateriViewerProps {
  materi: Materi[];
}

export default function MateriViewer({ materi }: MateriViewerProps) {
  const [openId, setOpenId] = useState<string | null>(materi[0]?.id ?? null);

  if (materi.length === 0) {
    return (
      <p className="text-sm text-base-black/40">
        Belum ada materi di package ini.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {materi.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <span className="flex items-center gap-2.5 text-sm font-medium text-base-black">
                <FileText size={15} className="text-accent-cyan shrink-0" />
                {item.judul}
              </span>
              <ChevronDown
                size={16}
                className={`text-base-black/30 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-sm text-base-black/70 leading-relaxed whitespace-pre-wrap">
                  {item.konten}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

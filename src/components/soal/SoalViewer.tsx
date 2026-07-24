import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { Soal } from '../../types';

interface SoalViewerProps {
  soal: Soal[];
}

export default function SoalViewer({ soal }: SoalViewerProps) {
  const [openId, setOpenId] = useState<string | null>(soal[0]?.id ?? null);

  if (soal.length === 0) {
    return (
      <p className="text-sm text-base-black/40">
        Belum ada soal di package ini.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {soal.map((item, index) => {
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
                <HelpCircle size={15} className="text-accent-cyan shrink-0" />
                Soal {index + 1}. {item.pertanyaan}
              </span>
              <ChevronDown
                size={16}
                className={`text-base-black/30 transition-transform shrink-0 ml-2 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-0 flex flex-col gap-1.5">
                {item.opsi.map((opsiText, opsiIndex) => (
                  <div
                    key={opsiIndex}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-base-gray/40 text-base-black/60"
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 bg-white text-base-black/40 border border-black/10">
                      {String.fromCharCode(65 + opsiIndex)}
                    </span>
                    {opsiText}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

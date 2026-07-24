import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { Soal } from '../../types';

interface LatihanRunnerProps {
  packageName: string;
  soal: Soal[];
  currentIndex: number;
  answers: Record<string, number>;
  onSelectAnswer: (soalId: string, opsiIndex: number) => void;
  onGoTo: (index: number) => void;
  onFinish: () => void;
}

export default function LatihanRunner({
  packageName,
  soal,
  currentIndex,
  answers,
  onSelectAnswer,
  onGoTo,
  onFinish,
}: LatihanRunnerProps) {
  const current = soal[currentIndex];
  const selected = answers[current.id];
  const isLast = currentIndex === soal.length - 1;
  const isFirst = currentIndex === 0;
  const answeredCount = Object.keys(answers).length;

  return (
    <div>
      <p className="text-xs text-base-black/40 mb-1">{packageName}</p>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-base-black">
          Soal {currentIndex + 1} dari {soal.length}
        </h3>
        <span className="text-xs text-base-black/40">{answeredCount} terjawab</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-black/5 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-accent-cyan transition-all"
          style={{ width: `${((currentIndex + 1) / soal.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 mb-5">
        <p className="text-sm font-medium text-base-black mb-4 leading-relaxed">
          {current.pertanyaan}
        </p>

        <div className="flex flex-col gap-2">
          {current.opsi.map((opsiText, opsiIndex) => {
            const isSelected = selected === opsiIndex;
            return (
              <button
                key={opsiIndex}
                onClick={() => onSelectAnswer(current.id, opsiIndex)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  isSelected
                    ? 'bg-accent-cyan/10 border border-accent-cyan text-base-black font-medium'
                    : 'bg-base-gray/40 border border-transparent text-base-black/70 hover:bg-black/5'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isSelected
                      ? 'bg-accent-cyan text-white'
                      : 'bg-white text-base-black/40 border border-black/10'
                  }`}
                >
                  {isSelected ? <Check size={12} /> : String.fromCharCode(65 + opsiIndex)}
                </span>
                {opsiText}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => onGoTo(currentIndex - 1)}
          disabled={isFirst}
          className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg text-base-black/60 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Sebelumnya
        </button>

        {isLast ? (
          <button
            onClick={onFinish}
            className="px-5 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors"
          >
            Selesai & Lihat Hasil
          </button>
        ) : (
          <button
            onClick={() => onGoTo(currentIndex + 1)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors"
          >
            Selanjutnya
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
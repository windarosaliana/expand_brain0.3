import { Check, X, RotateCcw, ArrowLeft } from 'lucide-react';
import type { Soal } from '../../types';

interface LatihanResultProps {
  packageName: string;
  soal: Soal[];
  answers: Record<string, number>;
  onRetry: () => void;
  onExit: () => void;
}

export default function LatihanResult({
  packageName,
  soal,
  answers,
  onRetry,
  onExit,
}: LatihanResultProps) {
  const correctCount = soal.filter((s) => answers[s.id] === s.jawaban).length;
  const total = soal.length;
  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return (
    <div>
      <p className="text-xs text-base-black/40 mb-1">{packageName}</p>
      <h3 className="text-base font-semibold text-base-black mb-5">Hasil Latihan</h3>

      <div className="bg-white rounded-xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 mb-6 text-center">
        <p className="text-4xl font-bold text-base-black">{percentage}%</p>
        <p className="text-sm text-base-black/50 mt-1">
          {correctCount} benar dari {total} soal
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        {soal.map((item, index) => {
          const userAnswer = answers[item.id];
          const isCorrect = userAnswer === item.jawaban;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4"
            >
              <div className="flex items-start gap-2.5 mb-3">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 ${
                    isCorrect ? 'bg-accent-cyan' : 'bg-red-400'
                  }`}
                >
                  {isCorrect ? <Check size={12} /> : <X size={12} />}
                </span>
                <p className="text-sm font-medium text-base-black">
                  {index + 1}. {item.pertanyaan}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 pl-7">
                {item.opsi.map((opsiText, opsiIndex) => {
                  const isThisCorrect = opsiIndex === item.jawaban;
                  const isThisUserPick = opsiIndex === userAnswer;
                  return (
                    <div
                      key={opsiIndex}
                      className={`px-3 py-1.5 rounded-lg text-xs ${
                        isThisCorrect
                          ? 'bg-accent-cyan/10 text-base-black font-medium'
                          : isThisUserPick
                          ? 'bg-red-50 text-red-500'
                          : 'text-base-black/40'
                      }`}
                    >
                      {String.fromCharCode(65 + opsiIndex)}. {opsiText}
                      {isThisUserPick && !isThisCorrect && ' (jawaban kamu)'}
                    </div>
                  );
                })}
                {userAnswer === undefined && (
                  <p className="text-xs text-base-black/30 italic">Tidak dijawab</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg text-base-black/60 hover:bg-black/5"
        >
          <ArrowLeft size={15} />
          Kembali ke Package
        </button>
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-base-black text-white hover:bg-accent-cyan transition-colors"
        >
          <RotateCcw size={15} />
          Ulangi Latihan
        </button>
      </div>
    </div>
  );
}
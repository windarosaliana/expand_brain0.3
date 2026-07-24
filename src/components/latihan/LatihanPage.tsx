import { useState } from 'react';
import type { LearningPackage, LatihanHistoryEntry } from '../../types';
import LatihanRunner from './LatihanRunner';
import LatihanResult from './LatihanResult';

interface LatihanPageProps {
  pkg: LearningPackage;
  onExit: () => void;
  onFinish: (entry: Omit<LatihanHistoryEntry, 'id' | 'date'>) => void;
}

type Mode = 'running' | 'result';

export default function LatihanPage({
  pkg,
  onExit,
  onFinish,
}: LatihanPageProps) {
  const [mode, setMode] = useState<Mode>('running');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  if (pkg.soal.length === 0) {
    return (
      <div>
        <p className="text-sm text-base-black/50 mb-4">
          Package ini belum punya soal, tidak bisa memulai latihan.
        </p>
        <button
          onClick={onExit}
          className="px-4 py-2 text-sm rounded-lg text-base-black/60 hover:bg-black/5"
        >
          Kembali
        </button>
      </div>
    );
  }

  const handleSelectAnswer = (soalId: string, opsiIndex: number) => {
    setAnswers((prev) => ({ ...prev, [soalId]: opsiIndex }));
  };

  const handleGoTo = (index: number) => {
    if (index < 0 || index >= pkg.soal.length) return;
    setCurrentIndex(index);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIndex(0);
    setMode('running');
  };

  // FUNGSI INI YANG BERTUGAS MENGIRIM DATA KE RIWAYAT
  const handleFinishRunner = () => {
    const correctCount = pkg.soal.filter(
      (s) => answers[s.id] === s.jawaban
    ).length;
    onFinish({
      packageId: pkg.id,
      packageName: pkg.name,
      soal: pkg.soal,
      answers,
      correctCount,
      total: pkg.soal.length,
    });
    setMode('result');
  };

  return mode === 'running' ? (
    <LatihanRunner
      packageName={pkg.name}
      soal={pkg.soal}
      currentIndex={currentIndex}
      answers={answers}
      onSelectAnswer={handleSelectAnswer}
      onGoTo={handleGoTo}
      onFinish={handleFinishRunner}
    />
  ) : (
    <LatihanResult
      packageName={pkg.name}
      soal={pkg.soal}
      answers={answers}
      onRetry={handleRetry}
      onExit={onExit}
    />
  );
}

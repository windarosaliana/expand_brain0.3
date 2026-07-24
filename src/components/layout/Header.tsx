import type { View } from '../../types';

interface HeaderProps {
  currentView: View;
}

const viewTitles: Record<View, string> = {
  dashboard: 'Dashboard',
  library: 'Library Paket',
  latihan: 'Latihan',
  pengaturan: 'Pengaturan',
};

export default function Header({ currentView }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-black/5 flex items-center px-8 shadow-sm shrink-0">
      <h2 className="text-lg font-semibold text-base-black">
        {viewTitles[currentView]}
      </h2>
    </header>
  );
}
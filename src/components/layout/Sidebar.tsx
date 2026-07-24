import { LayoutDashboard, Library, PenLine, Settings } from 'lucide-react';
import type { View } from '../../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const menuItems: { view: View; label: string; icon: typeof LayoutDashboard }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { view: 'library', label: 'Library Paket', icon: Library },
  { view: 'latihan', label: 'Latihan', icon: PenLine },
  { view: 'pengaturan', label: 'Pengaturan', icon: Settings },
];

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-base-black text-base-gray flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">Expand Brain</h1>
        <p className="text-xs text-accent-cyan mt-1">One Step Ahead</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map(({ view, label, icon: Icon }) => {
          const isActive = currentView === view;
          return (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${isActive
                  ? 'bg-accent-cyan/10 text-accent-cyan shadow-[0_0_0_1px_rgba(6,182,212,0.3)]'
                  : 'text-base-gray/70 hover:bg-white/5 hover:text-base-gray'}`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
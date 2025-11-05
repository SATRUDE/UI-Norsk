import { Folder, BarChart3, Settings } from 'lucide-react';

type View = 'folders' | 'stats' | 'settings';

interface BottomNavProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const navItems = [
    { value: 'folders' as View, icon: Folder, label: 'Folders' },
    { value: 'stats' as View, icon: BarChart3, label: 'Statistics' },
    { value: 'settings' as View, icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.value;
            
            return (
              <button
                key={item.value}
                onClick={() => onViewChange(item.value)}
                className={`flex items-center justify-center px-4 py-2 transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-6 w-6" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

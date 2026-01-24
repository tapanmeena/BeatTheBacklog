import { Home, Search, Library, BarChart3 } from 'lucide-react';
import './Navigation.css';

type Tab = 'home' | 'search' | 'collection' | 'stats';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'search', icon: <Search size={20} />, label: 'Search' },
    { id: 'collection', icon: <Library size={20} />, label: 'Collection' },
    { id: 'stats', icon: <BarChart3 size={20} />, label: 'Stats' }
  ];

  return (
    <nav className="navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export type { Tab };

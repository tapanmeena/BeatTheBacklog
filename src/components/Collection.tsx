import { useState } from 'react';
import { Gamepad2, Library, CheckCircle, Star, X, FolderOpen } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { GameCard } from './GameCard';
import type { GameStatus } from '../types/game';
import './Collection.css';

const statusTabs: { id: GameStatus | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <FolderOpen size={18} /> },
  { id: 'playing', label: 'Playing', icon: <Gamepad2 size={18} /> },
  { id: 'backlog', label: 'Backlog', icon: <Library size={18} /> },
  { id: 'completed', label: 'Completed', icon: <CheckCircle size={18} /> },
  { id: 'wishlist', label: 'Wishlist', icon: <Star size={18} /> },
  { id: 'dropped', label: 'Dropped', icon: <X size={18} /> }
];

export const Collection = () => {
  const { collection } = useCollection();
  const [activeFilter, setActiveFilter] = useState<GameStatus | 'all'>('all');

  const getFilteredGames = () => {
    if (activeFilter === 'all') {
      return [
        ...collection.playing,
        ...collection.backlog,
        ...collection.completed,
        ...collection.wishlist,
        ...collection.dropped
      ];
    }
    return collection[activeFilter];
  };

  const filteredGames = getFilteredGames();

  return (
    <div className="collection-container">
      <div className="filter-tabs">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            <span className="tab-count">
              {tab.id === 'all' 
                ? Object.values(collection).flat().length 
                : collection[tab.id].length}
            </span>
          </button>
        ))}
      </div>
      
      {filteredGames.length > 0 ? (
        <div className="collection-grid">
          {filteredGames.map((game) => (
            <GameCard key={`${game.id}-${game.status}`} game={game} />
          ))}
        </div>
      ) : (
        <div className="empty-collection">
          <span className="empty-icon"><Gamepad2 size={64} /></span>
          <p>No games in this collection yet.</p>
          <p className="empty-hint">Search for games to add them to your collection!</p>
        </div>
      )}
    </div>
  );
};

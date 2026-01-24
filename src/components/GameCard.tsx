import { Star, Library, Gamepad2, CheckCircle, ImageOff } from 'lucide-react';
import type { GameSearchResult, GameStatus, UserGame } from '../types/game';
import { useCollection } from '../context/CollectionContext';
import './GameCard.css';

type GameCardGame = GameSearchResult | UserGame;

interface GameCardProps {
  game: GameCardGame;
  onClick?: () => void;
}

const statusLabels: Record<GameStatus, { icon: React.ReactNode; label: string }> = {
  backlog: { icon: <Library size={12} />, label: 'Backlog' },
  playing: { icon: <Gamepad2 size={12} />, label: 'Playing' },
  completed: { icon: <CheckCircle size={12} />, label: 'Completed' },
  dropped: { icon: <span>✕</span>, label: 'Dropped' },
  wishlist: { icon: <Star size={12} />, label: 'Wishlist' }
};

export const GameCard = ({ game, onClick }: GameCardProps) => {
  const { addToCollection, getGameStatus, removeFromCollection } = useCollection();
  const currentStatus = getGameStatus(game.id);

  const handleStatusChange = (e: React.MouseEvent, status: GameStatus) => {
    e.stopPropagation();
    if (currentStatus === status) {
      removeFromCollection(game.id);
    } else {
      // Convert to GameSearchResult format for adding to collection
      const gameData: GameSearchResult = {
        id: game.id,
        name: game.name,
        imageUrl: game.imageUrl,
        gameplayMain: game.gameplayMain,
        gameplayMainExtra: game.gameplayMainExtra,
        gameplayCompletionist: game.gameplayCompletionist,
        similarity: game.similarity ?? 0,
        releaseYear: game.releaseYear
      };
      addToCollection(gameData, status);
    }
  };

  return (
    <div className="game-card" onClick={onClick}>
      <div className="game-card-image">
        {game.imageUrl ? (
          <img src={game.imageUrl} alt={game.name} loading="lazy" />
        ) : (
          <div className="game-card-placeholder"><ImageOff size={48} /></div>
        )}
        {currentStatus && (
          <span className={`game-status-badge ${currentStatus}`}>
            {statusLabels[currentStatus].icon}
            <span>{statusLabels[currentStatus].label}</span>
          </span>
        )}
      </div>
      <div className="game-card-content">
        <h3 className="game-card-title">{game.name}</h3>
        {game.releaseYear && (
          <p className="game-card-year">{game.releaseYear}</p>
        )}
        <div className="game-card-times">
          {game.gameplayMain > 0 && (
            <div className="time-item">
              <span className="time-label">Main</span>
              <span className="time-value">{game.gameplayMain}h</span>
            </div>
          )}
          {game.gameplayMainExtra > 0 && (
            <div className="time-item">
              <span className="time-label">Main+</span>
              <span className="time-value">{game.gameplayMainExtra}h</span>
            </div>
          )}
          {game.gameplayCompletionist > 0 && (
            <div className="time-item">
              <span className="time-label">100%</span>
              <span className="time-value">{game.gameplayCompletionist}h</span>
            </div>
          )}
        </div>
        <div className="game-card-actions">
          <button
            className={`action-btn wishlist ${currentStatus === 'wishlist' ? 'active' : ''}`}
            onClick={(e) => handleStatusChange(e, 'wishlist')}
            title="Add to Wishlist"
          >
            <Star size={18} />
          </button>
          <button
            className={`action-btn backlog ${currentStatus === 'backlog' ? 'active' : ''}`}
            onClick={(e) => handleStatusChange(e, 'backlog')}
            title="Add to Backlog"
          >
            <Library size={18} />
          </button>
          <button
            className={`action-btn playing ${currentStatus === 'playing' ? 'active' : ''}`}
            onClick={(e) => handleStatusChange(e, 'playing')}
            title="Mark as Playing"
          >
            <Gamepad2 size={18} />
          </button>
          <button
            className={`action-btn completed ${currentStatus === 'completed' ? 'active' : ''}`}
            onClick={(e) => handleStatusChange(e, 'completed')}
            title="Mark as Completed"
          >
            <CheckCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

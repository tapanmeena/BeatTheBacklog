import type { GameSearchResult } from '../types/game';
import { GameCard } from './GameCard';
import './GameGrid.css';

interface GameGridProps {
  games: GameSearchResult[];
  title?: string;
  loading?: boolean;
  emptyMessage?: string;
}

export const GameGrid = ({ games, title, loading, emptyMessage = 'No games found' }: GameGridProps) => {
  return (
    <section className="game-grid-section">
      {title && <h2 className="section-title">{title}</h2>}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading games...</p>
        </div>
      ) : games.length > 0 ? (
        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="empty-message">{emptyMessage}</p>
      )}
    </section>
  );
};

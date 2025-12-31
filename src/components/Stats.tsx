import { Target, Library, Gamepad2, CheckCircle, Star, Clock, BarChart3 } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import './Stats.css';

export const Stats = () => {
  const { stats } = useCollection();

  return (
    <div className="stats-container">
      <h2 className="stats-title"><BarChart3 size={24} /> Your Gaming Stats</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <span className="stat-icon"><Target size={32} /></span>
          <span className="stat-value">{stats.totalGames}</span>
          <span className="stat-label">Total Games</span>
        </div>
        <div className="stat-card backlog">
          <span className="stat-icon"><Library size={32} /></span>
          <span className="stat-value">{stats.backlogCount}</span>
          <span className="stat-label">In Backlog</span>
        </div>
        <div className="stat-card playing">
          <span className="stat-icon"><Gamepad2 size={32} /></span>
          <span className="stat-value">{stats.playingCount}</span>
          <span className="stat-label">Playing</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-icon"><CheckCircle size={32} /></span>
          <span className="stat-value">{stats.completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card wishlist">
          <span className="stat-icon"><Star size={32} /></span>
          <span className="stat-value">{stats.wishlistCount}</span>
          <span className="stat-label">Wishlist</span>
        </div>
        <div className="stat-card playtime">
          <span className="stat-icon"><Clock size={32} /></span>
          <span className="stat-value">{stats.totalPlaytime}h</span>
          <span className="stat-label">Total Playtime</span>
        </div>
      </div>
    </div>
  );
};

import { Gamepad2 } from 'lucide-react';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon"><Gamepad2 size={40} /></span>
          <h1 className="logo-text">Beat The Backlog</h1>
        </div>
        <p className="tagline">Track your gaming journey</p>
      </div>
    </header>
  );
};

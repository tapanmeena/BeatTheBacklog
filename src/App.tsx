import { useState, useEffect } from 'react';
import { CollectionProvider } from './context/CollectionContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import type { Tab } from './components/Navigation';
import { SearchBar } from './components/SearchBar';
import { GameGrid } from './components/GameGrid';
import { Collection } from './components/Collection';
import { Stats } from './components/Stats';
import { searchGames, getTrendingGames, getRecentGames } from './services/api';
import type { GameSearchResult } from './types/game';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [searchResults, setSearchResults] = useState<GameSearchResult[]>([]);
  const [trendingGames, setTrendingGames] = useState<GameSearchResult[]>([]);
  const [recentGames, setRecentGames] = useState<GameSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [trending, recent] = await Promise.all([
          getTrendingGames(),
          getRecentGames()
        ]);
        setTrendingGames(trending);
        setRecentGames(recent);
      } catch (err) {
        setError('Failed to load games. Make sure the API server is running.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleSearch = async (term: string) => {
    setSearchLoading(true);
    setActiveTab('search');
    try {
      const result = await searchGames(term);
      setSearchResults(result.games);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="search-section">
              <SearchBar onSearch={handleSearch} />
            </div>
            {error ? (
              <div className="error-message">
                <p>⚠️ {error}</p>
                <p className="error-hint">
                  Start the API server with: <code>node server/index.js</code>
                </p>
              </div>
            ) : (
              <>
                <GameGrid
                  games={trendingGames}
                  title="🔥 Trending Games"
                  loading={loading}
                  emptyMessage="No trending games available"
                />
                <GameGrid
                  games={recentGames}
                  title="🆕 Recently Released"
                  loading={loading}
                  emptyMessage="No recent games available"
                />
              </>
            )}
          </>
        );
      case 'search':
        return (
          <>
            <div className="search-section">
              <SearchBar onSearch={handleSearch} />
            </div>
            <GameGrid
              games={searchResults}
              title="🔍 Search Results"
              loading={searchLoading}
              emptyMessage="Search for games to see results"
            />
          </>
        );
      case 'collection':
        return <Collection />;
      case 'stats':
        return <Stats />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="desktop-nav">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <main className="main-content">
        {renderContent()}
      </main>
      <div className="mobile-nav">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

function App() {
  return (
    <CollectionProvider>
      <AppContent />
    </CollectionProvider>
  );
}

export default App;

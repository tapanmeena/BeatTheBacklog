import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { GameCollection, GameStats, GameStatus, GameSearchResult } from '../types/game';
import * as storage from '../services/storage';

interface CollectionContextType {
  collection: GameCollection;
  stats: GameStats;
  addToCollection: (game: GameSearchResult, status: GameStatus) => void;
  updateStatus: (gameId: number, status: GameStatus) => void;
  removeFromCollection: (gameId: number) => void;
  getGameStatus: (gameId: number) => GameStatus | null;
  updatePlaytime: (gameId: number, playtime: number) => void;
  updateNotes: (gameId: number, notes: string) => void;
}

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const [collection, setCollection] = useState<GameCollection>(storage.getCollection());
  const [stats, setStats] = useState<GameStats>(storage.getStats());

  const refreshData = useCallback(() => {
    setCollection(storage.getCollection());
    setStats(storage.getStats());
  }, []);

  const addToCollection = useCallback((game: GameSearchResult, status: GameStatus) => {
    storage.addGame(game, status);
    refreshData();
  }, [refreshData]);

  const updateStatus = useCallback((gameId: number, status: GameStatus) => {
    storage.updateGameStatus(gameId, status);
    refreshData();
  }, [refreshData]);

  const removeFromCollection = useCallback((gameId: number) => {
    storage.removeGame(gameId);
    refreshData();
  }, [refreshData]);

  const getGameStatus = useCallback((gameId: number): GameStatus | null => {
    return storage.isGameInCollection(gameId);
  }, []);

  const updatePlaytime = useCallback((gameId: number, playtime: number) => {
    storage.updateUserPlaytime(gameId, playtime);
    refreshData();
  }, [refreshData]);

  const updateNotes = useCallback((gameId: number, notes: string) => {
    storage.updateGameNotes(gameId, notes);
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const handleStorageChange = () => refreshData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshData]);

  return (
    <CollectionContext.Provider value={{
      collection,
      stats,
      addToCollection,
      updateStatus,
      removeFromCollection,
      getGameStatus,
      updatePlaytime,
      updateNotes
    }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};

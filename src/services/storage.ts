import type { UserGame, GameCollection, GameStatus, GameStats, GameSearchResult } from '../types/game';

const STORAGE_KEY = 'beat-the-backlog-collection';

export const getCollection = (): GameCollection => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    backlog: [],
    playing: [],
    completed: [],
    dropped: [],
    wishlist: []
  };
};

export const saveCollection = (collection: GameCollection): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
};

export const addGame = (game: GameSearchResult, status: GameStatus): UserGame => {
  const collection = getCollection();
  
  // Remove from any existing status
  removeGameFromAllStatuses(collection, game.id);
  
  const userGame: UserGame = {
    id: game.id,
    name: game.name,
    imageUrl: game.imageUrl,
    gameplayMain: game.gameplayMain,
    gameplayMainExtra: game.gameplayMainExtra,
    gameplayCompletionist: game.gameplayCompletionist,
    status,
    addedAt: new Date().toISOString(),
    completedAt: status === 'completed' ? new Date().toISOString() : undefined
  };
  
  collection[status].push(userGame);
  saveCollection(collection);
  return userGame;
};

export const updateGameStatus = (gameId: number, newStatus: GameStatus): void => {
  const collection = getCollection();
  let game: UserGame | undefined;
  
  // Find and remove from current status
  for (const status of Object.keys(collection) as GameStatus[]) {
    const index = collection[status].findIndex(g => g.id === gameId);
    if (index !== -1) {
      [game] = collection[status].splice(index, 1);
      break;
    }
  }
  
  if (game) {
    game.status = newStatus;
    if (newStatus === 'completed') {
      game.completedAt = new Date().toISOString();
    }
    collection[newStatus].push(game);
    saveCollection(collection);
  }
};

export const removeGame = (gameId: number): void => {
  const collection = getCollection();
  removeGameFromAllStatuses(collection, gameId);
  saveCollection(collection);
};

const removeGameFromAllStatuses = (collection: GameCollection, gameId: number): void => {
  for (const status of Object.keys(collection) as GameStatus[]) {
    collection[status] = collection[status].filter(g => g.id !== gameId);
  }
};

export const isGameInCollection = (gameId: number): GameStatus | null => {
  const collection = getCollection();
  for (const status of Object.keys(collection) as GameStatus[]) {
    if (collection[status].some(g => g.id === gameId)) {
      return status;
    }
  }
  return null;
};

export const getStats = (): GameStats => {
  const collection = getCollection();
  const allGames = [
    ...collection.backlog,
    ...collection.playing,
    ...collection.completed,
    ...collection.dropped,
    ...collection.wishlist
  ];
  
  const totalPlaytime = collection.completed.reduce((sum, g) => sum + (g.userPlaytime || g.gameplayMain), 0);
  
  return {
    totalGames: allGames.length,
    totalPlaytime,
    backlogCount: collection.backlog.length,
    playingCount: collection.playing.length,
    completedCount: collection.completed.length,
    droppedCount: collection.dropped.length,
    wishlistCount: collection.wishlist.length,
    averagePlaytime: collection.completed.length > 0 ? Math.round(totalPlaytime / collection.completed.length) : 0
  };
};

export const updateUserPlaytime = (gameId: number, playtime: number): void => {
  const collection = getCollection();
  for (const status of Object.keys(collection) as GameStatus[]) {
    const game = collection[status].find(g => g.id === gameId);
    if (game) {
      game.userPlaytime = playtime;
      saveCollection(collection);
      return;
    }
  }
};

export const updateGameNotes = (gameId: number, notes: string): void => {
  const collection = getCollection();
  for (const status of Object.keys(collection) as GameStatus[]) {
    const game = collection[status].find(g => g.id === gameId);
    if (game) {
      game.notes = notes;
      saveCollection(collection);
      return;
    }
  }
};

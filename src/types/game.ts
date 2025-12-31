export interface GameSearchResult {
  id: number;
  name: string;
  imageUrl: string;
  gameplayMain: number;
  gameplayMainExtra: number;
  gameplayCompletionist: number;
  similarity: number;
  releaseYear?: number;
}

export interface GameDetails extends GameSearchResult {
  description?: string;
  platforms?: string[];
  genres?: string[];
  developers?: string[];
  publishers?: string[];
  releaseDate?: string;
}

export type GameStatus = 'backlog' | 'playing' | 'completed' | 'dropped' | 'wishlist';

export interface UserGame {
  id: number;
  name: string;
  imageUrl: string;
  gameplayMain: number;
  gameplayMainExtra: number;
  gameplayCompletionist: number;
  similarity?: number;
  releaseYear?: number;
  status: GameStatus;
  addedAt: string;
  completedAt?: string;
  userPlaytime?: number;
  notes?: string;
}

export interface GameCollection {
  backlog: UserGame[];
  playing: UserGame[];
  completed: UserGame[];
  dropped: UserGame[];
  wishlist: UserGame[];
}

export interface GameStats {
  totalGames: number;
  totalPlaytime: number;
  backlogCount: number;
  playingCount: number;
  completedCount: number;
  droppedCount: number;
  wishlistCount: number;
  averagePlaytime: number;
}

import axios from 'axios';
import type { GameSearchResult, GameDetails } from '../types/game';

const API_BASE_URL = import.meta.env.PROD ? '/api' : '/api';

export interface SearchResponse {
  games: GameSearchResult[];
  totalCount: number;
}

export const searchGames = async (searchTerm: string, page = 1): Promise<SearchResponse> => {
  const response = await axios.post(`${API_BASE_URL}/search`, { searchTerm, page });
  return response.data;
};

export const getGameDetails = async (id: number): Promise<GameDetails> => {
  const response = await axios.get(`${API_BASE_URL}/game/${id}`);
  return response.data;
};

export const getTrendingGames = async (): Promise<GameSearchResult[]> => {
  const response = await axios.get(`${API_BASE_URL}/trending`);
  return response.data.games;
};

export const getRecentGames = async (): Promise<GameSearchResult[]> => {
  const response = await axios.get(`${API_BASE_URL}/recent`);
  return response.data.games;
};

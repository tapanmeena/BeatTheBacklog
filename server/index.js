import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const HLTB_API_URL = 'https://howlongtobeat.com/api';
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

// User agent and headers to mimic browser requests
const getHeaders = () => ({
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Origin': 'https://howlongtobeat.com',
  'Referer': 'https://howlongtobeat.com',
});

// Mock data for testing when API is not accessible
const mockGames = [
  { id: 1, name: 'The Legend of Zelda: Breath of the Wild', imageUrl: 'https://howlongtobeat.com/games/38019_The_Legend_of_Zelda_Breath_of_the_Wild.jpg', gameplayMain: 50, gameplayMainExtra: 100, gameplayCompletionist: 189, similarity: 1, releaseYear: 2017 },
  { id: 2, name: 'Elden Ring', imageUrl: 'https://howlongtobeat.com/games/68151_Elden_Ring.jpg', gameplayMain: 55, gameplayMainExtra: 97, gameplayCompletionist: 133, similarity: 1, releaseYear: 2022 },
  { id: 3, name: 'God of War Ragnarök', imageUrl: 'https://howlongtobeat.com/games/83146_God_of_War_Ragnark.jpg', gameplayMain: 26, gameplayMainExtra: 51, gameplayCompletionist: 75, similarity: 1, releaseYear: 2022 },
  { id: 4, name: 'Baldur\'s Gate 3', imageUrl: 'https://howlongtobeat.com/games/119286_Baldurs_Gate_3.jpg', gameplayMain: 90, gameplayMainExtra: 120, gameplayCompletionist: 165, similarity: 1, releaseYear: 2023 },
  { id: 5, name: 'Hollow Knight', imageUrl: 'https://howlongtobeat.com/games/26286_Hollow_Knight.jpg', gameplayMain: 26, gameplayMainExtra: 40, gameplayCompletionist: 65, similarity: 1, releaseYear: 2017 },
  { id: 6, name: 'Red Dead Redemption 2', imageUrl: 'https://howlongtobeat.com/games/27100_Red_Dead_Redemption_2.jpg', gameplayMain: 50, gameplayMainExtra: 80, gameplayCompletionist: 180, similarity: 1, releaseYear: 2018 },
  { id: 7, name: 'The Witcher 3: Wild Hunt', imageUrl: 'https://howlongtobeat.com/games/10270_The_Witcher_3_Wild_Hunt.jpg', gameplayMain: 51, gameplayMainExtra: 105, gameplayCompletionist: 173, similarity: 1, releaseYear: 2015 },
  { id: 8, name: 'Hades', imageUrl: 'https://howlongtobeat.com/games/62941_Hades.jpg', gameplayMain: 22, gameplayMainExtra: 45, gameplayCompletionist: 97, similarity: 1, releaseYear: 2020 },
  { id: 9, name: 'Celeste', imageUrl: 'https://howlongtobeat.com/games/42818_Celeste.jpg', gameplayMain: 8, gameplayMainExtra: 15, gameplayCompletionist: 40, similarity: 1, releaseYear: 2018 },
  { id: 10, name: 'Sekiro: Shadows Die Twice', imageUrl: 'https://howlongtobeat.com/games/56088_Sekiro_Shadows_Die_Twice.jpg', gameplayMain: 30, gameplayMainExtra: 45, gameplayCompletionist: 70, similarity: 1, releaseYear: 2019 },
  { id: 11, name: 'Cyberpunk 2077', imageUrl: 'https://howlongtobeat.com/games/2127_Cyberpunk_2077.jpg', gameplayMain: 25, gameplayMainExtra: 60, gameplayCompletionist: 103, similarity: 1, releaseYear: 2020 },
  { id: 12, name: 'Horizon Forbidden West', imageUrl: 'https://howlongtobeat.com/games/58590_Horizon_Forbidden_West.jpg', gameplayMain: 30, gameplayMainExtra: 55, gameplayCompletionist: 85, similarity: 1, releaseYear: 2022 },
];

const mockRecentGames = [
  { id: 101, name: 'The Legend of Zelda: Tears of the Kingdom', imageUrl: 'https://howlongtobeat.com/games/106389_The_Legend_of_Zelda_Tears_of_the_Kingdom.jpg', gameplayMain: 55, gameplayMainExtra: 100, gameplayCompletionist: 200, similarity: 1, releaseYear: 2023 },
  { id: 102, name: 'Alan Wake 2', imageUrl: 'https://howlongtobeat.com/games/107686_Alan_Wake_2.jpg', gameplayMain: 16, gameplayMainExtra: 24, gameplayCompletionist: 35, similarity: 1, releaseYear: 2023 },
  { id: 103, name: 'Spider-Man 2', imageUrl: 'https://howlongtobeat.com/games/107628_Marvels_Spider-Man_2.jpg', gameplayMain: 18, gameplayMainExtra: 30, gameplayCompletionist: 45, similarity: 1, releaseYear: 2023 },
  { id: 104, name: 'Star Wars Jedi: Survivor', imageUrl: 'https://howlongtobeat.com/games/107055_Star_Wars_Jedi_Survivor.jpg', gameplayMain: 20, gameplayMainExtra: 35, gameplayCompletionist: 50, similarity: 1, releaseYear: 2023 },
  { id: 105, name: 'Resident Evil 4 Remake', imageUrl: 'https://howlongtobeat.com/games/107631_Resident_Evil_4.jpg', gameplayMain: 16, gameplayMainExtra: 25, gameplayCompletionist: 55, similarity: 1, releaseYear: 2023 },
  { id: 106, name: 'Armored Core VI', imageUrl: 'https://howlongtobeat.com/games/100127_Armored_Core_VI_Fires_of_Rubicon.jpg', gameplayMain: 22, gameplayMainExtra: 40, gameplayCompletionist: 60, similarity: 1, releaseYear: 2023 },
  { id: 107, name: 'Final Fantasy XVI', imageUrl: 'https://howlongtobeat.com/games/68683_Final_Fantasy_XVI.jpg', gameplayMain: 35, gameplayMainExtra: 55, gameplayCompletionist: 85, similarity: 1, releaseYear: 2023 },
  { id: 108, name: 'Lies of P', imageUrl: 'https://howlongtobeat.com/games/107631_Lies_of_P.jpg', gameplayMain: 30, gameplayMainExtra: 40, gameplayCompletionist: 60, similarity: 1, releaseYear: 2023 },
];

// Helper function to search mock data
const searchMockGames = (searchTerm) => {
  const allMockGames = [...mockGames, ...mockRecentGames];
  if (!searchTerm) return allMockGames;
  const terms = searchTerm.toLowerCase().split(' ');
  return allMockGames.filter(game => 
    terms.some(term => game.name.toLowerCase().includes(term))
  );
};

// Search games
app.post('/api/search', async (req, res) => {
  try {
    const { searchTerm, page = 1 } = req.body;
    
    if (USE_MOCK_DATA) {
      const games = searchMockGames(searchTerm);
      return res.json({ games, totalCount: games.length });
    }
    
    const payload = {
      searchType: 'games',
      searchTerms: searchTerm.split(' '),
      searchPage: page,
      size: 20,
      searchOptions: {
        games: {
          userId: 0,
          platform: '',
          sortCategory: 'popular',
          rangeCategory: 'main',
          rangeTime: { min: null, max: null },
          gameplay: { perspective: '', flow: '', genre: '' },
          rangeYear: { min: '', max: '' },
          modifier: ''
        },
        users: { sortCategory: 'postcount' },
        lists: { sortCategory: 'follows' },
        filter: '',
        sort: 0,
        randomizer: 0
      }
    };

    const response = await axios.post(`${HLTB_API_URL}/search`, payload, {
      headers: getHeaders(),
      timeout: 10000
    });

    const games = response.data.data?.map((game) => ({
      id: game.game_id,
      name: game.game_name,
      imageUrl: game.game_image ? `https://howlongtobeat.com/games/${game.game_image}` : '',
      gameplayMain: Math.round((game.comp_main || 0) / 3600),
      gameplayMainExtra: Math.round((game.comp_plus || 0) / 3600),
      gameplayCompletionist: Math.round((game.comp_100 || 0) / 3600),
      similarity: game.similarity || 0,
      releaseYear: game.release_world
    })) || [];

    res.json({ games, totalCount: response.data.count || 0 });
  } catch (error) {
    console.error('Search error:', error.message);
    // Fallback to mock data on error
    const games = searchMockGames(req.body.searchTerm);
    res.json({ games, totalCount: games.length });
  }
});

// Get game details
app.get('/api/game/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (USE_MOCK_DATA) {
      const allMockGames = [...mockGames, ...mockRecentGames];
      const game = allMockGames.find(g => g.id === parseInt(id));
      if (game) {
        return res.json({
          ...game,
          description: 'An amazing game with incredible gameplay and story.',
          platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
          genres: ['Action', 'Adventure', 'RPG'],
          developers: ['Developer Studio'],
          publishers: ['Publisher Inc']
        });
      }
      return res.status(404).json({ error: 'Game not found' });
    }
    
    const response = await axios.post(`${HLTB_API_URL}/game`, { game_id: parseInt(id) }, {
      headers: getHeaders(),
      timeout: 10000
    });

    const game = response.data.data?.game?.[0];
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({
      id: game.game_id,
      name: game.game_name,
      imageUrl: game.game_image ? `https://howlongtobeat.com/games/${game.game_image}` : '',
      gameplayMain: Math.round((game.comp_main || 0) / 3600),
      gameplayMainExtra: Math.round((game.comp_plus || 0) / 3600),
      gameplayCompletionist: Math.round((game.comp_100 || 0) / 3600),
      description: game.profile_summary,
      platforms: game.profile_platform?.split(', ') || [],
      genres: game.profile_genre?.split(', ') || [],
      developers: game.profile_dev?.split(', ') || [],
      publishers: game.profile_pub?.split(', ') || [],
      releaseDate: game.release_world,
      releaseYear: game.release_world
    });
  } catch (error) {
    console.error('Get game error:', error.message);
    // Fallback to mock data
    const allMockGames = [...mockGames, ...mockRecentGames];
    const game = allMockGames.find(g => g.id === parseInt(req.params.id));
    if (game) {
      return res.json({
        ...game,
        description: 'An amazing game with incredible gameplay and story.',
        platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
        genres: ['Action', 'Adventure', 'RPG'],
        developers: ['Developer Studio'],
        publishers: ['Publisher Inc']
      });
    }
    res.status(500).json({ error: 'Failed to get game details' });
  }
});

// Get trending/popular games
app.get('/api/trending', async (req, res) => {
  try {
    if (USE_MOCK_DATA) {
      return res.json({ games: mockGames });
    }
    
    const payload = {
      searchType: 'games',
      searchTerms: [],
      searchPage: 1,
      size: 20,
      searchOptions: {
        games: {
          userId: 0,
          platform: '',
          sortCategory: 'popular',
          rangeCategory: 'main',
          rangeTime: { min: null, max: null },
          gameplay: { perspective: '', flow: '', genre: '' },
          rangeYear: { min: '', max: '' },
          modifier: ''
        },
        users: { sortCategory: 'postcount' },
        lists: { sortCategory: 'follows' },
        filter: '',
        sort: 0,
        randomizer: 0
      }
    };

    const response = await axios.post(`${HLTB_API_URL}/search`, payload, {
      headers: getHeaders(),
      timeout: 10000
    });

    const games = response.data.data?.map((game) => ({
      id: game.game_id,
      name: game.game_name,
      imageUrl: game.game_image ? `https://howlongtobeat.com/games/${game.game_image}` : '',
      gameplayMain: Math.round((game.comp_main || 0) / 3600),
      gameplayMainExtra: Math.round((game.comp_plus || 0) / 3600),
      gameplayCompletionist: Math.round((game.comp_100 || 0) / 3600),
      similarity: game.similarity || 0,
      releaseYear: game.release_world
    })) || [];

    res.json({ games });
  } catch (error) {
    console.error('Trending error:', error.message);
    // Fallback to mock data
    res.json({ games: mockGames });
  }
});

// Get recently released games
app.get('/api/recent', async (req, res) => {
  try {
    if (USE_MOCK_DATA) {
      return res.json({ games: mockRecentGames });
    }
    
    const currentYear = new Date().getFullYear();
    const payload = {
      searchType: 'games',
      searchTerms: [],
      searchPage: 1,
      size: 20,
      searchOptions: {
        games: {
          userId: 0,
          platform: '',
          sortCategory: 'new',
          rangeCategory: 'main',
          rangeTime: { min: null, max: null },
          gameplay: { perspective: '', flow: '', genre: '' },
          rangeYear: { min: String(currentYear - 1), max: String(currentYear) },
          modifier: ''
        },
        users: { sortCategory: 'postcount' },
        lists: { sortCategory: 'follows' },
        filter: '',
        sort: 0,
        randomizer: 0
      }
    };

    const response = await axios.post(`${HLTB_API_URL}/search`, payload, {
      headers: getHeaders(),
      timeout: 10000
    });

    const games = response.data.data?.map((game) => ({
      id: game.game_id,
      name: game.game_name,
      imageUrl: game.game_image ? `https://howlongtobeat.com/games/${game.game_image}` : '',
      gameplayMain: Math.round((game.comp_main || 0) / 3600),
      gameplayMainExtra: Math.round((game.comp_plus || 0) / 3600),
      gameplayCompletionist: Math.round((game.comp_100 || 0) / 3600),
      similarity: game.similarity || 0,
      releaseYear: game.release_world
    })) || [];

    res.json({ games });
  } catch (error) {
    console.error('Recent error:', error.message);
    // Fallback to mock data
    res.json({ games: mockRecentGames });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (USE_MOCK_DATA) {
    console.log('Using mock data');
  }
});

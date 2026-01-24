# Beat The Backlog 🎮

A Progressive Web App (PWA) for tracking your gaming backlog using HowLongToBeat data.

## Features

- 🔍 **Search Games** - Search for any game using HowLongToBeat's database
- ⭐ **Wishlist** - Save games you're interested in playing
- 📚 **Backlog Management** - Organize games by status (Backlog, Playing, Completed, Dropped)
- 🔥 **Trending Games** - See what's popular right now
- 🆕 **Recent Releases** - Discover newly released games
- 📊 **Statistics** - Track your gaming stats (total games, completion rate, playtime)
- 📱 **PWA Support** - Install as a native app on any device
- 💾 **Offline Support** - Your collection is saved locally

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express.js (API proxy for HowLongToBeat)
- **PWA**: Vite PWA Plugin + Workbox
- **Storage**: LocalStorage for user data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tapanmeena/BeatTheBacklog.git
cd BeatTheBacklog

# Install dependencies
npm install

# Start both frontend and backend servers
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Start the API server
npm run server

# Terminal 2 - Start the frontend
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- API Server: http://localhost:3001

### Building for Production

```bash
npm run build
```

## Project Structure

```
├── public/              # Static assets
├── server/
│   └── index.js         # Express API server
├── src/
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API and storage services
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
└── vite.config.ts       # Vite configuration with PWA
```

## Game Status Types

- **Wishlist** ⭐ - Games you want to play someday
- **Backlog** 📚 - Games you own but haven't started
- **Playing** 🎮 - Games you're currently playing
- **Completed** ✅ - Games you've finished
- **Dropped** ❌ - Games you stopped playing

## API Endpoints

The backend server provides the following endpoints:

- `POST /api/search` - Search for games
- `GET /api/game/:id` - Get game details
- `GET /api/trending` - Get trending/popular games
- `GET /api/recent` - Get recently released games

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Game data provided by [HowLongToBeat.com](https://howlongtobeat.com)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

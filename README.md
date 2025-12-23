# 🎄 npm install christmas-tree

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
[![Deploy](https://img.shields.io/badge/demo-live-brightgreen)](https://npm-christmas-tree.web.app)

A hyper-realistic, terminal-based Christmas experience for developers. Simulates a package installation that compiles into a 3D "Matrix Code" tree with physics-based snow and global usage stats.

**🔗 [Live Demo](https://npm-christmas-tree.web.app)**

## ✨ Features

- **Terminal Simulation** - Realistic typing animation with logs fetched from npm registry
- **3D Matrix Tree** - Rotating tree rendered with binary code characters
- **Twinkling Lights** - Colorful Christmas ornaments (red, gold, blue, pink, white)
- **Physics Snow** - Lightweight particle engine for realistic snowfall
- **CRT Aesthetics** - Scanlines, screen flicker, and chromatic aberration effects
- **Viral Sharing** - Native Web Share API integration
- **Mobile Responsive** - Optimized for all screen sizes

## 📸 Preview

The app simulates `npm install christmas-tree` and reveals a beautiful animated Christmas tree!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Postgres database

### Installation

```bash
# Clone the repository
git clone https://github.com/seochan99/npm-christmas-tree.git
cd npm-christmas-tree

# Install dependencies
npm install

# Set up environment variables
# Example (Railway):
# DATABASE_URL="postgresql://user:pass@host:5432/db"

# Run development server
npm run dev
```

### Backend Setup

1. Set `DATABASE_URL` (or `POSTGRES_URL`) to your Postgres connection string.
2. Run `npm install`.
3. Start the server with `npm start` after running `npm run build`.

### Deploy

```bash
# Build for production
npm run build

# Start the combined server (API + frontend)
npm start
```

## 🛠️ Tech Stack

- **Vite** - Build tool
- **Vanilla JavaScript** - No frameworks, pure JS
- **HTML5 Canvas** - 3D rendering
- **Express** - API + static frontend hosting
- **Postgres** - Persistent counter
- **CSS3** - Animations & effects

## 📁 Project Structure

```
├── index.html       # Entry point
├── main.js          # App orchestration
├── terminal.js      # Typing animation & npm simulation
├── tree.js          # 3D Matrix tree rendering
├── snow.js          # Particle snow system
├── api.js           # API client
├── server/index.js  # Express + Postgres API
├── style.css        # All styles & effects
└── style.css        # All styles & effects
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Open a Pull Request

## 👤 Author

**Seochan**

- Instagram: [@dev_seochan](https://www.instagram.com/dev_seochan/)
- GitHub: [@seochan99](https://github.com/seochan99)

## 📄 License

MIT License - feel free to use this for your own Christmas greeting!

---

Made with ❤️ and ☕ | Merry Christmas! 🎄

# Nubilus Docs

Official documentation website for [Nubilus](https://github.com/theakash04/Nubilus) — an open-source, self-hosted infrastructure monitoring platform.

## 🚀 Tech Stack

- **Framework**: [TanStack Router](https://tanstack.com/router) (React)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Markdown**: React Markdown with syntax highlighting
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Markdown documentation files
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── routes/         # File-based routing (TanStack Router)
└── styles.css      # Global styles
```

## 📝 Adding Documentation

Add markdown files to `src/content/` — they will be automatically available as routes under `/docs/[slug]`.

## 🔗 Links

- [Nubilus Main Repository](https://github.com/theakash04/Nubilus)
- [Live Documentation](https://nubilus.akashtwt.me)

## 📄 License

MIT

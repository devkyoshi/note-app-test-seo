# React Notebook: A Simple TypeScript Diary App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/your-repo/pulls)

Effortlessly capture your thoughts and ideas with this minimalist React **Notebook** application built with TypeScript and Vite. This **note**-taking app provides a clean and intuitive interface for creating, editing, and organizing your personal **diary** entries. Start jotting down your daily reflections and manage your notes with ease!

## Features

- Create, edit, and delete notes within your **notebook**
- Add tags to organize your **notes** and keep your **diary** structured
- Search through your entire collection of **notes**
- Clean, intuitive interface for a pleasant **diary** experience
- Local storage persistence, ensuring your **notebook** is always available

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Click "New Note" to create a new **note** in your digital **notebook**
- Click on any **note** in the sidebar to view its contents
- Click "Edit" to modify a **note** and update your **diary** entry
- Add tags by entering comma-separated values to categorize your **notes**
- Delete unwanted **notes** using the trash icon, keeping your **notebook** tidy

## Technologies Used

- React 18
- TypeScript
- Vite
- Lucide React (for icons)
- Local Storage API

## Contributing

We welcome contributions! Feel free to submit issues and pull requests to improve this **notebook** application.

## License

MIT License

## Additional Resources for React Development

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
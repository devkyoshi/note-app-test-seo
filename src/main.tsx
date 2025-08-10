import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Helmet } from 'react-helmet';

const OptimizedApp = () => {
  return (
    <StrictMode>
      <Helmet>
        <title>My Notebook - Capture Your Notes and Diary Entries</title>
        <meta name="description" content="Create a personal notebook to jot down notes, diary entries, and important thoughts. Organize your life with our easy-to-use notebook app." />
        <meta name="keywords" content="notebook, note, diary, journal, online notebook, digital diary, personal notes" />
      </Helmet>
      <header>
        <h1>My Digital Notebook: A Place for Your Notes and Diary</h1>
      </header>
      <main>
        <section>
          <h2>Start Writing Your Notes</h2>
          <p>Use this notebook to record your thoughts, ideas, and diary entries. It's perfect for keeping track of everything important in your life.</p>
          <img src="notebook-image.jpg" alt="An open notebook with a pen, symbolizing diary and note taking." />
        </section>
        <section>
          <h2>Organize Your Diary</h2>
          <p>Keep a personal diary to document your daily experiences and reflections. Our notebook provides a secure and private space for your diary entries.</p>
        </section>
        <section>
          <h2>Capture Important Notes</h2>
          <p>Don't let important notes slip away. Use this notebook to quickly capture and organize your notes for work, school, or personal projects.</p>
        </section>
      </main>
      <footer>
        <p>© 2024 My Notebook. All rights reserved.</p>
      </footer>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(
  <OptimizedApp />,
);
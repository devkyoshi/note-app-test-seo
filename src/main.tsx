import React from 'react';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <title>Your Digital Notebook: Capture Notes and Diary Entries</title>
        <meta
          name="description"
          content="Digital notebook for taking notes, writing diary entries, and organizing your thoughts. Keep a digital diary and notebook all in one place."
        />
        <meta name="keywords" content="notebook, note, diary, digital notebook, online diary, notes app" />
      </Helmet>

      <main>
        <header>
          <h1>My Digital Notebook & Diary</h1>
        </header>

        <section>
          <h2>Take Notes Easily</h2>
          <p>Use this digital notebook to jot down quick notes, ideas, and reminders. Keep all your important notes organized in one place.</p>
          <img src="placeholder-note-image.jpg" alt="Screenshot of taking notes in a digital notebook" />
        </section>

        <section>
          <h2>Write Daily Diary Entries</h2>
          <p>Reflect on your day and write personal diary entries. This online diary is a secure and private space for your thoughts.</p>
          <img src="placeholder-diary-image.jpg" alt="Writing a diary entry in a digital diary" />
        </section>

        <aside>
          <h3>Why Use a Digital Notebook?</h3>
          <ul>
            <li>Always Accessible: Access your notes and diary from any device.</li>
            <li>Searchable: Easily find specific notes and diary entries.</li>
            <li>Organized: Keep your thoughts and ideas neatly organized.</li>
          </ul>
        </aside>

        <footer>
          <p>&copy; 2024 My Notebook App</p>
        </footer>
      </main>
    </>
  );
}

export default App;
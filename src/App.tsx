import { useState, useEffect } from 'react'
import { PlusCircle, BookOpen, Edit3, Trash2, Save, X } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { Helmet } from 'react-helmet';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('notebook-notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      }));
      setNotes(parsedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notebook-notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      title: 'New Note',
      content: 'Start writing your note here...',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setEditTags('');
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const startEditing = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditTags(note.tags.join(', '));
  };

  const saveNote = () => {
    if (!selectedNote) return;

    const updatedNote: Note = {
      ...selectedNote,
      title: editTitle.trim() || 'Untitled',
      content: editContent,
      tags: editTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      updatedAt: new Date()
    };

    setNotes(notes.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ));
    setSelectedNote(updatedNote);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    if (selectedNote) {
      setEditTitle(selectedNote.title);
      setEditContent(selectedNote.content);
      setEditTags(selectedNote.tags.join(', '));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Helmet>
        <title>My Online Notebook - Capture Your Notes and Diary Entries</title>
        <meta name="description" content="A simple and effective online notebook to keep your notes, journal entries, and diary organized. Start writing your thoughts today!" />
        <meta name="keywords" content="notebook, note, diary, online notebook, journal, personal diary, notes app" />
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3 lg:gap-4">
            <BookOpen className="text-white flex-shrink-0" size={32} alt="Notebook icon" />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">My Online Notebook</h1>
              <p className="text-indigo-100 text-xs lg:text-sm">Organize your thoughts, notes and diary entries</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col lg:max-h-none max-h-96">
          <div className="p-4">
            <button 
              onClick={createNewNote}
              className="w-full flex items-center gap-2 bg-indigo-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              <PlusCircle size={20} />
              New Note / Diary Entry
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {notes.length === 0 ? (
              <p className="text-center text-gray-500 italic mt-8">
                No notes or diary entries yet. Create your first note!
              </p>
            ) : (
              <div className="space-y-2">
                {notes.map(note => (
                  <article
                    key={note.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedNote?.id === note.id 
                        ? 'border-indigo-300 bg-indigo-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-indigo-200'
                    }`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="font-semibold text-gray-900 truncate flex-1 pr-2">
                        {note.title}
                      </h2>
                      <button 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                      {note.content.substring(0, 100)}
                      {note.content.length > 100 ? '...' : ''}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="font-medium">
                        {note.updatedAt.toLocaleDateString()}
                      </span>
                      {note.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {note.tags.slice(0, 2).map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {note.tags.length > 2 && (
                            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                              +{note.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Note Editor */}
        <main className="flex-1 bg-white flex flex-col">
          {selectedNote ? (
            <div className="h-full flex flex-col">
              {/* Editor Header */}
              <div className="border-b border-gray-200 p-4 flex justify-end">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={saveNote}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      <Save size={20} />
                      Save Note
                    </button>
                    <button 
                      onClick={cancelEdit}
                      className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      <X size={20} />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => startEditing(selectedNote)}
                    className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors"
                  >
                    <Edit3 size={20} />
                    Edit Note
                  </button>
                )}
              </div>

              {/* Editor Content */}
              <div className="flex-1 overflow-hidden">
                {isEditing ? (
                  <div className="h-full p-4 lg:p-6 flex flex-col gap-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-xl lg:text-2xl font-bold border-2 border-gray-200 rounded-lg px-3 lg:px-4 py-2 lg:py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="Note title..."
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 border-2 border-gray-200 rounded-lg p-3 lg:p-4 focus:border-indigo-500 focus:outline-none resize-none transition-colors"
                      placeholder="Write your note here..."
                    />
                    <input
                      type="text"
                      value={editTags}
                      onChange={(e) => setEditTags(e.target.value)}
                      className="border-2 border-gray-200 rounded-lg px-3 lg:px-4 py-2 lg:py-3 focus:border-indigo-500 focus:outline-none text-sm transition-colors"
                      placeholder="Tags (comma separated)..."
                    />
                  </div>
                ) : (
                  <article className="h-full overflow-y-auto p-4 lg:p-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {selectedNote.title}
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 mb-4 text-sm text-gray-600 pb-4 border-b border-gray-200">
                      <span>Created: {selectedNote.createdAt.toLocaleDateString()}</span>
                      <span>Updated: {selectedNote.updatedAt.toLocaleDateString()}</span>
                    </div>
                    {selectedNote.tags.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {selectedNote.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      {selectedNote.content.split('\n').map((line, index) => (
                        <p key={index} className="min-h-[1.5rem]">{line}</p>
                      ))}
                    </div>
                  </article>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <BookOpen size={64} className="mb-4 opacity-50" alt="Open book icon" />
              <h2 className="text-xl font-semibold mb-2 text-gray-600">Welcome to Your Online Notebook, Diary and Note Taking App</h2>
              <p className="text-center">Select a note from the sidebar or create a new one to get started with your personal diary.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
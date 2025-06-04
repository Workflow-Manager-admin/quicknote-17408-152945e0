import { v4 as uuidv4 } from 'uuid';
import type { Note } from '~/types/note';

// Get notes from localStorage
export const getNotes = (): Note[] => {
  if (typeof window === 'undefined') return [];
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

// Save notes to localStorage
export const saveNotes = (notes: Note[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Create a new note
export const createNote = (title: string, content: string): Note => {
  const now = new Date();
  return {
    id: uuidv4(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
};

// Add a new note
export const addNote = (title: string, content: string): void => {
  const notes = getNotes();
  const newNote = createNote(title, content);
  notes.unshift(newNote);
  saveNotes(notes);
};

// Update an existing note
export const updateNote = (id: string, title: string, content: string): void => {
  const notes = getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      content,
      updatedAt: new Date(),
    };
    saveNotes(notes);
  }
};

// Delete a note
export const deleteNote = (id: string): void => {
  const notes = getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  saveNotes(filteredNotes);
};

// Search notes
export const searchNotes = (query: string): Note[] => {
  const notes = getNotes();
  if (!query.trim()) return notes;
  
  const searchTerm = query.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm)
  );
};

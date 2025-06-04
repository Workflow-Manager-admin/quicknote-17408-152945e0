import { useState, useEffect } from 'react';
import type { MetaFunction } from "@remix-run/node";
import { PlusIcon } from '@heroicons/react/24/outline';
import type { Note } from '~/types/note';
import { getNotes, addNote, updateNote, deleteNote, searchNotes } from '~/utils/notes';
import NoteCard from '~/components/NoteCard';
import NoteEditor from '~/components/NoteEditor';
import SearchBar from '~/components/SearchBar';

export const meta: MetaFunction = () => {
  return [
    { title: "QuickNote - Simple Note Taking App" },
    { name: "description", content: "A simple and intuitive notes app for quick note-taking" },
  ];
};

export default function Index() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();

  useEffect(() => {
    // Load notes on mount
    const loadedNotes = getNotes();
    setNotes(loadedNotes);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredNotes = searchNotes(query);
    setNotes(filteredNotes);
  };

  const handleAddNote = () => {
    setEditingNote(undefined);
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  const handleSaveNote = (title: string, content: string) => {
    if (editingNote) {
      updateNote(editingNote.id, title, content);
    } else {
      addNote(title, content);
    }
    setIsEditing(false);
    setEditingNote(undefined);
    setNotes(getNotes());
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
      setNotes(getNotes());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">QuickNote</h1>
          <p className="mt-2 text-gray-600">Take notes quickly and easily</p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="w-64">
            <SearchBar value={searchQuery} onChange={handleSearch} />
          </div>
          <button
            onClick={handleAddNote}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            New Note
          </button>
        </div>

        {isEditing ? (
          <div className="rounded-lg bg-white p-6 shadow">
            <NoteEditor
              note={editingNote}
              onSave={handleSaveNote}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
            {notes.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                {searchQuery
                  ? 'No notes found matching your search'
                  : 'No notes yet. Click "New Note" to create one!'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Note } from '~/types/note';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{note.title}</h3>
      <p className="text-gray-600">{note.content}</p>
      
      {isHovered && (
        <div className="absolute right-2 top-2 flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-primary"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-500"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-400">
        Last updated: {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}

import { EmptyState } from "@/components/ui/empty-state-";
import { Note } from "../note-types";
import { NotebookText } from "lucide-react";
import { NoteListItem } from "./note-list-item";

interface NoteListProps {
  notes: Note[];
  selectedNoteId?: string;
  onSelect: (noteId: string) => void;
}

export function NoteList({ notes, selectedNoteId, onSelect }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <EmptyState
        icon={NotebookText}
        title="No notes yet"
        description="Create your first note to start capturing ideas."
        className="border-0"
      />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          selected={selectedNoteId === note.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

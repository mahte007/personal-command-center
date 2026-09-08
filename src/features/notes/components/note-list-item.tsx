import { Note } from "@/features/notes/note-types";
import { cn } from "@/lib/utils";
import { getNoteDisplayTitle } from "../note-util";

interface NoteListItemProps {
  note: Note;
  selected?: boolean;
  onSelect: (noteId: string) => void;
}

export function NoteListItem({
  note,
  selected = false,
  onSelect,
}: NoteListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(note.id)}
      className={cn(
        "w-full rounded-lg px-3 py-3 text-left",
        "transition-colors",
        "focus-within:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "bg-secondary text-secondary-foreground"
          : "hover:bg-surface-hover",
      )}
    >
      <p className="truncate text-sm font-medium">
        {getNoteDisplayTitle(note)}
      </p>

      <p className="mt-1 truncate text-xs text-muted-foreground">
        {note.content.trim() || "No content"}
      </p>
    </button>
  );
}

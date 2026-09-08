"use client";

import { Button } from "@/components/ui/button";
import { Note } from "../note-types";
import { Trash2 } from "lucide-react";

interface NoteEditorProps {
  note: Note;
  onChange: (updates: Partial<Pick<Note, "title" | "content">>) => void;
  onDelete: () => void;
}

export function NoteEditor({ note, onChange, onDelete }: NoteEditorProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-3 border-b border-border px-6 py-4">
        <input
          value={note.title}
          onChange={(event) => onChange({ title: event.target.value })}
          placeholder="Untitled note"
          aria-label="Note title"
          className="min-w-0 flex-1 bg-transparent text-xl font-semibold outline-none placeholder:text-muted-foreground"
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          aria-label="Delete note"
        >
          <Trash2 />
        </Button>
      </div>

      <textarea
        value={note.content}
        onChange={(event) => onChange({ content: event.target.value })}
        placeholder="Start writing..."
        aria-label="Note content"
        className="min-h-100 flex-1 resize-none bg-transparent p-6 text-sm leading-7 outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

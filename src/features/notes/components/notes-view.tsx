"use client"

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { NoteEditor } from "@/features/notes/components/note-editor";
import { NoteList } from "@/features/notes/components/note-list";
import { getNotesByRecentUpdate } from "@/features/notes/note-selectors";
import { useNotes } from "@/features/notes/note-provider";

export function NotesView() {
  const { notes, loaded, addNote, updateNote, deleteNote, restoreNote } =
    useNotes();

  const { showToast } = useToast();

  const [selectedNoteId, setSelectedNoteId] = useState<string>();

  const sortedNotes = useMemo(() => getNotesByRecentUpdate(notes), [notes]);

  const selectedNote = sortedNotes.find((note) => note.id === selectedNoteId);

  function handleAddNote() {
    const note = addNote();

    setSelectedNoteId(note.id);
  }

  function handleDeleteNote() {
    if (!selectedNote) return;

    const deletedNote = selectedNote;

    deleteNote(deletedNote.id);

    setSelectedNoteId(undefined);

    showToast({
      title: "Note deleted",
      description: deletedNote.title || "Untitled note",
      action: {
        label: "Undo",
        onClick: () => {
          restoreNote(deletedNote);

          setSelectedNoteId(deletedNote.id);
        },
      },
    });
  }

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading notes...</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="grid min-h-162.5 md:grid-cols-[280px]">
        <aside className="border-r border-border">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="font-medium">Notes</span>

            <Button size="sm" onClick={handleAddNote}>
              <Plus />
              New
            </Button>
          </div>

          <div className="p-2">
            <NoteList
              notes={sortedNotes}
              selectedNoteId={selectedNoteId}
              onSelect={setSelectedNoteId}
            />
          </div>
        </aside>

        <section className="min-w-0">
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onChange={(updates) => updateNote(selectedNote.id, updates)}
              onDelete={handleDeleteNote}
            />
          ) : (
            <div className="flex h-full min-h-125 items-center justify-center p-8">
              <div className="text-center">
                <p className="font-medium">Select a note</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Choose an existing note or create a new one.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

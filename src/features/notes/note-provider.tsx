"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getNotes, saveNotes } from "@/features/notes/storage/note-storage";
import type { Note } from "@/features/notes/note-types";
import { createNote } from "@/features/notes/note-util";

interface NoteContextValue {
  notes: Note[];
  loaded: boolean;
  addNote: () => Note;
  updateNote: (
    noteId: string,
    updates: Partial<Pick<Note, "title" | "content">>,
  ) => void;
  deleteNote: (noteId: string) => void;
  restoreNote: (note: Note) => void;
}

const NoteContext = createContext<NoteContextValue | null>(null);

interface NoteProviderProps {
  children: ReactNode;
}

export function NoteProvider({ children }: NoteProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotes(getNotes());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    saveNotes(notes);
  }, [notes, loaded]);

  function addNote() {
    const note = createNote();

    setNotes((current) => [note, ...current]);

    return note;
  }

  function updateNote(
    noteId: string,
    updates: Partial<Pick<Note, "title" | "content">>,
  ) {
    setNotes((current) =>
      current.map((note) =>
        note.id === noteId
          ? {
              ...note,
              ...updates,
              updateAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  }

  function deleteNote(noteId: string) {
    setNotes((current) => current.filter((note) => note.id !== noteId));
  }

  function restoreNote(note: Note) {
    setNotes((current) => {
      const exists = current.some((currentNote) => currentNote.id === note.id);

      if (exists) return current;

      return [note, ...current];
    });
  }

  const value = useMemo(
    () => ({
      notes,
      loaded,
      addNote,
      updateNote,
      deleteNote,
      restoreNote,
    }),
    [notes, loaded],
  );

  return <NoteContext value={value}>{children}</NoteContext>;
}

export function useNotes() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }

  return context;
}

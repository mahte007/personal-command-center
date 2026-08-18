import { Note } from "./note-types";

export function createNote(): Note {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    createdAt: now,
    updatedAt: now,
  };
}

export function getNoteDisplayTitle(note: Note) {
  const title = note.title.trim();

  return title || "Untitled note";
}

import { Note } from "./note-types";

export function getNotesByRecentUpdate(notes: Note[]) {
  return [...notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getRecentNotes(notes: Note[], limit = 5) {
  return getNotesByRecentUpdate(notes).slice(0, limit);
}

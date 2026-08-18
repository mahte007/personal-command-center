import { Note } from "../note-types";

const STORAGE_KEY = "orbit.notes";

function isNoteArray(value: unknown): value is Note[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((note) => {
    if (typeof note !== "object" || note === null) {
      return false;
    }

    const candidate = note as Partial<Note>;

    return (
      typeof candidate.id === "string" &&
      typeof candidate.title === "string" &&
      typeof candidate.content === "string" &&
      typeof candidate.createdAt === "string" &&
      typeof candidate.updatedAt === "string"
    );
  });
}

export function getNotes(): Note[] {
  if (typeof window === "undefined") return [];

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);

    return isNoteArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

"use client";

import Link from "next/link";
import { useNotes } from "../note-provider";
import { getRecentNotes } from "../note-selectors";
import { getNoteDisplayTitle } from "../note-util";

export function RecentNotes() {
  const { notes, loaded } = useNotes();

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const recent = getRecentNotes(notes,  4)

  if (recent.length === 0) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">
                No notes yet.
            </p>

            <Link href={"/notes"} className="mt-3 inline-block text-sm font-medium text-muted-foreground hover:text-foreground">
                Create a note
            </Link>
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
        {recent.map((note) => (
            <Link key={note.id} href={"/notes"} className="group">
                <p className="truncate text-sm font-medium group-hover:underline">
                    {getNoteDisplayTitle(note)}
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {note.content || "No content"}
                </p>
            </Link>
        ))}

        <Link href={"/notes"} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            View all notes
        </Link>
    </div>
  )
}

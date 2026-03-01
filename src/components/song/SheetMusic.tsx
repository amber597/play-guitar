import type { Note } from "@tonejs/midi/dist/Note"
import './SheetMusic.css'

type Props = {
    notes: Note[],
    currentIndex: number
}

export default function SheetMusic({notes, currentIndex}: Props) {

    return <>
    <div className="note-row">
        {notes.map((note, index) => (
            <div key={index} className={currentIndex === index ? "note active": "note"}>
                {note.name}
            </div>
        ))}

    </div>
    </>
}
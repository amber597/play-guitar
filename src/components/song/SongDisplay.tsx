import { use, useEffect, useState } from "react";
import SheetMusic from "./SheetMusic";
import {Synth, start, getContext, getTransport} from "tone";
import type { Note } from "@tonejs/midi/dist/Note";

type Props = {
    song: any;
    isPlay: boolean
}

export default function SongDisplay({song}: Props) {

    const [notes, setNotes] = useState<Note[]>([]);
    const [noteIndex, setNoteIndex] = useState<number>(0);

    useEffect(() => {
        if (!song) return;

        if (!song.tracks) {
            console.log("no tracks")
        }

        const notes: Note[] = song.tracks
                                .slice(27, 36)
                                .flatMap((track: any) => track.notes)
                                .sort((a: Note, b: Note) => a.time - b.time);;

        const synth = new Synth().toDestination();

        setNotes(notes);

        const transport = getTransport();
        transport.stop();
        transport.cancel(); // clear the old schedules

        // this part is only scheduling this wont play the notes
        notes.forEach((note, index) => {
            transport.schedule((time) => {
                console.log(note);
                synth.triggerAttackRelease(note.name, note.duration, time)
                setNoteIndex(index);
            }, note.time)
        })

    }, [song])


    return <>
        <SheetMusic notes={notes} currentIndex={noteIndex} />
    </>
}
import { use, useEffect, useState } from "react";
import SheetMusic from "./SheetMusic";
import {Synth, start, getContext, getTransport} from "tone";
import type { Note } from "@tonejs/midi/dist/Note";
import * as Tone from "tone";

type Props = {
    song: any;
    isPlay: boolean
}

export default function SongDisplay({song}: Props) {

    

    const [notes, setNotes] = useState<any>(null);
    const [noteIndex, setNoteIndex] = useState<number>(0);

    useEffect(() => {
        if (!song) return;

        if (!song.tracks) {
            console.log("no tracks")
        }

        // const notes: Note[] = song.tracks
        //                         .slice(27, 36)
        //                         .flatMap((track: any) => track.notes)
        //                         .sort((a: Note, b: Note) => a.time - b.time);

        var notes: any[] = []

        const bpm = song.tempo;
        console.log(bpm)
        const secondsPerBeat = 60 / bpm;
        
        const durationMap: any = {
                1: secondsPerBeat * 4,   // whole
                2: secondsPerBeat * 2,   // half
                4: secondsPerBeat,       // quarter
                8: secondsPerBeat / 2,   // eighth
                16: secondsPerBeat / 4,  // sixteenth
                32: secondsPerBeat / 8,  // thirty-second
            }

        let absoluteTime = 0; // each bar starts from 0

        song.tracks[3].staves.forEach((stave: any) => {
            stave.bars.forEach((bar: any) => {
                let barDuration = 0;  // track the longest note in this bar
                bar.voices.forEach((voice: any) => {
                    voice.beats.forEach((beat: any) => {
                        beat.notes.forEach((note: any) => {
                            notes.push({
                                string: note.string,
                                fret: note.fret,
                                pitch: note.realValue,
                                name: Tone.Frequency(note.realValue, "midi").toNote(),
                                duration: beat.playbackDuration,
                                time: absoluteTime + beat.playbackStart 

                            });        
                        });
                        const beatEnd = beat.playbackStart + beat.playbackDuration;
                            if (beatEnd > barDuration) barDuration = beatEnd; 
                    });  
                });
                absoluteTime += barDuration;
            });
        });
    
        const synth = new Synth().toDestination();

        setNotes(notes);

        const transport = getTransport();
        transport.stop();
        transport.cancel(); // clear the old schedules

        console.log(notes);
        transport.PPQ = 960;
        transport.bpm.value = bpm

        // this part is only scheduling this wont play the notes
        notes.forEach((note, index) => {
            transport.schedule((time) => {
                console.log(note);
                synth.triggerAttackRelease(note.name, `${note.duration}i`, time)
                setNoteIndex(index);
            }, `${note.time}i`)
        })

    }, [song])


    return <>
        <SheetMusic notes={notes} currentIndex={noteIndex} />
    </>
}
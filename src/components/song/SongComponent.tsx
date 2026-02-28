import { useEffect, useState } from "react";
import { sleep } from "../utils/Time";
import SongDisplay from "./SongDisplay";

const song = [
    { note: "C" , duration: 1000},
    { note: "D" , duration: 1000},
    { note: "E" , duration: 1000},
];

type Props = {
    currNote : String | null;
}

export default function SongComponent({currNote} : Props) {
    const [songIndex, setSongIndex] = useState<number>(0);

    const [isPlay, setIsPlay] = useState<boolean>(false);

    const compareNotes = async (idx: number) => {
        const songNote = song[idx]["note"];
        const duration  = song[idx]["duration"];

        const start = Date.now();
        while (Date.now() - start < duration) {
            // I will compare it for whole duration of note instead of just at start
            if (songNote == currNote) {
                return true;
            }
            
            //run loop every 100 ms
            await sleep(100);
        }

        return false;
    }

    useEffect(() => {
        if(isPlay)  {

            const play = async () => {
                for (let idx = songIndex; idx < song.length; idx++) {
                    // for now I am simply doing it simple, just checking if current Note matches current note of Song
                    // will need to figure out how song is going to be, its just note and duration now
                    // I would prefer something with timestamps so I can map it to real song and have loop and speed functionalities later

                    // I won't play the note at exact time, lets make it If I play it during the duration it will work
                    if (await compareNotes(idx)) {
                        console.log("Yay!");
                    } else {
                        console.log("Nay!");
                    }
                    setSongIndex(idx + 1);
                    // how the fuck do I use sleep in javascript
                    // setTimeout(() => {}, duration);

                }
            }
            
            play();
            
        }
    }, [isPlay])


    return <>
        <SongDisplay song={song} songIndex={songIndex}/>
        <button onClick={() => setIsPlay(isPlay => !isPlay)}> Play </button>
    </>
}
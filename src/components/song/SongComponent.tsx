import { useEffect, useState } from "react";
import { sleep } from "../utils/Time";
import SongDisplay from "./SongDisplay";
import { Midi } from "@tonejs/midi";
import { getSong } from "../../services/songService";
import { getContext, getTransport } from "tone";

type Props = {
    currNote : String | null;
}

export default function SongComponent({currNote} : Props) {
    const [song, setSong] = useState<any>(null);
    const [isPlay, setIsPlay] = useState<boolean>(false);


    useEffect(() => {
        const updateSong = async ()=> {
            const _song = await getSong("/assets/Guns_N'_Roses-Sweet_Child_O'_Mine.mid");
            const midi = new Midi(_song);

            // I don't know what this midi obj is properly
            console.log(midi);
            setSong(midi);
        }     
        updateSong();
    }, [])

    async function handlePlay() {


        const transport = getTransport(); // I guess its common througout
        
        // I guess this func is async
        const nextIsPlay = !isPlay
        setIsPlay(isPlay => !isPlay);
        // console.log(nextIsPlay);
        if (nextIsPlay) {
            transport.start();
        } else {
            transport.pause();
        }


    }


    return <>
        <SongDisplay song={song} isPlay={isPlay}/>
        <button onClick={handlePlay}> Play </button>
    </>
}
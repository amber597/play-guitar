import { useEffect, useState } from "react";
import { sleep } from "../utils/Time";
import SongDisplay from "./SongDisplay";
import { Midi } from "@tonejs/midi";
import { getSong } from "../../services/songService";
import { getContext, getTransport } from "tone";
import getTabData from "../utils/getTabData";
import AlphaTabPlayer from "./AlphaTabPlayer";

type Props = {
    currNote : String | null;
}

export default function SongComponent({currNote} : Props) {
    // const [song, setSong] = useState<any>(null);
    const [songArrBuffer, setSongArrBuffer] = useState<any> (null);
    const [isPlay, setIsPlay] = useState<boolean>(false);


    useEffect(() => {
        const updateSong = async ()=> {
            // const songArrBuffer = await getSong("/assets/Guns_N'_Roses-Sweet_Child_O'_Mine.mid");
            // const song = new Midi(songArrBuffer);

            // I don't know what this midi obj is properly
            // console.log(song);
            // What a retard I am, midi file has music data not tab, now I have to do all the work again `_`.
            // setSong(song);

            // const songArrBuffer = await getSong("/assets/Guns_N'_Roses-Sweet_Child_O'_Mine.gp");
            // // I am a retard should've used this from the begining
            // const song = getTabData(songArrBuffer);
            // console.log(song)
            // setSong(song);

            // Now I am done with custom component I am using existing one
            const _songArrBuffer = await getSong("/assets/Guns_N'_Roses-Sweet_Child_O'_Mine.gp");
            setSongArrBuffer(_songArrBuffer);
            

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
        {/* <SongDisplay song={song} isPlay={isPlay}/> */}
        <AlphaTabPlayer songArrayBuffer={songArrBuffer} isPlay={isPlay}/>
        {/* <button onClick={handlePlay}> Play </button> */}
        <button onClick={() => setIsPlay(isPlay => !isPlay)}> Play </button>
    </>
}
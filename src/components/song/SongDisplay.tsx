import { useEffect } from "react";

type Props = {
    song: Array<{note: string, duration: number}>;
    songIndex: number;
}

export default function SongDisplay({song, songIndex}: Props) {

    useEffect(() => {
        if (songIndex >= song.length) {
            return
        }
        console.log("current Note: ", song[songIndex]["note"])
    }, [song, songIndex])


    return <>
    </>
}
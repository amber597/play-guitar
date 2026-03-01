import * as alphaTab from "@coderline/alphatab";
import { useEffect, useRef } from "react";
import "./AlphaTabPlayer.css"

type Props = {
    songArrayBuffer: any;
    isPlay: boolean;
}

export default function AlphaTabPlayer({songArrayBuffer, isPlay}: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<alphaTab.AlphaTabApi | null>(null);

    useEffect(( ) => {
        if (!containerRef.current || !songArrayBuffer) return

        const api = new alphaTab.AlphaTabApi(containerRef.current, {
            core: {
                fontDirectory: "/node_modules/@coderline/alphatab/dist/font/", // ← explicit font path
            },
            display: {
                layoutMode: alphaTab.LayoutMode.Page,
                staveProfile: alphaTab.StaveProfile.Tab, // tabs only, or TabMixed for notation + tabs
            },
            player: {
                enablePlayer: true,
                enableCursor: true,   // ← this is the sliding pointer
                enableAnimatedBeatCursor: true,
                soundFont: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2", // you need a soundfont file
            }
        });

        apiRef.current = api;

        api.load(songArrayBuffer, [3]);

        return () => api.destroy();

    }, [songArrayBuffer]);

    useEffect(() => {
        if (!apiRef.current) return;
        if (isPlay) {
            apiRef.current.play();
        } else {
            apiRef.current.pause();
        }
    }, [isPlay]);

    return <div ref={containerRef} style={{ width: "100%", background: "#fff" }} />;

}
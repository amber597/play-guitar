import { useEffect, useRef, useState } from "react";


export default function NoteListener() {

    const [isMicOn, setIsMicOn] = useState<boolean>(false); // to toggle mic
    const audioStreamRef = useRef<MediaStream | null>(null); // to store Audio stream
    const audioContextRef = useRef<AudioContext | null>(null); // To Get Audio context from stream
    const audioAnalyzerRef = useRef<AnalyserNode | null>(null); // this is where the thing which analyzes the audio stays
    const animationFrameRef = useRef<number | null> (null); // to store the animation fram so I can calcel it during cleanup

    useEffect(() => {  
        console.log( isMicOn ? 'Mic is On' : 'Mic is Off');
        if (isMicOn) {
            setUpAudio();
        } else {
            cleanUp();
        }
    }, [isMicOn])

    function cleanUp() {
        // lets go of all the reources
        const mediaStreams = audioStreamRef.current;
        mediaStreams?.getTracks().forEach(track => {
            track.stop();
        })
        audioStreamRef.current = null;

        const audioContext = audioContextRef.current;
        audioContext?.close();
        audioContextRef.current = null;

        audioAnalyzerRef.current = null;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    }
 
    useEffect(() => {
        return () => {
            // Cleanup code runs inside the return function, here it only runs when the component ends
            // if there was dependency here, it would run before the code with preious value
            cleanUp();
        };
    }, [])

    async function setUpAudio() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio:true});
        audioStreamRef.current = stream;
        

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);

        const analyzer = audioContext.createAnalyser();
        audioAnalyzerRef.current = analyzer;

        source.connect(analyzer);
        // const buffer = new Float32Array(); // this creates a buffer of size 0
        analyzer.fftSize = 2048
        const buffer = new Float32Array(analyzer.fftSize)
        
        const readAudio = () => {
            analyzer.getFloatTimeDomainData(buffer);
            console.log("first 5 values from buffer ", buffer.slice(0, 5));
            animationFrameRef.current = requestAnimationFrame(readAudio); // this makes it run forever unless cancel it
            // requestAnimationFrame(readAudio); // This will continue forever even when Mic is off
        }    
        
        readAudio()
        
    }

return <>
    <div>
        {isMicOn ? <p>Mic is On</p>: <p>Mic is Off</p>}
    </div>
    {/* This may break as react does batch updates and setIsMicOn(!isMicOn), let say there are multiple clicks and both clicks will 
    use same previous value of isMicOn*/}
    <button onClick={() => {setIsMicOn(isMicOn => !isMicOn)}}>
        toggle mic
    </button>
</>
    
}
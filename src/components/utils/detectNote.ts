import detectPitch from "./pitchDetector";

function pitchToNote(freq: number|null) {
    if (!freq){
        return null;
    }

    const noteStrings = [
    "C", "C#", "D", "D#", "E", 
    "F", "F#", "G", "G#", "A", "A#", "B"
  ];

    const noteNumber = 12 * (Math.log2(freq / 440)) + 69;
    const rounded = Math.round(noteNumber);
    const noteIndex = rounded % 12;
    return noteStrings[noteIndex];

}

export default function detectNote(buffer: Float32Array|null, sampleRate: number) {
    const freq = detectPitch(buffer, sampleRate);
    return pitchToNote(freq);
}
import { PitchDetector } from "pitchy";

export default function detectPitch(buffer: Float32Array|null, sampleRate: number): number|null {
    if (!buffer) return null;

    const detector = PitchDetector.forFloat32Array(buffer.length);
    const [pitch, clarity] = detector.findPitch(buffer, sampleRate);

    if(clarity > 0.9) {
        return pitch;
    }

    return null;
    
}
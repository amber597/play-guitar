import * as alphaTab from "@coderline/alphatab";

export default function getTabData(arrayBuffer: ArrayBuffer) {
    const settings = new alphaTab.Settings();

    const score = alphaTab.importer.ScoreLoader.loadScoreFromBytes(
        new Uint8Array(arrayBuffer),
        settings
    );

    

    return score;
}
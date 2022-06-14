import { Midi, Note } from "@tonaljs/tonal";

function beatToSecond(bpm: number): number {
    return (bpm / 60);
}

function scaleNotes(tonic: string, intervals: string[]) {
    var scaleNotes: string[] = [];
    intervals.map((interval) => scaleNotes.push(makeSharp(Note.transpose(tonic, interval))))
    return scaleNotes;
}

function makeSharp(note: string) {
    return Midi.midiToNoteName(Note.midi(note + "3")!, {sharps:true, pitchClass: true})
}


function makeSharps(notes: string[]) {
    notes.map((note) => {
        makeSharp(note);
    })
    return notes;
}

export {beatToSecond, scaleNotes, makeSharps, makeSharp};
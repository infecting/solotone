import { Midi, Note } from "@tonaljs/tonal";
import moment from 'moment'

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

function getThisWeekDates() {
    var weekDates= []; 
  
    for (var i = 0; i < 27 ; i++) {
      weekDates.push(moment().day(i).toDate()); 
    }
  
    return weekDates; 
  }

export {getThisWeekDates, beatToSecond, scaleNotes, makeSharps, makeSharp};
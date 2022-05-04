export interface ChordData {
    chord: string;
    beat: number
}

export interface TrackData {
    chords: Array<ChordData>;
    endTime: number;
}
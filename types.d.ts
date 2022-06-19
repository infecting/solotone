export interface ChordData {
    chord: string;
    beat: number
}

export interface TrackData {
    chords: Array<ChordData>;
    endTime: number;
}

export interface Schedule {
    start: Date
    end: Date
}

declare module '@wojtekmaj/react-timerange-picker';
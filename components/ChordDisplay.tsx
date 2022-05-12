import { Chord } from "@tonaljs/tonal";
import React from "react";

export default function ChordDisplay({ chord }: { chord: any }) {
  return (
    <div>
      <p>{chord.chord}</p>
      <p>{Chord.get(chord.chord).notes}</p>
    </div>
  );
}

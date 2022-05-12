import { Chord } from "@tonaljs/tonal";
import React from "react";

export default function ChordDisplay({ chord }: { chord: any }) {
  return (
    <div>
      <p>Current Chord: {chord}</p>
      <p>Notes in Chord: {Chord.get(chord).notes}</p>
    </div>
  );
}

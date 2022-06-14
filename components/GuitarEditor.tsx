import React, { useState } from "react";
import data from "../data.json";
import Guitar from "./Guitar";
import { makeSharps } from "../helper";
import { Note } from "@tonaljs/tonal";

export default function GuitarEditor({ notes }: { notes: Array<string> }) {
  console.log(notes);
  const [stringTuning, setStringTuning] = useState<Array<string>>(
    ["E", "A", "D", "G", "B", "E"].reverse()
  );
  return (
    <div>
      <select
        name=""
        id=""
        onChange={(e) => setStringTuning(e.target.value.split(",").reverse())}
      >
        {data.tunings.map((tuning) => (
          <option key={tuning.name} value={tuning.strings}>
            {tuning.name}
          </option>
        ))}
      </select>
      <Guitar
        notes={makeSharps(notes)}
        strings={stringTuning.length - 1}
        frets={13}
        tuning={stringTuning}
      />
    </div>
  );
}

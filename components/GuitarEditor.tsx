import React, { useState } from "react";
import data from "../data.json";
import Guitar from "./Guitar";

export default function GuitarEditor({ notes }: { notes: Array<string> }) {
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
          <option value={tuning.strings}>{tuning.name}</option>
        ))}
      </select>
      <Guitar
        notes={notes}
        strings={stringTuning.length - 1}
        frets={13}
        tuning={stringTuning}
      />
    </div>
  );
}

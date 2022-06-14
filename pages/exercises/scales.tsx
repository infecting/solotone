import React, { useState } from "react";
import { Scale, ScaleType } from "@tonaljs/tonal";
import GuitarEditor from "../../components/GuitarEditor";

export default function scales() {
  const [scale, setScale] = useState("A major pentatonic");

  function updateState(e: string) {
    console.log(e);
    setScale(e);
  }
  return (
    <div>
      <select onChange={(e) => updateState("A " + e.target.value)}>
        {ScaleType.all().map((scale) => (
          <option value={scale.name}>{scale.name}</option>
        ))}
      </select>
      <GuitarEditor notes={Scale.get(scale).notes} />
    </div>
  );
}

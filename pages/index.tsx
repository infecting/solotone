import type { NextPage } from "next";
import { ChordType, Chord } from "@tonaljs/tonal";
import { useState } from "react";
import Player from "../components/Player";

const Home: NextPage = () => {
  const [bpm, setBpm] = useState(100);
  const [loopLength, setLoopLength] = useState(4);
  const [trackChords, setTrackChords] = useState<
    Array<{ chord: string; beat: number }>
  >([]);

  var chords = ChordType.all();
  var notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

  function chordify(e: any) {
    setTrackChords((prevState) => [
      ...prevState,
      { chord: e.target.value, beat: prevState.length },
    ]);
  }

  function changeBeat(e: any) {
    if (e.target.value < trackChords[e.target.name - 1].beat) {
      return;
    } else {
      let temp = [...trackChords];
      temp[parseInt(e.target.name)].beat = parseFloat(e.target.value);
      setTrackChords(temp);
    }
  }

  function deleteEntry(i: number) {
    let tmp = [...trackChords];
    tmp.splice(i, 1);
    tmp.map((c, i) => {
      c.beat = i;
    });
    setTrackChords(tmp);
  }

  return (
    <div>
      <input
        type="number"
        placeholder="BPM"
        defaultValue="100"
        onChange={(e) => setBpm(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Loop Length"
        defaultValue="4"
        onChange={(e) => setLoopLength(parseInt(e.target.value))}
      />
      <br />
      <select name="" id="" onChange={(e) => chordify(e)}>
        {notes.map((note) =>
          chords.map((chord) => (
            <option value={note + chord.aliases[0]}>
              {note + chord.aliases[0]}
            </option>
          ))
        )}
      </select>
      <div>
        {trackChords.map((chord, i) => (
          <div key={i}>
            <p>{chord.chord}</p>
            <p>{Chord.get(chord.chord).notes}</p>
            <input
              type="number"
              name={i.toString()}
              disabled={i == 0}
              defaultValue={chord.beat}
              onChange={(e) => changeBeat(e)}
              max={loopLength}
              min={i - 0.75}
            />
            <button onClick={() => deleteEntry(i)}>Delete</button>
          </div>
        ))}
      </div>
      <Player bpm={bpm} chords={trackChords} loopEnd={loopLength} />
    </div>
  );
};

export default Home;

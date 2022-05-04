import type { NextPage } from "next";
import { ChordType, Chord } from "@tonaljs/tonal";
import { useState } from "react";
import Player from "../components/Player";
import { ChordData, TrackData } from "../types";

const Home: NextPage = () => {
  const [bpm, setBpm] = useState(100);
  const [loopLength, setLoopLength] = useState(4);
  const [currentSection, setCurrentSection] = useState(0);
  const [intro, setIntro] = useState(0);
  const [trackData, setTrackData] = useState<Array<TrackData>>([
    { chords: [], endTime: 20 },
  ]);

  var chords = ChordType.all();
  var notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

  function chordify(e: any) {
    let tmp = [...trackData];
    tmp[currentSection].chords.push({
      chord: e.target.value,
      beat: tmp[currentSection].chords.length,
    });
    setTrackData(tmp);
  }

  function changeEndTime(e: any) {
    let tmp = [...trackData];
    tmp[currentSection].endTime = parseFloat(e.target.value);
    setTrackData(tmp);
    console.log(tmp);
  }

  function addSection() {
    setTrackData((prevState) => [...prevState, { chords: [], endTime: 4 }]);
    setCurrentSection(currentSection + 1);
  }

  function changeBeat(e: any) {
    if (
      e.target.value < trackData[currentSection].chords[e.target.name - 1].beat
    ) {
      return;
    } else {
      let temp = [...trackData];
      temp[currentSection].chords[parseInt(e.target.name)].beat = parseFloat(
        e.target.value
      );
      setTrackData(temp);
    }
  }

  function deleteEntry(i: number) {
    let tmp = [...trackData];
    tmp[currentSection].chords.splice(i, 1);
    tmp[currentSection].chords.map((c, i) => {
      c.beat = i;
    });
    setTrackData(tmp);
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
      <input
        type="text"
        name=""
        id=""
        placeholder="End Time in bars"
        onChange={(e) => changeEndTime(e)}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Intro time in seconds"
        onChange={(e) => setIntro(parseFloat(e.target.value))}
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
      <button onClick={() => addSection()}>Add Section</button>
      <div>
        {trackData.map((_x, i) => (
          <button onClick={() => setCurrentSection(i)}>{i + 1}</button>
        ))}
      </div>
      <div>
        {trackData[currentSection].chords.map((chord, i) => (
          <div key={i}>
            <p>{chord.chord}</p>
            <p>{Chord.get(chord.chord).notes}</p>
            <label htmlFor={i.toString()}>Chord starting beat</label>
            <input
              id="beat"
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
      <Player intro={intro} bpm={bpm} data={trackData} loopEnd={loopLength} />
    </div>
  );
};

export default Home;

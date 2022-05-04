import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Chord } from "@tonaljs/tonal";

interface playerInfo {
  bpm: number;
  chords: Array<{ beat: number; chord: string }>;
  loopEnd: number;
}

export default function Player({ bpm, chords, loopEnd }: playerInfo) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  const [chord, setChord] = useState("");
  bpm = (60000 / bpm) * 0.001 * loopEnd;
  function getChord(seconds: number) {
    try {
      if (seconds == 0) {
        return;
      }
      var beatNum: number = parseFloat(
        (Number(seconds / bpm) % loopEnd).toFixed(2)
      );
      var currBeat: number = Math.floor(Number(seconds / bpm) % loopEnd);
      if (chords[currBeat] && beatNum % 0.25 == 0) {
        if (beatNum == chords[currBeat].beat) {
          setChord(chords[currBeat].chord);
          console.log("🎸 " + chords[currBeat].chord);
        }
      } else {
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div>
      {isSSR ? null : (
        <ReactAudioPlayer
          listenInterval={0.001}
          onListen={(p) => getChord(p)}
          controls
          src={"/backing_one.mp4"}
        />
      )}
      <p>Current Chord: {chord}</p>
      <p>Notes in chord: {Chord.get(chord).notes}</p>
    </div>
  );
}

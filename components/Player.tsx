import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Chord } from "@tonaljs/tonal";
import { TrackData } from "../types";
import Guitar from "./Guitar";
import ChordDisplay from "./ChordDisplay";

interface playerInfo {
  bpm: number;
  data: Array<TrackData>;
  loopEnd: number;
  intro: number;
  src: string;
}

export default function Player({ bpm, data, loopEnd, intro, src }: playerInfo) {
  const [currentSection, setCurrentSection] = useState(0);
  const [fileLength, setFileLength] = useState(0);
  const [chord, setChord] = useState("");
  bpm = (60000 / bpm) * 0.001 * loopEnd;
  function getChord(seconds: number) {
    seconds = seconds - intro;
    try {
      var bars = Math.floor(Number(seconds / bpm) / 4);
      if (bars > data[currentSection].endTime && data[currentSection + 1]) {
        setCurrentSection(currentSection + 1);
      } else if (
        data[currentSection - 1] &&
        bars < data[currentSection - 1].endTime
      ) {
        setCurrentSection(currentSection - 1);
      }
      if (seconds == 0) {
        return;
      }
      var beatNum: number = parseFloat(
        (Number(seconds / bpm) % loopEnd).toFixed(2)
      );
      var currBeat: number = Math.floor(Number(seconds / bpm) % loopEnd);
      if (data[currentSection].chords[currBeat] && beatNum % 0.25 == 0) {
        if (beatNum == data[currentSection].chords[currBeat].beat) {
          setChord(data[currentSection].chords[currBeat].chord);
          console.log("🎸 " + data[currentSection].chords[currBeat].chord);
        }
      } else {
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleLoadMetadata(e: any) {
    setFileLength(Math.floor(e.target.duration));
  }

  return (
    <div>
      <ReactAudioPlayer
        listenInterval={0.001}
        onListen={(p) => getChord(p)}
        controls
        onLoadedMetadata={(e) => handleLoadMetadata(e)}
        src={src}
      />
      <ChordDisplay chord={chord} />
      <Guitar notes={Chord.get(chord).notes} strings={5} frets={13} />
    </div>
  );
}

import { Note } from "@tonaljs/tonal";
import React from "react";

export default function Guitar({
  notes,
  frets,
  strings,
}: {
  notes: Array<string>;
  frets: number;
  strings: number;
}) {
  var intervals = [
    "1P",
    "2m",
    "2M",
    "3m",
    "3M",
    "4P",
    "4A",
    "5P",
    "6m",
    "6M",
    "7m",
    "7M",
    "1P",
  ];
  var tuning = ["E", "B", "G", "D", "A", "e"];
  function formatFret(fret: number, string: number) {
    var note = Note.simplify(Note.transpose(tuning[string], intervals[fret]));
    return note;
  }

  function colorify(fret: number, string: number) {
    var note = formatFret(fret, string);
    if (notes.includes(note)) {
      return "black";
    }
    return "white";
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <svg
        style={{
          height: "200px",
          marginTop: "1em",
          width: "950px",
        }}
      >
        {/* Nut */}
        {
          <line
            x1="60"
            x2="60"
            y1="25"
            y2={175}
            stroke="#000"
            strokeWidth={5}
          />
        }

        {/* Fret */}

        {[...Array(frets - 1)].map((e, i) => (
          <line
            x1={(i + 1) * (820 / frets) + 60}
            x2={(i + 1) * (820 / frets) + 60}
            y1="25"
            y2="175"
            stroke="#000"
          />
        ))}

        {/* Strings */}
        {[...Array(strings + 1)].map((e, i) => (
          <line
            x1="60"
            y1={(150 / strings) * i + 25}
            x2="818"
            y2={(150 / strings) * i + 25}
            stroke="#000"
            strokeWidth="1"
          />
        ))}

        {/*  Note */}
        {[...Array(frets * (strings + 1))].map((e, i) => (
          <g>
            <circle
              r="10"
              cx={
                (820 / frets) * Math.floor(i % frets) - 820 / (frets * 2) + 60
              }
              cy={Math.round(Math.floor(i / frets) * (150 / strings)) + 25}
              fill={colorify(i % frets, Math.floor(i / frets))}
              stroke="black"
            ></circle>
            <text
              fontSize="11"
              x={(820 / frets) * Math.floor(i % frets) - 820 / (frets * 2) + 60}
              y={Math.round(Math.floor(i / frets) * (150 / strings)) + 25}
              dominantBaseline="central"
              fill={
                colorify(i % frets, Math.floor(i / frets)) == "black"
                  ? "white"
                  : "black"
              }
              fontWeight={
                colorify(i % frets, Math.floor(i / frets)) == "black"
                  ? "bold"
                  : ""
              }
              textAnchor="middle"
            >
              {formatFret(i % frets, Math.floor(i / frets))}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

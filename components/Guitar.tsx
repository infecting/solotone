import { Note } from "@tonaljs/tonal";
import React from "react";

export default function Guitar({ notes }: { notes: Array<string> }) {
  var stringsNumber = 5;
  var intervals = [
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
  function formatFret(fret: number, string: number) {
    var tuning = ["E", "B", "G", "D", "A", "e"];
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
    <div>
      <svg
        style={{
          height: "150px",
          marginLeft: "2em",
          marginTop: "1em",
          width: "820px",
        }}
      >
        {/* Nut */}
        {<line x1="0" x2="0" y1="0" y2={200} stroke="#000" strokeWidth={5} />}

        {/* Fret */}

        {[...Array(12)].map((e, i) => (
          <line
            x1={(i + 1) * (820 / 12)}
            x2={(i + 1) * (820 / 12)}
            y1="0"
            y2="200"
            stroke="#000"
          />
        ))}

        {/* Strings */}
        {[...Array(stringsNumber + 1)].map((e, i) => (
          <line
            x1="0"
            y1={(150 / stringsNumber) * i}
            x2="820"
            y2={(150 / stringsNumber) * i}
            stroke="#000"
            strokeWidth="1"
          />
        ))}

        {/*  Note */}

        {[...Array(12 * (stringsNumber + 1))].map((e, i) => (
          <g>
            <circle
              r="10"
              cx={(820 / 12) * Math.floor(i % 12) + 820 / 24}
              cy={Math.round(Math.floor(i / 12) * (150 / stringsNumber))}
              fill={colorify(i % 12, Math.floor(i / 12))}
              stroke="black"
            ></circle>
            <text
              fontSize="11"
              x={(820 / 12) * Math.floor(i % 12) + 820 / 24}
              y={Math.round(Math.floor(i / 12) * (150 / stringsNumber))}
              dominantBaseline="central"
              fill={
                colorify(i % 12, Math.floor(i / 12)) == "black"
                  ? "white"
                  : "black"
              }
              fontWeight={
                colorify(i % 12, Math.floor(i / 12)) == "black" ? "bold" : ""
              }
              textAnchor="middle"
            >
              {formatFret(i % 12, Math.floor(i / 12))}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

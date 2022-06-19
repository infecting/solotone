import moment from "moment";
import React, { useState } from "react";
import TimeKeeper from "react-timekeeper";

interface props {
  day: Date;
  addSchedule: (e: {
    startDate: string;
    endDate: string;
    none: Boolean;
    recurring: Boolean;
    date: Date;
  }) => void;
}

export default function Day({ day, addSchedule }: props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recur, setRecur] = useState(false);
  const [none, setNone] = useState(false);
  return (
    <div>
      <h1>{moment(day, "YYYY-MM-DD HH:mm:ss").format("dddd MMM Do")}</h1>
      <TimeKeeper onChange={(e) => setStartTime(e.formatted24)} />
      <TimeKeeper onChange={(e) => setEndTime(e.formatted24)} />
      <br />
      <span>Recurring</span>
      <input onChange={() => setRecur(true)} type="radio" />
      <br />
      <span>No Availability</span>
      <input type="radio" onChange={() => setNone(true)} />
      <br />
      <button
        onClick={() =>
          addSchedule({
            date: day,
            startDate: startTime,
            endDate: endTime,
            none: none,
            recurring: recur,
          })
        }
      >
        Done
      </button>
    </div>
  );
}

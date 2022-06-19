import moment from "moment";
import React, { useState } from "react";
import Day from "../../components/Day";
import data from "../../data.json";
import { getThisWeekDates } from "../../helper";
import { Schedule } from "../../types";

export default function setup() {
  const [person, setPerson] = useState("");
  const [schedule, setSchedule] = useState<Array<Schedule>>([]);

  function addSchedule(e: {
    startDate: string;
    endDate: string;
    none: Boolean;
    recurring: Boolean;
    date: Date;
  }) {
    console.log(e);
    let temp = [...schedule];
    const startDate = new Date(
      2022,
      moment(e.date).month(),
      parseInt(moment(e.date).format("DD")),
      parseInt(e.startDate.split(":")[0]),
      parseInt(e.startDate.split(":")[1])
    );
    const endDate = new Date(
      2022,
      moment(e.date).month(),
      parseInt(moment(e.date).format("DD")),
      parseInt(e.endDate.split(":")[0]),
      parseInt(e.endDate.split(":")[1])
    );
    console.log(startDate, endDate);
    temp.push({ start: startDate, end: endDate });
    setSchedule(temp);
  }

  return (
    <div>
      <h1>Whats your name?</h1>
      <select onChange={(e) => setPerson(e.target.value)}>
        {data.people.map((person) => (
          <option value={person}>{person}</option>
        ))}
      </select>
      {getThisWeekDates().map((date) => (
        <Day addSchedule={addSchedule} day={date} />
      ))}
    </div>
  );
}

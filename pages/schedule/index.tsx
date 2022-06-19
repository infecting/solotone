import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

export default function index() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [person, setPerson] = useState("Alex");
  const events = [
    {
      title: "Alex",
      start: new Date("2022-06-20T13:00:00-05:00"),
      end: new Date("2022-06-20T14:30:00-05:00"),
    },
  ];

  function addEvent(e: any) {
    e.preventDefault();
    console.log("hi");
    events.push({
      title: "Alex",
      start: new Date("2022-06-20T18:00:00-05:00"),
      end: new Date("2022-06-20T18:30:00-05:00"),
    });
  }
  return (
    <div>
      <form onSubmit={(e) => addEvent(e)}>
        <DatePicker
          selected={new Date()}
          onChange={(date) => setDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
        <select name="" id="">
          <option value="">Alex</option>
          <option value="">Alec</option>
          <option value="">Caleb</option>
          <option value="">Lex</option>
          <option value="">Sidney</option>
          <option value="">Shobini</option>
          <option value="">Erika</option>
          <option value="">Libby</option>
          <option value="">Catherine</option>
          <option value="">Ethan</option>
          <option value="">Will</option>
          <option value="">Lila</option>
          <option value="">Arsh</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        events={events}
      />
    </div>
  );
}

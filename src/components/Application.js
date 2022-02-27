import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "../components/styles/Application.scss";

const GET_DAYS = `/api/days`
const GET_APPOINTMENTS = `/api/appointments`
const GET_INTERVIEWERS = `/api/interviewers`

const Application = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const setDays = days => setState(prev => ({ ...prev, days }));
  const setDay = day => setState(prev => ({ ...prev, day }));


  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then((all) => {
      // const [days, second, third] = all;
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
      // console.log('days: ', days.data, 'appointments: ', second.data, 'interviewers: ', third.data);
    })
      .catch((error) => {
        console.log(error.message)
      });
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // const InterviewersForDay = getInterviewersForDay(state, state.day);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            interview={getInterview(state, appointment.interview)}
            interviewers={getInterviewersForDay(state, state.day)}
          />
        ))
        }
        {}
      </section>
    </main>
  );
}

export default Application
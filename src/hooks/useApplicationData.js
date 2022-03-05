import axios from 'axios';
import { useState, useEffect } from 'react';

const GET_DAYS = `/api/days`;
const GET_APPOINTMENTS = `/api/appointments`;
const GET_INTERVIEWERS = `/api/interviewers`;

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // remaining spots to add appointments
  const remainingSpots = (appointments, days) => {
    let appointmentsId = [];
    let count = 0;
    //loop over days
    const spots = days.map((day) => {
      //if day name is equal to the state day
      if (day.name === state.day) {
        //push appointments into the appointmentsId array
        appointmentsId = day.appointments;
        for (let key in appointments) {
          const remainingAppointment = appointments[key];
          // if appointments Id included the key of appointments and it is equal to null increase the count of remaining spots
          if (appointmentsId.includes(remainingAppointment.id)) {
            if (remainingAppointment.interview === null) {
              count++;
            }
          }
        }
        day.spots = count;
      }
      return day;
    });

    return spots;
  };

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // side effect, changes happen once [] when the component gets mounted
  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // book interview using the spread operator including existing previous interviews that are stored in the state
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const availableSpots = remainingSpots(appointments, state.days);
    // using axios to add new id and new appointment to the server
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      console.log(res.data);
      setState({
        ...state,
        appointments,
        // adding remaining spots function to state
        days: availableSpots,
      });
    });
  };

  const deleteInterview = (id) => {
    //get all existing appointments
    const appointments = {
      ...state.appointments,
    };
    // change the interview state to null
    appointments[id].interview = null;
    const availableSpots = remainingSpots(appointments, state.days);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: availableSpots,
      });
    });
  };
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
};

export default useApplicationData;

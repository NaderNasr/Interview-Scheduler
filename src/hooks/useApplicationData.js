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

  const remainingSpots = (appointments, days) => {
    let appointmentsId = [];
    let count = 0;
    const spots = days.map((day) => {
      if (day.name === state.day) {
        appointmentsId = day.appointments;
        console.log('appointmentsId: ', day.appointments);

        for (let key in appointments) {
          const remainingAppointment = appointments[key];

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
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      console.log(res.data);
      setState({
        ...state,
        appointments,
        days: availableSpots,
      });
    });
  };

  const deleteInterview = (id) => {
    console.log(id);
    const appointments = {
      ...state.appointments,
    };
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

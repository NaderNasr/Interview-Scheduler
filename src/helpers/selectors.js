// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };


export function getAppointmentsForDay(state, days) {
  const appointmentId = [];
  for (const day of state.days) {
    if (day.name === days) {
      appointmentId.push(...day.appointments);
    }
  }
  const scheduledAppointment = [];
  for (const id of appointmentId) {

    scheduledAppointment.push(state.appointments[id]);
  }

  return scheduledAppointment;
}

export function getInterview (state, interview) {
  const interviewersID = Object.values(state.interviewers)
  if(interview === null){
    return null;
  }
  for(const id of interviewersID){
    
    if(id.id === interview['interviewer']){      
      const student = interview.student
      const interviewer = id
      return {student, interviewer}
    }
    
  }
  return null;
}

export function getInterviewersForDay(state, days) {
  //... returns an array of appointments for that day

  const interviewerId = [];
  for (const day of state.days) {
    if (day.name === days) {
      interviewerId.push(...day.interviewers);
    }
  }
  const scheduledInterview = [];
  for (const id of interviewerId) {

    scheduledInterview.push(state.interviewers[id]);
  }

  return scheduledInterview;
}
// console.log(getInterview(state, state.appointments["1"].interview))


//get all appointments for the selected day
export function getAppointmentsForDay(state, days) {
  const appointmentId = [];
  for (const day of state.days) {
    if (day.name === days) {
      // push all appointments in the day to appointment ID array
      appointmentId.push(...day.appointments);
    }
  }
  const scheduledAppointment = [];
  for (const id of appointmentId) {
    // push all keys of appointment in state to a new array scheduledAppointment
    scheduledAppointment.push(state.appointments[id]);
  }

  return scheduledAppointment;
}

// get selected day interview
export function getInterview (state, interview) {
  //if there is no interview set
  if(interview === null){
    return null;
  }
  // store all object value of state.interviewers in interviewersID
  const interviewersID = Object.values(state.interviewers)
  for(const id of interviewersID){
    //if id of interviewersID is equal to the interviewers
    if(id.id === interview['interviewer']){
      const student = interview.student
      const interviewer = id
      // return object
      return {
        student,
        interviewer
      }
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


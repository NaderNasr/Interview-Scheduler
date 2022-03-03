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
  if(interview === null){
    return null;
  }
  const interviewersID = Object.values(state.interviewers)
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


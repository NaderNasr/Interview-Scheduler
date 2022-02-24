import React from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import './styles.scss';

const Appointment = ({ time, interview }) => {

  const isAppointmentAvailable = (time) => {
    if (!time) {
      return 'No Appointment'
    } else {
      return `${time}`
    }
  }

  return (
    <>
      <article className="appointment">
      <Header time={isAppointmentAvailable(time)} />
      {interview ? <Show student={interview.student} interviewer={interview.interviewer.name} /> : <Empty />}
      </article>
      
    </>
  )
}

export default Appointment
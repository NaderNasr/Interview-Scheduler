import React from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";

import './styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



const Appointment = ({ time, interview, interviewers }) => {

  const {
    mode,
    transition,
    back
  } = useVisualMode(
    interview ? SHOW : EMPTY
  );

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
        {/* {interview ? <Show student={interview.student} interviewer={interview.interviewer.name} /> : <Empty />} */}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer.name}
          />
        )}
        {mode === CREATE && (
        <Form
          interviewerList={interviewers}
          onCancel = {back}
        />)}


      </article>

    </>
  )
}

export default Appointment
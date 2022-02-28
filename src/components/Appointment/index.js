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



const Appointment = ({ id, time, interview, interviewers, bookInterview }) => {

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

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
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
            bookInterview={bookInterview}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewerList={interviewers}
            onCancel={back}
            bookInterview={bookInterview}
            onSave={save}
          />)}


      </article>

    </>
  )
}

export default Appointment
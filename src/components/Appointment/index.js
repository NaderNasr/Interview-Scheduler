import React from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import useVisualMode from "hooks/useVisualMode";

import './styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";



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
    console.log('name: ', interviewer)

    // if(!interviewer) return null;

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)// this is a promise
    // it needs to finish retrieving the data FIRST -THEN transition to SHOW
      .then(() => {
        transition(SHOW)
      })
  }

  console.log('interview: ', interview)


  return (
    <>
      <article className="appointment">
        <Header time={isAppointmentAvailable(time)} />
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
        {mode === SAVING && (
          <Status />
        )}


      </article>

    </>
  )
}

export default Appointment
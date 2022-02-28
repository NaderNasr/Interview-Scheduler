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
const DELETE = "DELETE";



const Appointment = ({ id, time, interview, interviewers, bookInterview, deleteInterview }) => {

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
    console.log('interviewOBJ: ->', interview)
    transition(SAVING)
    bookInterview(id, interview)// this is a promise
      // it needs to finish retrieving the data FIRST -THEN transition to SHOW
      .then(() => {
        transition(SHOW)
      })
  }

  const deleteItem = () => {
    transition(DELETE);
    deleteInterview(id)
      .then(() => {
        transition(EMPTY);
      })
  }

  // console.log('interview: ', interview)


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
            onDelete={deleteItem}
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
          <Status message={'Saving'} />
        )}

        {mode === DELETE && (
          <Status message={'Deleting'} />
        )}


      </article>

    </>
  )
}

export default Appointment
import React from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from "hooks/useVisualMode";
import './styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";



const Appointment = ({ id, time, interview, interviewers, bookInterview, deleteInterview }) => {

  const { mode, transition, back } = useVisualMode(
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
        transition(CONFIRM);
      })
      .then(() => {
        transition(EMPTY);
      })
  }


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
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {/* edit show */}
        {mode === EDIT && (
          <Form
            name={interview.student} 
            interviewerSelected={interview.interviewer.id}
            interviewerList={interviewers}
            onCancel={back}
            bookInterview={bookInterview}
            onSave={save}
          />)}

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
        {mode === CONFIRM && (
          <Confirm message={"Are you sure?"} onConfirm={deleteItem} onCancel={back} />
        )}


      </article>

    </>
  )
}

export default Appointment
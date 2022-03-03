import React from 'react';
import Show from './Show';
import Form from './Form';
import Empty from './Empty';
import Error from './Error';
import Status from './Status';
import Header from './Header';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  deleteInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const isAppointmentAvailable = (time) => {
    if (!time) {
      return 'No Appointment';
    } else {
      return `${time}`;
    }
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    console.log('interviewOBJ: ->', interview);
    transition(SAVING);
    bookInterview(id, interview) // this is a promise
      // it needs to finish retrieving the data FIRST -THEN transition to SHOW
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const deleteItem = () => {
    transition(DELETE, true);
    deleteInterview(id)
      .then(() => {
        transition(CONFIRM);
      })
      .then(() => {
        transition(EMPTY);
      })
      .catch((e) => {
        console.log(e.message);
        transition(ERROR_DELETE, true);
      });
  };

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
            selectedInterviewerId={interview.interviewer.id}
            interviewerList={interviewers}
            onCancel={back}
            bookInterview={bookInterview}
            onSave={save}
          />
        )}

        {mode === CREATE && (
          <Form
            interviewerList={interviewers}
            onCancel={back}
            bookInterview={bookInterview}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message={'Saving'} />}

        {mode === DELETE && <Status message={'Deleting'} />}
        {mode === CONFIRM && (
          <Confirm
            message={'Are you sure?'}
            onConfirm={deleteItem}
            onCancel={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error message={"Couldn't Delete, Please try again"} onClose={back} />
        )}
        {mode === ERROR_SAVE && (
          <Error message={"Couldn't Save, Please try again"} onClose={back} />
        )}
      </article>
    </>
  );
};

export default Appointment;

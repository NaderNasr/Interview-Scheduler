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
    //transition to saving component
    transition(SAVING);
    bookInterview(id, interview)
    //this is a promise it needs to finish retrieving the data FIRST -THEN transition to SHOW
      .then(() => {
    //transition to show component
        transition(SHOW);
      })
      .catch(() => {
    //transition to error component if error was caught by the promise
    //set replace (useVisualMode custom hook) to true
        transition(ERROR_SAVE, true);
      });
  };

  const deleteItem = () => {
    //transition to delete component, with true boolean for to activate the replace custom hook so that the user clicks the exit button out once rather than twice,
    //set replace (useVisualMode custom hook) to true
    transition(DELETE, true);
    //While user clicks delete, the Confirm component transitions to a confirm
    deleteInterview(id)
      .then(() => {
        transition(CONFIRM);
      })
      //transitions to a new empty component
      .then(() => {
        transition(EMPTY);
      })
      .catch((e) => {
        console.log(e.message);
    //set replace (useVisualMode custom hook) to true
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
        {/* The edit mode edits the Form component */}
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
          {/* The Create mode creates a new Form */}
        {mode === CREATE && (
          <Form
            interviewerList={interviewers}
            onCancel={back}
            bookInterview={bookInterview}
            onSave={save}
          />
        )}
        {/* Show the user a saving animation */}
        {mode === SAVING && <Status message={'Saving'} />}

        {/* Show the user a Delete animation */}
        {mode === DELETE && <Status message={'Deleting'} />}

        {/* Show the user reassurance message if they want to delete */}
        {mode === CONFIRM && (
          <Confirm
            message={'Are you sure?'}
            onConfirm={deleteItem}
            onCancel={back}
          />
        )}

        {/* Show the user a server error on DELETE */}
        {mode === ERROR_DELETE && (
          <Error message={"Couldn't Delete, Please try again"} onClose={back} />
        )}

        {/* Show the user a server error on SAVE*/}
        {mode === ERROR_SAVE && (
          <Error message={"Couldn't Save, Please try again"} onClose={back} />
        )}
      </article>
    </>
  );
};

export default Appointment;

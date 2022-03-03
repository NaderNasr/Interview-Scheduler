import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import React, { useState } from 'react';

const Form = ({
  interviewerList,
  onCancel,
  onSave,
  name,
  selectedInterviewerId
}) => {

  const [studentName, setStudentName] = useState(name || '');
  const [interviewerID, setInterviewerID] = useState(selectedInterviewerId || null);
  const [noNameError, setNoNameError] = useState('');
  const [noInterviewerError, setNoInterviewerError] = useState('');

  const reset = () => {
    setStudentName('');
    setInterviewerID(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const validate = () => {
    if (!studentName && interviewerID) {
      console.log(1);
      setNoInterviewerError('');
      return setNoNameError('Student name cannot be blank');
    }

    if (!interviewerID && studentName) {
      setNoNameError('');
      return setNoInterviewerError('Please pick an interviewer');
    }

    if (!interviewerID && !studentName) {
      setNoNameError('Student name cannot be blank');
      return setNoInterviewerError('Please pick an interviewer');
    }

    setNoInterviewerError('');
    setNoNameError('');
    onSave(studentName, interviewerID);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudentName(event.target.value)}
            value={studentName}
            data-testid="student-name-input"
          />

          <section className="appointment__validation">{noNameError}</section>
        </form>
        <InterviewerList
          value={interviewerID}
          onChange={(id) => setInterviewerID(id)}
          interviewers={interviewerList}
        />
        <section className="appointment__validation">
          {noInterviewerError}
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;

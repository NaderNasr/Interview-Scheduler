import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import React, { useState } from 'react';

const Form = ({ interviewerList, onCancel, onSave, name, interviewerSelected }) => {

  const [studentName, setStudentName] = useState(name || "");
  const [interviewerID, setInterviewerID] = useState(interviewerSelected || null);
  const [noNameError, setNoNameError] = useState("");
  const [noInterviewerError, setNoInterviewerError] = useState("");


  const reset = () => {
    setStudentName('');
    setInterviewerID(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const validate = () => {
    if (studentName === '') {
      return setNoNameError("Student name cannot be blank");
    }
    // const len = InterviewerList
    // console.log(InterviewerList.length)
    // console.log(interviewerID.length)

    if (interviewerID.length) {
      return setNoInterviewerError("Please pick an interviewer");
    }

    setNoNameError('');
    onSave(studentName, interviewerID);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <section className="appointment__validation">{noInterviewerError}</section>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            onChange={(event) => setStudentName(event.target.value)}
            value={studentName}
          />
          <section className="appointment__validation">{noNameError}</section>
        </form>
        <InterviewerList
          value={interviewerID}
          onChange={(id) => setInterviewerID(id)}
          interviewers={interviewerList}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>

      </section>
    </main>
  )
}

export default Form;
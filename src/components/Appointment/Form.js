import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import React, { useState } from 'react';

const Form = ({ student, interviewerList, onCancel, onSave }) => {

  const [studentName, setStudentName] = useState(student || "");
  const [interviewerID, setInterviewerID] = useState(interviewerList || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudentName('');
    setInterviewerID(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const validate = () => {
    if (student === "") {
      return setError("Student name cannot be blank");
      
    }
  
    setError("");
    onSave(student, interviewerID);
  }


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
          /*
            This must be a controlled component
            your code goes here
          */
          />
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
import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = ({ onChange, interviewers, value }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === value}
            setInterviewer={() => onChange(interviewer.id)}
          />
        ))}
      </ul>
    </section>

  )
}

export default InterviewerList
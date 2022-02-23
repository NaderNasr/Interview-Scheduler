import React from 'react';
import './styles.scss';

const Appointment = ({time}) => {

  const isTime = (time) => {
    if (!time){
      return 'No Appointment'
    } else {
      return `Appointment at ${time}`
    }
  }
  
  return (
    <article className="appointment">
      {isTime(time)}
    </article>
  )
}

export default Appointment
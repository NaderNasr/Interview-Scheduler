import React from 'react'
import DayListItem from 'components/DayListItem'


const DayList = ({day, days, setDay}) => {
  return (
    <ul>
    {days.map((dayIndex) => ( 
      <DayListItem 
        key={dayIndex.id}
        name={dayIndex.name} 
        spots={dayIndex.spots} 
        selected={dayIndex.name === day}
        setDay={setDay}  
      />
    ))}
    </ul>
  )
}

export default DayList
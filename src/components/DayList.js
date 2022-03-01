import React from 'react'
import DayListItem from 'components/DayListItem'


const DayList = ({days, value, onChange}) => {
  return (
    <ul>
    {days.map((dayIndex) => (
      <DayListItem
        key={dayIndex.id}
        name={dayIndex.name}
        spots={dayIndex.spots}
        selected={dayIndex.name === value}
        setDay={onChange}
      />
    ))}
    </ul>
  )
}

export default DayList
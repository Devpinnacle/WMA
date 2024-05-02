import React from 'react'
import DatePicker from 'react-datepicker';
import Icon from "./Icon";
import 'react-datepicker/dist/react-datepicker.css';
import './DayDateInput.css'

const DayDateInput = ({ selected, onChange, placeholder }) => {
  return (
    <>
      <div className='day-date-picker'>
        <DatePicker
          selected={selected} placeholderText={placeholder}
          onChange={onChange}
          dateFormat="eeee dd/MM/yyyy"
        />
        <Icon name="calender-outline"
          size="24px"
        />
      </div>

    </>
  )
}
export default DayDateInput
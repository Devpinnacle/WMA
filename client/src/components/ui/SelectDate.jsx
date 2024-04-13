import React from 'react'
// import DatePicker from 'react-datepicker';
import Icon from "./Icon";
// import 'react-datepicker/dist/react-datepicker.css';
const SelectDate = ({selected,onChange,placeholder}) => {

  return (
    <div class="datePicker">
         <DatePicker 
            selected={selected} placeholderText={placeholder}
         onChange={onChange}
         
         customInput={
            <div className="">
              <input
                type="text"
                value={selected}
                readOnly
                className="date-input"
              />
               <Icon
              name="calender-outline"
              size="2rem"
            />
            </div>
          }
         />
    </div>
  )
}

export default SelectDate
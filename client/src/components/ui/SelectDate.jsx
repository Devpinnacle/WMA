import React from 'react'
import DatePicker from 'react-datepicker';
import Icon from "./Icon";
import 'react-datepicker/dist/react-datepicker.css';
import "./SelectDate.css"
const SelectDate = ({ selected, onChange, placeholder ,min,max}) => {


    return (
        <>
            <DatePicker
                selected={selected} placeholderText={placeholder}
                onChange={onChange}
                dateFormat="dd-MM-yyyy"
                minDate={min}
                maxDate={max}
            />
            <div className="date-picker">
                <Icon name="date-picker-outline"
                    size="2rem"
                />
            </div>
        </>
    )
}

export default SelectDate
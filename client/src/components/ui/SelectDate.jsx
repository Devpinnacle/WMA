import React from 'react'
import DatePicker from 'react-datepicker';
import Icon from "./Icon";
import 'react-datepicker/dist/react-datepicker.css';
import "./SelectDate.css"
const SelectDate = ({ selected, onChange, placeholder }) => {
    
    const formatedDate=(data)=>{
        try{
            return data.toISOString().split("T")[0].split("-").reverse().join("-");
        }catch(er){

            return "";
        }
    }
   
    return (
            <DatePicker
                selected={selected} placeholderText={placeholder}
                onChange={onChange}

                customInput={
                    <div className="date-picker">
                        <input
                            type="text"
                            value={formatedDate(selected)}
                            
                            className="date-input"

                            placeholder={placeholder}
                        />
                        <Icon
                            name="date-picker-outline"
                            size="2rem"
                        />
                    </div>
                }
            />
    )
}

export default SelectDate
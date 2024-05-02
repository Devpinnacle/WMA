import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { monthsValue, padZero } from "../../util";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./MonthYearPicker.css";

export default function MonthYearPicker({ defaultDate, setMonthYear }) {
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    // console.log("year",year);
    const [showModal, setShowModal] = useState(false);
    const wrappedRef = useRef(null);
    useOutsideClick(wrappedRef, () => setShowModal(false));
  
    useEffect(() => {
      if (defaultDate) {
        setMonth(new Date(defaultDate).getMonth());
        setYear(new Date(defaultDate).getFullYear());
      }
    }, [defaultDate]);
  
    useEffect(() => {
      if (month + 1 > 0 && year && setMonthYear) {
        setMonthYear(`${year}-${padZero(month + 1)}-01`);
      }
    }, [month, year, setMonthYear]);
  
    return (
      <div className="month-year-container" ref={wrappedRef}>
        <div
          className="month-year-text flex-between"
          onClick={() => setShowModal((ps) => !ps)}
        >
          <span style={{color:"black"}}>
            {monthsValue[month]}, {year}
          </span>
          <Icon title="Show Picker" name="calender-outline" size="24px" noCursor />
        </div>
  
        {showModal && (
          <div className="month-year-modal">
            <div className="year-changer flex-between">
              <Icon
                name="chevron-back-outline"
                onClick={() => setYear((ps) => ps - 1)}
                size="2rem"
              />
              <div style={{color:"black"}}>{year}</div>
              <Icon
                name="chevron-forward-outline"
                onClick={() => setYear((ps) => ps + 1)}
                size="2rem"
              />
            </div>
  
            <div className="month-changer picker-modal-grid">
              {monthsValue.map((el, idx) => (
                <button key={idx} onClick={() => setMonth(idx)}>
                  <div
                    className={`picker-modal-value ${
                      (month === idx && "month-changer-current") || undefined
                    }`}
                    style={{color:"black"}}
                  >
                    {el.slice(0, 3)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
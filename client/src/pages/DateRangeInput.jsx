import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { DateRangePicker } from "react-date-range";
import {getTimeData } from "../util";
import Icon from "../components/ui/Icon";
import useOutsideClick from "../hooks/useOutsideClick";
import {setDateRange} from "../redux/slice/calenderSlice";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./DateRangeInput.css";

export default function DateRangeInput() {
    const { dateStr, dateRange } = useSelector(
        (state) => state.calender
    );
    const wrappedRef = useRef(null);
    const [showDateRange, setShowDateRange] = useState(false);
    const [range, setRange] = useState(null);
    const [dateData, setDateData] = useState({
        startDate: "dd/mm/yyyy",
        endDate: "dd/mm/yyyy",
    });
    const dispatch = useDispatch();
    useOutsideClick(wrappedRef, () => setShowDateRange(false));
    useEffect(() => {
        if (dateRange) {
            setRange([
                {
                    startDate: new Date(dateRange.startDate),
                    endDate: new Date(dateRange.endDate),
                    key: "selection",
                },
            ]);
            setDateData({
                startDate: getTimeData(dateRange.startDate, true),
                endDate: getTimeData(dateRange.endDate, true),
            });
        }
        else if (dateStr) {
            setRange([
                {
                    startDate: new Date(dateStr),
                    endDate: new Date(dateStr),
                    key: "selection",
                },
            ]);
            setDateData({
                startDate: "dd/mm/yyyy",
                endDate: "dd/mm/yyyy",
            });
        }
    }, [
        dateStr,
        dateRange,
    ]);

    const dateRangeHandler = (item) => {
        setRange([item.selection]);
        dispatch(
            setDateRange({
                startDate: item.selection.startDate.toUTCString(),
                endDate: item.selection.endDate.toUTCString(),
            })
        );
    };

    return (
        <div className="date-range" ref={wrappedRef}>
            <div className="row-gap-0_5">
                <div
                    className={`date-range-view flex-between `}
                    onClick={() => setShowDateRange((ps) => !ps)}
                    style={{ cursor: "pointer" }}
                >
                    <div style={{color:"black"}}>
                        {dateData.startDate} : {dateData.endDate}
                    </div>

                    <Icon title="Show Picker" name="calender-outline" size="24px" noCursor />
                </div>
            </div>
            {showDateRange && (
                <div className="date-range-picker">
                    <DateRangePicker
                        onChange={(item) => dateRangeHandler(item)}
                        showSelectionPreview={false}
                        moveRangeOnFirstSelection={false}
                        showDateDisplay={false}
                        months={1}
                        ranges={range}
                        direction="horizontal"
                    />
                </div>
            )}
        </div>
    );
}

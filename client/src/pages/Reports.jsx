import React, { useState } from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import Icon from '../components/ui/Icon'
import { getStatusColors } from '../util'
import SelectInput from '../components/ui/SelectInput'
import "./Reports.css"
import { NavLink } from 'react-router-dom'
import ReportTopComponent from './ReportTopComponent'
import PieChart from '../components/ui/PieChart'
import SelectDate from '../components/ui/SelectDate'

const Reports = () => {
    const [months, setMonth] = useState([]);
    const month = [
        { value: "January", label: "Janauary" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" },
    ];

    return (
        <MainContainer pageName="Project-wise Report">
            <ReportTopComponent />
            <div className='chart-grid'>
                <div className='chart' style={{ color: "black" }}>
                    <span className='chart-title'>All task Status</span>
                    <PieChart></PieChart>
                </div>
                <div className='chart' style={{ color: "black" }}>
                    <span className='chart-title'>Task Status-Month</span>
                    <div className='select-box month-selector'>
                        <SelectInput
                            placeholder="Month"
                            isSearchable={false}
                            options={month}
                            noBorder={true}
                        />
                    </div>
                    <PieChart></PieChart>
                </div>

                <div className='chart' style={{ color: "black" }}>
                    <span className='chart-title'>Task Status-Month</span>
                    <div className='date-box' style={{marginLeft:"6.5rem"}}>
                        <SelectDate
                            placeholder="Day dd/mm/yyyy"
                            // format={dayDate}
                        />
                    </div>
                    <PieChart></PieChart>
                </div>
            </div>
        </MainContainer>
    )
}

export default Reports
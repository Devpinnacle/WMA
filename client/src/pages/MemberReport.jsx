import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import ReportTopComponent from './ReportTopComponent'
import Icon from '../components/ui/Icon'
import SelectInput from '../components/ui/SelectInput'
import SelectDate from '../components/ui/SelectDate'
import "./MemberReport.css"

const MemberReport = () => {
    return (
        <MainContainer pageName="Member-wise Report">
            <ReportTopComponent />
            <div className='member-wise-report'>
                <div className='header-left back-icon'>
                    <Icon
                        name="arrow-outline"
                        sixe="18px"
                    />
                </div>
                <span style={{ color: "black", fontWeight: "500", fontSize: "22px", marginLeft: "5px" }}>Rakshith</span>
                <div className='project-wise-header-right'>
                    <Icon
                        name="chart-icon"
                        size="3rem"
                        title="Go to chart"
                    />
                    <div className="date-box mt-0">
                        <SelectDate
                            placeholder="dd:mm:yyyy-dd:mm:yyyy"
                        />
                    </div>
                    <div className="ml-2 mr-4">
                        <SelectInput
                            placeholder="Project"
                            isSearchable={false}
                        />
                    </div>
                    <button className="btn-outline m-0">
                        <Icon name="excel-outline" size="2rem" />
                        Download Excel
                    </button>
                </div>
            </div>
            <div className='report-table'>
                <table className='table table-border member-table'>
                    <thead >
                        <tr>
                            <th scope="col">Project</th>
                            <th scope="col">Section</th>
                            <th scope="col">Task</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                            <th scope="col">Stage</th>
                            <th scope="col">Duration(hrs)</th>
                            <th scope="col">Progress</th>
                            <th scope="col">Completion date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Book better</td>
                            <td>Backend</td>
                            <td>Shreya</td>
                            <td>12-2-2024</td>
                            <td>12-5-2024</td>
                            <td>Normal</td>
                            <td>In progress</td>
                            <td>Development</td>
                            <td>12</td>
                            <td>60%</td>
                            <td>12-2-2024</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </MainContainer>
    )
}

export default MemberReport
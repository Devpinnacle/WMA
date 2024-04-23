import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import ReportTopComponent from './ReportTopComponent'
import Icon from '../components/ui/Icon'
import SelectDate from '../components/ui/SelectDate'
import "./DailyReport.css"

const DailyReport = () => {
    return (
        <MainContainer pageName="Daily Report">
            <ReportTopComponent />
            <div className="daily-report-top">
                <span style={{ color: '#3D405B', marginLeft: "2rem", fontSize: "22px", fontWeight: "500" }}>Wednesday 11-04-2024</span>
                <div className="daily-header-right">
                    <Icon
                        name="chart-icon"
                        size="3rem"
                        title="Go to chart"
                    />
                    <div className="date-box m-0 ml-3">
                        <SelectDate
                            placeholder="Day dd/mm/yyyy"
                        />
                    </div>
                    <button className="btn-outline mt-0">
                        <Icon name="excel-outline" size="2rem" />
                        Download Excel
                    </button>
                </div>
            </div>
            <div className='report-table daily-report-table'>
                <table className='table table-border'>
                    <thead>
                        <tr>
                            <th scope="col">Employee</th>
                            <th scope="col">Project</th>
                            <th scope="col">Section</th>
                            <th scope="col">SD Date</th>
                            <th scope="col">Task</th>
                            <th scope="col">TA Date</th>
                            <th scope="col">TD Date</th>
                            <th scope="col">Stage</th>
                            <th scope="col">Duration(hrs)</th>
                            <th scope="col">Status</th>
                            <th scope="col">Progress</th>
                            <th scope="col">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Rakshith</td>
                            <td>SHG</td>
                            <td>Login</td>
                            <td>12/2/2024</td>
                            <td>frontend</td>
                            <td>12/5/2024</td>
                            <td>12/5/2024</td>
                            <td>Development</td>
                            <td>2</td>
                            <td>In progress</td>
                            <td>50%</td>
                            <td>
                                <Icon
                                    name="report-note-outline"
                                    size="24px" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MainContainer>
    )
}

export default DailyReport
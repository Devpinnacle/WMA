import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import ReportTopComponent from './ReportTopComponent'
import Icon from '../components/ui/Icon'

const DailyReport = () => {
  return (
    <MainContainer>
        <ReportTopComponent/>
                    <div className="daily-report-top">
                    <span style={{ color: '#3D405B', marginLeft: "2rem", fontSize: "22px", fontWeight: "500" }}>Wednesday 11-04-2024</span>
                    <div className="daily-header-right">
                        <Icon
                            name="chart-icon"
                            size="3rem"
                            title="Go to chart"
                        />
                        <input style={{ color: 'black' }}
                            className='ml-3'
                            type='date'
                        />
                        <button className="btn-outline mt-0">
                            <Icon name="excel-outline" size="2rem" />
                            Download Excel
                        </button>
                    </div>
                </div>
    </MainContainer>
  )
}

export default DailyReport
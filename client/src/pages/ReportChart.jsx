import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import ReportTopComponent from './ReportTopComponent'

export const ReportChart = () => {
  return (
                <MainContainer>
                <ReportTopComponent/>
                <div className='chart-grid'>
                <div className='chart' style={{ color: "black" }}>
                    All task Status
                </div>
                <div className='chart' style={{ color: "black" }}>
                    Task Status-Month
                    <SelectInput
                        placeholder="Month"
                        isSearchable={false}
                        options={month}
                    />
                </div>
                <div className='chart' style={{ color: "black" }}>
                    Task Status-Month
                </div>
            </div> 
            </MainContainer>
  )
}

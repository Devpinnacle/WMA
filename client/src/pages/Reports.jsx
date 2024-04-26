import React, { useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import { getStatusColors } from "../util";
import SelectInput from "../components/ui/SelectInput";
import "./Reports.css";
import { NavLink } from "react-router-dom";
import ReportTopComponent from "./ReportTopComponent";
import PieChart from "../components/ui/PieChart";
import DateRangeInput from "../components/ui/DateRangeInput"
import DayDateInput from "../components/ui/DayDateInput";

const Reports = () => {
  return (
    <MainContainer pageName="Reports">
      <div className="chart-grid">
        <div className="chart" style={{ color: "black" }}>
          <span className="chart-title">All task Status</span>
          <DateRangeInput/>
          <PieChart></PieChart>
        </div>
        <div className="chart" style={{ color: "black" }}>
          <span className="chart-title">Task Status-Month</span>
         
          {/* <div className="select-box month-selector"> */}
            <SelectInput
              placeholder="Month"
              isSearchable={false}
            //   options={month}
              // noBorder={true}
            />
          {/* </div> */}
          <PieChart></PieChart>
        </div>

        <div className="chart" style={{ color: "black" }}>
          <span className="chart-title">Task Status-Month</span>
            <DayDateInput
              placeholder="Day dd/mm/yyyy"
            />
  
          <PieChart></PieChart>
        </div>
      </div>
    </MainContainer>
  );
};

export default Reports;

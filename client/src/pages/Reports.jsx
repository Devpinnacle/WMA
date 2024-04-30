import React, { useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import { getStatusColors } from "../util";
import SelectInput from "../components/ui/SelectInput";
import "./Reports.css";
import { NavLink } from "react-router-dom";
import ReportTopComponent from "./ReportTopComponent";
import PieChart from "../components/ui/PieChart";
import DateRangeInput from "../components/ui/DateRangeInput";
import DayDateInput from "../components/ui/DayDateInput";
import { useGetChartQuery } from "../redux/api/reportApi";
import { useSelector } from "react-redux";

const Reports = () => {
  const { chart } = useSelector((state) => state.report);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useGetChartQuery();

  const handleSetDate = (e) => {
    setStartDate(e.startDate);
    setEndDate(e.endDate);
  };

  const betweenDateFilter = chart.filter((task) => {
    return (
      !startDate ||
      !endDate ||
      (new Date(task.assignedDate) >= new Date(startDate) &&
        new Date(task.dueDate) <= new Date(endDate))
    );
  });

  const statusCounts = {Completed:0,"To Do":0,"In Progress":0,Others:0};
  betweenDateFilter.forEach((task) => {
    const status = task.status;
    // Check if status is one of the predefined values
    if (
      status === "Completed" ||
      status === "To Do" ||
      status === "In Progress"
    ) {
      // Increment count for the status group
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    } else {
      // Increment count for 'Others' group
      statusCounts["Others"] = (statusCounts["Others"] || 0) + 1;
    }
  });

  console.log(statusCounts);

  return (
    <MainContainer pageName="Reports">
      <div className="chart-grid">
        <div className="chart" style={{ color: "black" }}>
          <span className="chart-title">All task Status</span>
          <DateRangeInput onChange={handleSetDate} />
          <PieChart
            series={[statusCounts["Completed"], statusCounts["To Do"], statusCounts["In Progress"], statusCounts["Others"]]}
            labels={["Completed", "To Do", "In Progress", "Others"]}
            colors={["#008000", "#0000FF", "#FF0000", "#000000"]}
          />
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
          <DayDateInput placeholder="Day dd/mm/yyyy" />

          <PieChart></PieChart>
        </div>
      </div>
    </MainContainer>
  );
};

export default Reports;

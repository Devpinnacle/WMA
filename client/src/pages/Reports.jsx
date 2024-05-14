import React, { useEffect, useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import {
  getLastDateOfMonth,
  getStatusColors,
  monthsValue,
  padZero,
} from "../util";
import SelectInput from "../components/ui/SelectInput";
import "./Reports.css";
import PieChart from "../components/ui/PieChart";
import DateRangeInput from "../components/ui/DateRangeInput";
import DayDateInput from "../components/ui/DayDateInput";
import { useGetChartQuery } from "../redux/api/reportApi";
import { useSelector } from "react-redux";
import MonthYearPicker from "../components/ui/MonthYearPicker";

const Reports = () => {
  const { chart } = useSelector((state) => state.report);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setHours(0, 0, 0, 0)
  );
  const current = new Date(
    new Date().getFullYear() + 1,
    new Date().getMonth() - 11,
    1
  );
  const [date, setDate] = useState(
    `${current.getFullYear()}-${padZero(current.getMonth())}-01`
  );
  useGetChartQuery();

  const handleSetDate = (e) => {
    setStartDate(e.startDate);
    setEndDate(e.endDate);
  };

  const betweenDateFilter = chart.filter((task) => {
    return (
      !startDate ||
      !endDate ||
      (new Date(task.assignedDate).setHours(0, 0, 0, 0) >=
        new Date(startDate).setHours(0, 0, 0, 0) &&
        new Date(endDate).setHours(0, 0, 0, 0) >=
          new Date(task.assignedDate).setHours(0, 0, 0, 0)) ||
      (new Date(task.dueDate).setHours(0, 0, 0, 0) >=
        new Date(startDate).setHours(0, 0, 0, 0) &&
        new Date(task.dueDate).setHours(0, 0, 0, 0) <=
          new Date(endDate).setHours(0, 0, 0, 0))
    );
  });

  const statusCounts = {
    Completed: 0,
    "To Do": 0,
    "In Progress": 0,
    Others: 0,
  };

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

  const filteredChart = chart.filter((task) => {
    const taskstart = new Date(task.assignedDate);
    const taskDue = new Date(task.dueDate);
    const selectedDate = new Date(date);
    const taskMonth = taskstart.getMonth();
    const taskYear = taskstart.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const taskDueMonth = taskDue.getMonth();
    const taskDueYear = taskDue.getFullYear();

    // Check if the task's assigned date and due date are within the selected month and year
    return (
      (taskYear === selectedYear && taskMonth === selectedMonth) || // Assigned date is within the selected month and year
      (taskDueYear === selectedYear && taskDueMonth === selectedMonth) // Due date is within the selected month and year
    );
  });

  const statusCounts1 = {
    Completed: 0,
    "To Do": 0,
    "In Progress": 0,
    Others: 0,
  };
  filteredChart.forEach((task) => {
    const status = task.status;
    // Check if status is one of the predefined values
    if (
      status === "Completed" ||
      status === "To Do" ||
      status === "In Progress"
    ) {
      // Increment count for the status group
      statusCounts1[status] = (statusCounts1[status] || 0) + 1;
    } else {
      // Increment count for 'Others' group
      statusCounts1["Others"] = (statusCounts1["Others"] || 0) + 1;
    }
  });

  const dateWiseChart = chart.filter((task) => {
    const startDate = new Date(task.assignedDate).setHours(0, 0, 0, 0);
    const endDate = new Date(task.dueDate).setHours(0, 0, 0, 0);
    return startDate <= selectedDate && endDate >= selectedDate;
  });

  const statusCounts2 = {
    Completed: 0,
    "To Do": 0,
    "In Progress": 0,
    Others: 0,
  };
  dateWiseChart.forEach((task) => {
    const status = task.status;
    // Check if status is one of the predefined values
    if (
      status === "Completed" ||
      status === "To Do" ||
      status === "In Progress"
    ) {
      // Increment count for the status group
      statusCounts2[status] = (statusCounts2[status] || 0) + 1;
    } else {
      // Increment count for 'Others' group
      statusCounts2["Others"] = (statusCounts2["Others"] || 0) + 1;
    }
  });

  const handleSetSelectedDate = (date) => {
    const newDate = new Date(date).setHours(0, 0, 0, 0);
    setSelectedDate(newDate);
  };
  const formattedSelectedDate = new Date(selectedDate);
  const selectedYearMonth = formattedSelectedDate.toLocaleDateString("en-GB");
  return (
    <MainContainer pageName="Reports">
      <div className="chart-grid">
        <div className="chart" style={{ color: "black" }}>
          <span className="chart-title pt-3 pb-3">All task Status</span>
          <DateRangeInput onChange={handleSetDate} />
          <div className="pt-5">
            <PieChart
              series={[
                statusCounts["Completed"],
                statusCounts["To Do"],
                statusCounts["In Progress"],
                statusCounts["Others"],
              ]}
              labels={["Completed", "To Do", "In Progress", "Others"]}
              colors={["#3A9679", "#9376E0", "#0802A3", "#FF4B91"]}
            />
          </div>
        </div>
        <div className="chart" style={{ color: "black" }}>
          <span className="chart-title pt-3 pb-3">
            Task Status-{monthsValue[new Date(date).getMonth()]}
          </span>

          <MonthYearPicker defaultDate={date} setMonthYear={setDate} />
          <div className="pt-5">
            <PieChart
              series={[
                statusCounts1["Completed"],
                statusCounts1["To Do"],
                statusCounts1["In Progress"],
                statusCounts1["Others"],
              ]}
              labels={["Completed", "To Do", "In Progress", "Others"]}
              colors={["#3A9679", "#9376E0", "#0802A3", "#FF4B91"]}
            />
          </div>
        </div>
              
        <div className="chart" style={{ color: "black" }}>
          <span className="chart-title pt-3">
            Task Status-{selectedYearMonth}
          </span>
          <DayDateInput
            placeholder="Day dd/mm/yyyy"
            selected={selectedDate}
            onChange={handleSetSelectedDate}
          />
          <div className="pt-5">
            <PieChart
              series={[
                statusCounts2["Completed"],
                statusCounts2["To Do"],
                statusCounts2["In Progress"],
                statusCounts2["Others"],
              ]}
              labels={["Completed", "To Do", "In Progress", "Others"]}
              colors={["#3A9679", "#9376E0", "#0802A3", "#FF4B91"]}
            />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Reports;

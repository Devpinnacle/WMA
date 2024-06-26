import React, { useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import "./DailyReport.css";
import { useGetDailyReportQuery } from "../redux/api/reportApi";
import { useSelector } from "react-redux";
import {
  dashedFormatDate,
  formatDate,
} from "../Helper/helper";
import DayDateInput from "../components/ui/DayDateInput";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { convertMinutesToHoursAndMinutes } from "../util";

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  useGetDailyReportQuery();
  const { dailyReport } = useSelector((state) => state.report);
  const navigate=useNavigate()

  // Function to format data for CSV
  const getCSVdata = () => {
    const csvData = [];
    // Add header row
    csvData.push([
      "Date",
      "Employee",
      "Project",
      "Section",
      "SD Date",
      "Task",
      "TA Date",
      "TD Date",
      "Stage",
      "Duration(hrs)",
      "Status",
      "Progress",
      "Notes",
    ]);
    // Add data rows
    dailyReport.forEach((report) => {
      report.data.forEach((detail) => {
        csvData.push([
          dashedFormatDate(report._id),
          detail.name,
          detail.projectName,
          detail.sectionName,
          dashedFormatDate(detail.sectionDue),
          detail.taskName,
          dashedFormatDate(detail.assignedDate),
          dashedFormatDate(detail.dueDate),
          detail.stages,
          detail.duration,
          detail.status,
          detail.progress,
          detail.notes,
        ]);
      });
    });
    return csvData;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  let filteredReport
  if (dailyReport) {
     filteredReport = dailyReport.filter((report) => {
      return !selectedDate ||
      dashedFormatDate(report._id) === dashedFormatDate(selectedDate);
    });
    
  }
  return (
    <MainContainer>
      <div
        style={{
          color: "#3D405B",
          fontWeight: "700",
          fontSize: "50px",
          paddingLeft: "2rem",
        }}
      >
        Daily Report
      </div>
      <div className="daily-report-top">
        <span
          style={{
            color: "#3D405B",
            marginLeft: "2rem",
            fontSize: "22px",
            fontWeight: "500",
          }}
        >
       {selectedDate&&formatDate(selectedDate)}
        </span>
        <div className="daily-header-right">
          <DayDateInput
            placeholder="Day dd/mm/yyyy"
            selected={selectedDate}
            onChange={handleDateChange}
          />
          {/* CSVLink for downloading CSV */}
          <div className="btn-container">
            <div className="btn-download btn-outline mr-3">
              <Icon name="excel-outline" size="2rem" />
              <CSVLink data={getCSVdata()} filename={"daily_report.csv"}>
                Download Excel
              </CSVLink>
            </div>
            <div className="chart-icon mt-4 mr-3">
              <Icon name="chart-icon" size="3rem" title="Go to chart" onClick={()=>navigate("/reports")}/>
            </div>
          </div>
        </div>
      </div>
      <div className="report-table daily-report-table">
        <table className="table table-border">
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
            {filteredReport.map((report) => (
              <>
                <tr>
                  <td colSpan={12} style={{fontWeight:"bold"}}>{formatDate(report._id)}</td>
                </tr>

                {report.data.map((detail) => (
                  <>
                    <tr>
                      <td>{detail.name}</td>
                      <td>{detail.projectName}</td>
                      <td>{detail.sectionName}</td>
                      <td>{formatDate(detail.sectionDue)}</td>
                      <td>{detail.taskName}</td>
                      <td>{formatDate(detail.assignedDate)}</td>
                      <td>{formatDate(detail.dueDate)}</td>
                      <td>{detail.stages}</td>
                      <td>{convertMinutesToHoursAndMinutes(detail.duration)}</td>
                      <td>{detail.status}</td>
                      <td>{detail.progress}%</td>
                      <td>{detail.notes}</td>
                    </tr>
                  </>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </MainContainer>
  );
};

export default DailyReport;

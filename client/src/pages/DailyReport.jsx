import React, { useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import "./DailyReport.css";
import { useGetDailyReportQuery } from "../redux/api/reportApi";
import { useSelector } from "react-redux";
import {
  dashedFormatDate,
  formatDate,
  formatStringDate,
} from "../Helper/helper";
import DayDateInput from "../components/ui/DayDateInput";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import Note from "../components/modals/report/Note";

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  useGetDailyReportQuery();
  const { dailyReport } = useSelector((state) => state.report);

  // Function to format data for CSV
  const getCSVdata = () => {
    const csvData = [];
    // Add header row
    csvData.push([
      "Employee",
      "Project",
      "Section",
      "SD Date",
      "Task",
      "TA Date",
      "TD Date",
      "Stage",
      "Duration(min)",
      "Status",
      "Progress",
      "Notes",
    ]);
    // Add data rows
    dailyReport.forEach((report) => {
      report.data.forEach((detail) => {
        csvData.push([
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
    console.log(dashedFormatDate(date))
    setSelectedDate(date);
  };
  let filteredReport
  if (dailyReport) {
     filteredReport = dailyReport.filter((report) => {
      return !selectedDate ||
        formatStringDate(report._id) === dashedFormatDate(selectedDate);
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
          {" "}
          Wednesday{" "}
          {dailyReport.map((report) => (
            <>{report._id}</>
          ))}
        </span>
        <div className="daily-header-right">
          {/* <div className="mt-4">
            <Icon name="chart-icon" size="3rem" title="Go to chart" />
          </div> */}
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
              <Icon name="chart-icon" size="3rem" title="Go to chart" />
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
              <th scope="col">Duration(min)</th>
              <th scope="col">Status</th>
              <th scope="col">Progress</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {/* {dailyReport.map((date) => (
              <>
                <tr key={`date-${date.date}`}>
                  <td colSpan={12}>{date.date}</td>
                </tr>
                {date.data.map((name) => (
                  <>
                    {/* Render user name with rowspan */}
            {/* <tr key={`user-${name.name}`}>
                      <td rowSpan={name.nameData.length}>{name.name}</td>
                      <td>{name.nameData[0].projectName}</td>
                      <td>{name.nameData[0].projectData[0].sectionName}</td>
                    </tr> */}
            {/* Render additional projects and sections for the same user */}
            {/* {name.nameData.slice(1).map((proj) => (
                      <>
                        <tr key={`project-${proj.projectName}`}>
                          <td rowSpan={proj.projectData.length}>
                            {proj.projectName}
                          </td>
                          <td>{proj.projectData[0].sectionName}</td>
                        </tr>
                        {proj.projectData.slice(1).map((section) => (
                          <tr key={`section-${section.sectionName}`}>
                            <td>{section.sectionName}</td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </>
                ))}
              </> */}
            {/* ))} */}

            {filteredReport.map((report) => (
              <>
                <tr>
                  <td colSpan={12}>{report._id}</td>
                </tr>

                {report.data.map((detail) => (
                  <>
                    <tr>
                      <td>{detail.name}</td>
                      <td>{detail.projectName}</td>
                      <td>{detail.sectionName}</td>
                      <td>{dashedFormatDate(detail.sectionDue)}</td>
                      <td>{detail.taskName}</td>
                      <td>{dashedFormatDate(detail.assignedDate)}</td>
                      <td>{dashedFormatDate(detail.dueDate)}</td>
                      <td>{detail.stages}</td>
                      <td>{detail.duration}</td>
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

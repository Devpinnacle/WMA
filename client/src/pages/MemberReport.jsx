import React, { useEffect } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import ReportTopComponent from "./ReportTopComponent";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import SelectDate from "../components/ui/SelectDate";
import "./MemberReport.css";
import { useSelector } from "react-redux";
import { formatDate } from "../Helper/helper";
import { useGetSingleUserReportMutation } from "../redux/api/reportApi";
import DateRangeInput from "../components/ui/DateRangeInput";
import { CSVLink } from "react-csv";

const MemberReport = () => {
  const { setUser, selectedUser } = useSelector((state) => state.report);
  const [getUser] = useGetSingleUserReportMutation();
  console.log("selectedUser", selectedUser);
  useEffect(() => { getUser(setUser) }, [])
  // Function to format data for CSV
  const getCSVdata = () => {
    const csvData = [];
    // Add header row
    csvData.push([
      "Project",
      "Section",
      "Task",
      "Start Date",
      "End Date",
      "Priority",
      "Status",
      "Stage",
      "Duration (hrs)",
      "Progress",
      "Completion Date",
    ]);
    selectedUser.forEach((proj) => {
      proj.data.forEach((sec, secIndex) => {
        sec.data.forEach((task, taskIndex) => {
          const isFirstRowOfProject = secIndex === 0 && taskIndex === 0;
          const isFirstRowInSection = taskIndex === 0;
  
          const rowData = [
            isFirstRowOfProject ? proj.projectName : "",
            isFirstRowInSection ? sec.sectionName : "",
            task.taskName,
            formatDate(task.startDate),
            formatDate(task.endDate),
            task.priority,
            task.status,
            task.stage,
            task.duration,
            `${task.progress}%`,
            task.completedDate ? formatDate(task.completedDate) : "",
          ];
  
          csvData.push(rowData);
        });
      });
    });
    return csvData;
  };

  return (
    <MainContainer pageName="Member-wise Report">
      <div className="member-wise-report">
        <div className="header-left back-icon">
          <Icon name="arrow-outline" sixe="18px" />
        </div>
        <span
          style={{
            color: "black",
            fontWeight: "500",
            fontSize: "22px",
            marginLeft: "5px",
          }}
        >
          Rakshith
        </span>
        <div className="project-wise-header-right">
          <Icon name="chart-icon" size="3rem" title="Go to chart" />
          <div className="ml-3 mr-3">
            <DateRangeInput />
          </div>
          <div className="ml-2 mr-4">
            <SelectInput placeholder="Project" isSearchable={false} />
          </div>
          {/* <button className="btn-outline m-0">
            <Icon name="excel-outline" size="2rem" />
            Download Excel
          </button> */}
          <div className="btn-download btn-outline mb-4">
            <Icon name="excel-outline" size="2rem" />
            <CSVLink
              data={getCSVdata()}
              filename={"member_report.csv"}
            >
              Download Excel
            </CSVLink>
          </div>
        </div>
      </div>
      <div className="report-table">
        <table className="table table-border member-table">
          <thead>
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
            {selectedUser.map((proj) => (
              <>
                <tr>
                  <td rowSpan={proj.count}>{proj.projectName}</td>
                  <td rowSpan={proj.data[0].data.length}>{proj.data[0].sectionName}</td>
                  <td>{proj.data[0].data[0].taskName}</td>
                  <td>{formatDate(proj.data[0].data[0].startDate)}</td>
                  <td>{formatDate(proj.data[0].data[0].endDate)}</td>
                  <td>{proj.data[0].data[0].priority}</td>
                  <td>{proj.data[0].data[0].status}</td>
                  <td>{proj.data[0].data[0].stage}</td>
                  <td>{proj.data[0].data[0].duration}</td>
                  <td>{proj.data[0].data[0].progress}%</td>
                  <td>
                    {proj.data[0].data[0].completedDate
                      ? formatDate(proj.data[0].data[0].completedDate)
                      : null}
                  </td>
                </tr>
                {proj.data[0].data.slice(1).map((task) => (
                  <tr>
                    <td>{task.taskName}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{formatDate(task.endDate)}</td>
                    <td>{task.priority}</td>
                    <td>{task.status}</td>
                    <td>{task.stage}</td>
                    <td>{task.duration}</td>
                    <td>{task.progress}%</td>
                    <td>
                      {task.completedDate
                        ? formatDate(task.completedDate)
                        : null}
                    </td>
                  </tr>
                ))}
                {proj.data.slice(1).map((sec) => (<>
                  <tr>
                    <td rowSpan={sec.data.length}>
                      {sec.sectionName}
                    </td>
                    <td>{sec.data[0].taskName}</td>
                    <td>{formatDate(sec.data[0].startDate)}</td>
                    <td>{formatDate(sec.data[0].endDate)}</td>
                    <td>{sec.data[0].priority}</td>
                    <td>{sec.data[0].status}</td>
                    <td>{sec.data[0].stage}</td>
                    <td>{sec.data[0].duration}</td>
                    <td>{sec.data[0].progress}%</td>
                    <td>
                      {sec.data[0].completedDate
                        ? formatDate(sec.data[0].completedDate)
                        : null}
                    </td>
                  </tr>
                  {sec.data.slice(1).map((task) => (
                    <tr>
                      <td>{task.taskName}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{formatDate(task.endDate)}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>{task.stage}</td>
                      <td>{task.duration}</td>
                      <td>{task.progress}%</td>
                      <td>
                        {task.completedDate
                          ? formatDate(task.completedDate)
                          : null}
                      </td>
                    </tr>
                  ))}
                </>))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </MainContainer>
  );
};

export default MemberReport;

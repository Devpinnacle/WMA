import React, { useEffect } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import ReportTopComponent from "./ReportTopComponent";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import "./ProjectReport.css";
import { useSelector } from "react-redux";
import { formatDate } from "../Helper/helper";
import { useGetSingleProjectReportMutation } from "../redux/api/reportApi";

const ProjectReport = () => {
  const { setProject, selectedProject } = useSelector((state) => state.report);
  const [getProject]=useGetSingleProjectReportMutation()
  console.log("selectedProject", selectedProject);
  useEffect(()=>{getProject(setProject)},[])
  return (
    <MainContainer pageName="Project-wise Report">
      {/* <ReportTopComponent /> */}
      <div className="project-wise-report">
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
          Book Better
        </span>
        <div className="project-wise-header-right">
          <Icon name="chart-icon" size="3rem" title="Go to chart" />
          <div className="search-box report-search">
            <input
              id="keyword"
              name="keyword"
              type="text"
              placeholder="Search for section"
              autoComplete="new-off"
            />
            <Icon title="Search" name="search-icon" size="2rem" />
          </div>
          <div className="mr-1">
            <SelectInput placeholder="Section state" isSearchable={false} />
          </div>
          <div className="ml-2 mr-2">
            <SelectInput placeholder="Stage" isSearchable={false} />
          </div>
          <button className="btn-outline m-0">
            <Icon name="excel-outline" size="2rem" />
            Download Excel
          </button>
        </div>
      </div>
      <div className="report-table">
        <table className="table table-border project-table">
          <thead>
            <tr>
              <th scope="col">Section</th>
              <th scope="col">Task</th>
              <th scope="col">Assignee</th>
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
            {selectedProject.map((sec) => (
              <>
                <tr>
                  <td rowSpan={sec.data.length}>{sec.sectionName}</td>
                  <td>{sec.data[0].taskName}</td>
                  <td>{sec.data[0].assignee}</td>
                  <td>{formatDate(sec.data[0].startDate)}</td>
                  <td>{formatDate(sec.data[0].endDate)}</td>
                  <td>{sec.data[0].priority}</td>
                  <td>{sec.data[0].status}</td>
                  <td>{sec.data[0].stage}</td>
                  <td>{sec.data[0].duration}</td>
                  <td>{sec.data[0].progress}%</td>
                  <td>{sec.data[0].completedDate?formatDate(sec.data[0].completedDate):null}</td>
                </tr>
                {sec.data.slice(1).map((task) => (
                  <tr>
                    <td>{task.taskName}</td>
                    <td>{task.assignee}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{formatDate(task.endDate)}</td>
                    <td>{task.priority}</td>
                    <td>{task.status}</td>
                    <td>{task.stage}</td>
                    <td>{task.duration}</td>
                    <td>{task.progress}%</td>
                    <td>{task.completedDate?formatDate(task.completedDate):null}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </MainContainer>
  );
};

export default ProjectReport;

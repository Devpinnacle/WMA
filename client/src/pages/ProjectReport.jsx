import React, { useEffect, useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import ReportTopComponent from "./ReportTopComponent";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import "./ProjectReport.css";
import { useSelector } from "react-redux";
import { formatDate } from "../Helper/helper";
import { CSVLink } from "react-csv";
import { useGetSingleProjectReportMutation } from "../redux/api/reportApi";
import { useNavigate } from "react-router-dom";

const ProjectReport = () => {
  const [statusTag, setStatusTag] = useState([]);
  const [stagesTag, setStagesTag] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setProject, selectedProject,projectName } = useSelector((state) => state.report);
  const [getProject] = useGetSingleProjectReportMutation();

  const navigate=useNavigate()

  const statusTags = [
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
    { label: "On Hold", value: "On Hold" },
    { label: "To Do", value: "To Do" },
  ];
  const stagesTags = [
    { label: "Analysis", value: "Analysis" },
    { label: "Development", value: "Development" },
    { label: "Verification", value: "Verification" },
    { label: "Amendment", value: "Amendment" },
    { label: "Testing", value: "Testing" },
    { label: "Re Testing", value: "Re Testing" },
  ];
  // console.log("selectedProject", selectedProject);
  useEffect(() => {
    getProject(setProject);
  }, []);
  // Function to format data for CSV
  const getCSVdata = () => {
    const csvData = [];
    // Add header row
    csvData.push([
      "Section",
      "Task",
      "Assignee",
      "Start Date",
      "End Date",
      "Priority",
      "Status",
      "Stage",
      "Duration (hrs)",
      "Progress",
      "Completion Date",
    ]);

    // Add data rows
    selectedProject.forEach((sec) => {
      sec.data.forEach((task, index) => {
        const rowData = [
          index === 0 ? sec.sectionName : "", // Include section name for the first row
          task.taskName,
          task.assignee,
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
    return csvData;
  };

  const handleStatusTags = (e) => {
    if (!statusTag.includes(e.value))
      setStatusTag((prev) => [...prev, e.value]);
  };
  const handleRemoveStatusTags = (item) => {
    setStatusTag((prev) => prev.filter((tg) => tg !== item));
  };
  const handleStagesTag = (e) => {
    if (!stagesTag.includes(e.value))
      setStagesTag((prev) => [...prev, e.value]);
  };
  const handleRemovestagesTags = (item) => {
    setStagesTag((prev) => prev.filter((tg) => tg !== item));
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProject = selectedProject.filter((sec) => {
    // Filter by section name
    return sec.sectionName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  console.log(filteredProject);
  const filteredProject1 = filteredProject.map((proj) => {
    // Filter the data within each project
    const filteredData = proj.data.filter((task) => {
      const isIncludeStatusTag = statusTag.length === 0 || statusTag.includes(task.status);
      const isIncludeStagesTag = stagesTag.length === 0 || stagesTag.includes(task.stage);
      return isIncludeStatusTag && isIncludeStagesTag;
    });
  
    // Update the project with the filtered data
    return {
      ...proj,
      data: filteredData,
    };
  });  

  console.log("filteredProject", filteredProject1);

  return (
    <MainContainer onGoBack={()=>navigate("/reports/projectreports")} pageName={`${projectName} Report`}>
      <div
        style={{
          color: "#3D405B",
          fontWeight: "700",
          fontSize: "50px",
          paddingLeft: "2rem",
        }}
      >
        {/* {projectName} Report */}
      </div>
      <div className="project-wise-report">
        <span
          style={{
            color: "black",
            fontWeight: "500",
            fontSize: "22px",
            marginLeft: "5px",
          }}
        >
          {/* Book Better */}
          {selectedProject.ProjectName}
          {/* {selectedProject ? selectedProject.sctProjectName : "Project Report"} */}
        </span>
        <div className="project-wise-header-right">
          <Icon name="chart-icon" size="3rem" title="Go to chart" onClick={()=>navigate("/reports")} />
          <div className="search-box report-search">
            <input
              id="keyword"
              name="keyword"
              type="text"
              placeholder="Search for section"
              autoComplete="new-off"
              onChange={handleSearch}
            />
            <Icon title="Search" name="search-icon" size="2rem" />
          </div>

          <div className="section-state mr-1">
            <SelectInput
              placeholder="Section state"
              isSearchable={false}
              options={statusTags}
              onChange={handleStatusTags}
            />
          </div>
          <div className="stage ml-2 mr-2">
            <SelectInput
              placeholder="Stage"
              isSearchable={false}
              options={stagesTags}
              onChange={handleStagesTag}
            />
          </div>
          <div className="btn-download btn-outline mb-4">
            <Icon name="excel-outline" size="2rem" />
            <CSVLink data={getCSVdata()} filename={"project_report.csv"}>
              Download Excel
            </CSVLink>
          </div>
        </div>
      </div>
      <div className="selected-tag">
        {statusTag.map((tg, index) => (
          <div key={index} className="tag-container">
            <Icon
              name="close"
              size="2rem"
              onClick={() => handleRemoveStatusTags(tg)}
            />
            <p style={{ color: "black" }}>{tg}</p>
          </div>
        ))}
      </div>
      <div className="selected-tag">
        {stagesTag.map((tg, index) => (
          <div key={index} className="tag-green-container">
            <Icon
              name="close"
              size="2rem"
              onClick={() => handleRemovestagesTags(tg)}
            />
            <p style={{ color: "black" }}>{tg}</p>
          </div>
        ))}
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
            {filteredProject1.filter(sec=>sec.data.length>0).map((sec) => (
              <>
                <tr>
                  <td rowSpan={sec.data.length}>{sec.sectionName}</td>
                  <td>{sec.data[0]?.taskName}</td>
                  <td>{sec.data[0]?.assignee}</td>
                  <td>{sec.data[0]?formatDate(sec.data[0]?.startDate):" "}</td>
                  <td>{sec.data[0]?formatDate(sec.data[0]?.endDate):" "}</td>
                  <td>{sec.data[0]?.priority}</td>
                  <td>{sec.data[0]?.status}</td>
                  <td>{sec.data[0]?.stage}</td>
                  <td>{sec.data[0]?.duration}</td>
                  <td>{sec.data[0]?.progress}%</td>
                  <td>
                    {sec.data[0]?.completedDate
                      ? formatDate(sec.data[0].completedDate)
                      : null}
                  </td>
                </tr>
                {sec.data?.slice(1).map((task) => (
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
                    <td>
                      {task.completedDate
                        ? formatDate(task.completedDate)
                        : null}
                    </td>
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

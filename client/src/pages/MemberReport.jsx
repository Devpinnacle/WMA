import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const MemberReport = () => {
  const [tag, setTag] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { setUser, selectedUser,memberName } = useSelector((state) => state.report);
  const [getUser] = useGetSingleUserReportMutation();
  const navigate=useNavigate()
  // console.log("selectedUser", selectedUser);
  useEffect(() => {
    getUser(setUser);
  }, []);
  const tags = selectedUser?.map((user) => ({
    label: user.projectName,
    value: user.projectName,
  }));
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

  const handleTags = (e) => {
    if (!tag.includes(e.value)) setTag((prevTag) => [...prevTag, e.value]);
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };

  const handleSetDate = (e) => {
    setStartDate(e.startDate);
    setEndDate(e.endDate);
  };
  const fileteredUser = selectedUser.filter((user) => {
    return tag.length === 0 || tag.includes(user.projectName);
  });

  const filteredUser1 = fileteredUser.map((proj) => {
    const filteredData = proj.data.map((sec) => {
      const filteredTasks = sec.data.filter((task) => {
        const meetsCriteria =
          !startDate ||
          !endDate ||
          (new Date(task.startDate) >= new Date(startDate) &&
            new Date(task.endDate) <= new Date(endDate));
        return meetsCriteria;
      });
      // Return the filtered section with filtered tasks
      return { ...sec, data: filteredTasks };
    });
    // Return the project with filtered sections
    return { ...proj, data: filteredData };
  });

  console.log("fileteredUser1 ", filteredUser1);

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
        Member-wise Report
      </div>
      <div className="member-wise-report">
        <div className="header-left back-icon">
          <Icon name="arrow-outline" sixe="18px" onClick={()=>navigate("/reports/memberreports")}  />
        </div>
        <span
          style={{
            color: "#3D405B",
            fontWeight: "500",
            fontSize: "22px",
            marginLeft: "5px",
          }}
        >
          {memberName}
        </span>
        <div className="member-wise-header-right">
          {/* <Icon name="chart-icon" size="3rem" title="Go to chart" /> */}
          <div className="ml-3 mr-3">
            <DateRangeInput onChange={handleSetDate} />
          </div>
          <div className="select-input ml-3 mr-2">
            <SelectInput
              placeholder="Project"
              isSearchable={false}
              options={tags}
              onChange={handleTags}
            />
          </div>
          <div className="btn-container">
            <div className="btn-download btn-outline mb-4 mr-3">
              <Icon name="excel-outline" size="2rem" />
              <CSVLink data={getCSVdata()} filename={"member_report.csv"}>
                Download Excel
              </CSVLink>
            </div>
            <div className="chart-icon mt-4">
              <Icon name="chart-icon" size="3rem" title="Go to chart" onClick={()=>navigate("/reports")}/>
            </div>
          </div>
        </div>
      </div>
      <div className="selected-tag">
        {tag.map((tg, index) => (
          <div key={index} className="tag-container">
            <Icon
              name="close"
              size="2rem"
              onClick={() => handleRemoveTag(tg)}
            />
            <p style={{ color: "black" }}>{tg}</p>
          </div>
        ))}
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
            {filteredUser1
              .filter(
                (proj) => proj.data.length > 0 && proj.data[0].data.length > 0
              )
              .map((proj) => (
                <>
                  <tr>
                    <td rowSpan={proj.count}>{proj.projectName}</td>
                    <td rowSpan={proj.data[0].data.length}>
                      {proj.data[0].sectionName}
                    </td>
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
                  {proj.data
                    .slice(1)
                    .filter((sec) => sec.data.length > 0)
                    .map((sec) => (
                      <>
                        <tr>
                          <td rowSpan={sec.data.length}>{sec.sectionName}</td>
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

export default MemberReport;

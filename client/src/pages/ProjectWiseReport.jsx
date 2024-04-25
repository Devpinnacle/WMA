import React from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import ReportTopComponent from "./ReportTopComponent";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import { useGetProjectReportQuery } from "../redux/api/reportApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSetProject } from "../redux/slice/reportSlice";

const ProjectWiseReport = () => {
  useGetProjectReportQuery();
  const { projectReport } = useSelector((state) => state.report);
  console.log("projectReport", projectReport);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProjectClick = (id) => {
    dispatch(getSetProject(id));
    navigate("/reports/singleprojectreports");
  };
  return (
    <MainContainer pageName="Project-wise Report">
      {/* <ReportTopComponent /> */}
      <div className="project-wise">
        <Icon name="chart-icon" size="3rem" title="Go to chart" />
        <div className="search-box report-search">
          <input
            id="keyword"
            name="keyword"
            type="text"
            placeholder="Search for projects"
            autoComplete="new-off"
          />
          <Icon title="Search" name="search-icon" size="2rem" />
        </div>
        <div className="mt-3 ml-1 mr-1">
          <SelectInput placeholder="Tags" isSearchable={false} />
        </div>
      </div>
      <div className="project-wise-grid">
        {projectReport.map((proj) => (
          <div
            className="project-wise-item"
            onClick={() => handleProjectClick(proj._id)}
          >
            <span
              className="ml-1"
              style={{ fontWeight: "700", color: "black" }}
            >
              {proj.sctProjectName}
            </span>
            <div className="project-wise-right">
              <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                Total section :
                <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                  {proj.sectionLen}
                </span>
              </span>
              <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                Total Tasks :
                <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                  {proj.assigned}
                </span>
              </span>
              <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                Completed tasks :
                <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                  {proj.completedTasks}
                </span>
              </span>
              <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                Pending tasks :
                <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                  {proj.pendingTasks}
                </span>
              </span>
              <span
                style={{
                  color: proj.overdueTasks === 0 ? `black` : `red`,
                  marginLeft: "2rem",
                  marginRight: "2rem",
                }}
              >
                Task due :
                <span
                  style={{
                    fontWeight: "700",
                    marginLeft: "1rem",
                    color: proj.overdueTasks === 0 ? `black` : `red`,
                  }}
                >
                  {proj.overdueTasks}
                </span>
              </span>
              <div className="tag-container mr-5" style={{ color: "black" }}>
                Software
              </div>
              {/* <div className="download-icon">
                <Icon name="download-outline" size="2rem" />
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
};

export default ProjectWiseReport;

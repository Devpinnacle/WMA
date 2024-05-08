import React, { useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import {
  useGetProjectReportQuery,
  useGetSingleProjectReportMutation,
} from "../redux/api/reportApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSetProject, setProjectName } from "../redux/slice/reportSlice";

const ProjectWiseReport = () => {
  const [tag, setTag] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useGetProjectReportQuery();
  const { projectReport } = useSelector((state) => state.report);
  const [getProject] = useGetSingleProjectReportMutation();

  const tags = [
    { label: "Software", value: "Software" },
    { label: "Website", value: "Website" },
    { label: "Mobile", value: "Mobile" },
    { label: "Others", value: "Others" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProjectClick = (id,name) => {
    dispatch(getSetProject(id));
    dispatch(setProjectName(name))
    getProject(id);
    navigate("/reports/singleprojectreports");
  };

  const handleTags = (e) => {
    if (!tag.includes(e.value)) setTag((prevTag) => [...prevTag, e.value]);
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projectReport.filter((proj) => {
    const isIncludedInTags =
      tag.length === 0 || tag.every((tg) => proj.tags.includes(tg));
    const isIncludedInSearch = proj.sctProjectName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isIncludedInTags && isIncludedInSearch;
  });
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
        Project-wise Report
      </div>
      <div className="project-wise">
        <Icon name="chart-icon" size="3rem" title="Go to chart" onClick={()=>navigate("/reports")} />
        <div className="search-box report-search">
          <input
            id="keyword"
            name="keyword"
            type="text"
            placeholder="Search for projects"
            onChange={handleSearch}
            autoComplete="new-off"
          />
          <Icon title="Search" name="search-icon" size="2rem" />
        </div>
        <div className="mt-3 ml-1 mr-1">
          <SelectInput
            placeholder="Tags"
            isSearchable={false}
            onChange={handleTags}
            options={tags}
          />
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
      <div className="project-wise-grid">
        {filteredProjects.map((proj) => (
          <div
            className="project-wise-item"
            onClick={() => handleProjectClick(proj._id,proj.sctProjectName)}
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
                {proj.tags.length === 0 ? "none" : proj.tags[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
};

export default ProjectWiseReport;

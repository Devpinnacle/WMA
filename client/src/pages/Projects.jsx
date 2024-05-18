import React, { useEffect, useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import "./Projects.css";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import { useGetProjectQuery } from "../redux/api/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { getProject, setSelectedProject, setSelectedProjectName } from "../redux/slice/projectSlice";
import { useNavigate } from "react-router-dom";
import AddProject from "../components/modals/projects/AddProject";
import { useGetSectionMutation } from "../redux/api/sectionApi";

const Projects = () => {
  const [tag, setTag] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addProjectFlag, setAddProjectFlag] = useState(false);

  const { data: projectData } = useGetProjectQuery();
  const [getSections] = useGetSectionMutation();

  const { project } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tags = [
    { label: "Software", value: "Software" },
    { label: "Website", value: "Website" },
    { label: "Mobile", value: "Mobile" },
    { label: "Others", value: "Others" },
  ];

  useEffect(() => {
    if (projectData) {
      dispatch(getProject(projectData.data));
    }
  }, [dispatch, projectData]);

  const handleTags = (e) => {
    if (!tag.includes(e.value)) setTag((prevTag) => [...prevTag, e.value]);
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = project.filter((proj) => {
    const isIncludedInTags =
      tag.length === 0 || tag.every((tg) => proj.tags.includes(tg));
    const isIncludedInSearch = proj.sctProjectName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isIncludedInTags && isIncludedInSearch;
  });

  const handleProjectClick = async (id, name) => {
    dispatch(setSelectedProject(id));
    dispatch(setSelectedProjectName(name))
    await getSections(id)
    navigate("/sections");
  };

  return (
    <MainContainer pageName="Projects">
      <div className="project-top-container mb-1">
        <div className="project-top-actions ml-1">
          <div className="project-top-actions-left row-gap-1">
            <div className="flex-end">
              <div className="search-box">
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  placeholder="Search for projects"
                  autoComplete="new-off"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Icon title="Search" name="search-icon" size="2rem" />
              </div>
              <div className="mt-3" style={{ width: "12rem" }}>
                <SelectInput
                  placeholder="Tags"
                  isSearchable={false}
                  options={tags}
                  onChange={handleTags}
                />
              </div>
            </div>
          </div>
          {user.softDesig !== "members" && (
            <button className="btn-outline" onClick={() => setAddProjectFlag(true)}>
              <Icon name="add-outline" size="2rem" title="Add" />
              Add Project
            </button>
          )}
        </div>
      </div>
        <div className="selected-tag">
        {tag.map((tg, index) => (
          <div key={index} className="tag-container">
            <Icon
              name="close"
              size="2rem"
              onClick={() => handleRemoveTag(tg)}
              title="Remove"
            />
            <p style={{ color: "black" }}>{tg}</p>
          </div>
          ))}
        </div>
      
      <div className="project-container">
        {filteredProjects.map((proj,idx) => (
          <div
            className="project-item"
            key={idx}
            onClick={() => handleProjectClick(proj._id, proj.sctProjectName)}
          >
            <div className="project-title">
              <Icon name="project-outline" size="2rem" noCursor={true}/>
              {proj.sctProjectName}
            </div>
            <div className="project-info">
              {user.softDesig !== "members" && (
                <span>
                  Addition By :
                  <span style={{ fontWeight: "bold", marginLeft: "3px" }}>
                    {user._id === proj.sctProjectEnteredById._id
                      ? `You`
                      : proj.sctProjectEnteredById.userName}
                  </span>
                </span>
              )}
              <span>
                Pending tasks :
                <span style={{ fontWeight: "bold", marginLeft: "3px" }}>
                  {proj.pendingTasks}
                </span>
              </span>
              <span>
                Tasks in progress:
                <span style={{ fontWeight: "bold", marginLeft: "3px" }}>
                  {proj.inProgressTasks}
                </span>
              </span>
              {user.softDesig !== "members" && (
                <span>
                  Total Sections:
                  <span style={{ fontWeight: "bold", marginLeft: "3px" }}>
                    {proj.sectionLen}
                  </span>
                </span>
              )}
              <span>
                {user.softDesig !== "members"
                  ? `Total tasks`
                  : `Total task assigned to you`}
                :{" "}
                <span style={{ fontWeight: "bold", marginLeft: "3px" }}>
                  {proj.assigned}
                </span>
              </span>
              <span>
                Completed Tasks:
                <span style={{ fontWeight: "bold", marginLeft: "3px" }}>
                  {proj.completedTasks}
                </span>
              </span>
              <span
                style={{ color: proj.overdueTasks === 0 ? `black` : `red` }}
              >
                Tasks due:
                <span
                  style={{
                    color: proj.overdueTasks === 0 ? `black` : `red`,
                    fontWeight: "bold",
                    marginLeft: "3px",
                  }}
                >
                  {proj.overdueTasks}
                </span>
              </span>
            </div>
            <div className="project-tags">
              {proj.tags.map((tg, index) => (
                <span
                  className="tag-list"
                  key={index}
                  style={{ color: "black" }}
                >
                  {tg}
                </span>
              ))}
            </div>
          </div>
        ))}
        {addProjectFlag && (
          <AddProject onCancel={() => setAddProjectFlag(false)} />
        )}
      </div>
    </MainContainer>
  );
};

export default Projects;

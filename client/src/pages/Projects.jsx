import React, { useEffect, useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import "./Projects.css";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import { useGetProjectQuery } from "../redux/api/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { getProject, setSelectedProject } from "../redux/slice/projectSlice";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [tag, setTag] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projectData } = useGetProjectQuery();

  const { project } = useSelector((state) => state.project);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tags = [
    { value: "Software", label: "Software" },
    { value: "Website", label: "Website" },
    { value: "Other", label: "Other" },
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

  const handleProjectClick = (id) => {
    dispatch(setSelectedProject(id));
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
              <div className="project-tags">
                <SelectInput
                  placeholder="Tags"
                  isSearchable={false}
                  options={tags}
                  onChange={handleTags}
                />
              </div>
            </div>
          </div>
          <button className="btn-outline">
            <Icon
              name="add-outline"
              size="2rem"
            />
            Add Project
          </button>
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
              <p style={{ color: "black" }}>
              {tg}
            </p>
          </div>
        ))}
      </div>
      <div className="project-container">
        {filteredProjects.map((proj) => (
          <div
            className="project-item"
            key={proj.id}
            onClick={() => handleProjectClick(proj._id)}
          >
            <div className="project-title">
              <Icon name="project-outline" size="2rem" />
              {proj.sctProjectName}
            </div>
            <div className="project-info">
            Addition By :
 
            </div>
            <div className="project-tags">
            {proj.tags.map((tg, index) => (
                <p key={index} style={{ color: "black" }}>
                  {tg}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
};

export default Projects;

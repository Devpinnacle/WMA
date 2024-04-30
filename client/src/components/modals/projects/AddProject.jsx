import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import Icon from "../../ui/Icon";
import "./AddProject.css";
import SelectInput from "../../ui/SelectInput";
import { useDispatch } from "react-redux";
import Alert from "../../ui/Alert";
import { useAddProjectMutation } from "../../../redux/api/projectApi";

const AddProject = ({ onCancel }) => {
  const [project, setProject] = useState({ name: "", decs: "" });
  const [tag, setTag] = useState([]);
  const [alertFlage, setAlertFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [addProject] = useAddProjectMutation()

  const tags = [
    { label: "Software", value: "Software" },
    { label: "Website", value: "Website" },
    { label: "Mobile", value: "Mobile" },
    { label: "Others", value: "Others" },
  ];

  const dispatch = useDispatch();

  const handleTags = (e) => {
    if (!tag.includes(e.value)) {
      setTag((prevTag) => [...prevTag, e.value]);
    }
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };

  const inputHandler = (e) => {
    setProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    const { name, decs } = project;
    console.log("project", project)
    console.log("tag", tag)
    if (!name || !decs || tag.length === 0) {
      setAlertFlag(true);
      setErrorMsg("Enter all the Fields");
      dispatch(setAlert({ type: "error", msg: "Enter all the Fields" }));
      return;
    }
    const fromData = {
      projectName: name,
      description: decs,
      tags: tag
    }
    addProject(fromData);
    onCancel();
  };

  const handleOnExit = () => {
    setErrorMsg(null);
    setAlertFlag(false);
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal add-project-modal">
        <div className="add-project-header">
          <div className="add-title-container">
           <div className="header-icon"> <Icon className="projects-icon" name="projects" size="45px" /></div>
            <span className="add-title" style={{ color: "#3D405B", fontSize: "57px", fontWeight: "700" }}>Add project</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="45px"
            onClick={onCancel}
          />
        </div>
        <form onSubmit={handleSaveProject}>
          <div className="project-input">
            <label htmlFor="Project" style={{ color: "black" }}>
              Projects:
            </label>
            <input
              className="project-input-box"
              type="text"
              name="name"
              value={project.name}
              onChange={inputHandler}
            />
          </div>
          <div className="project-input pb-0">
            <label htmlFor="Project" style={{ color: "black" }}>
              Description:
            </label>
            <input
              className="project-input-box"
              type="text"
              name="decs"
              value={project.desc}
              onChange={inputHandler}
            />
            {/* <textarea
              className="project-input-box"
              name="decs"
              value={project.decs}
              onChange={inputHandler}
            /> */}
          </div>

          <div className="project-tags add-project-tags">
            <div className="select-box mt-0">
              <Icon
                name="tag-outline"
                size="24px"
              />
              <SelectInput
                className="select-tag"
                placeholder="Tags"
                options={tags}
                onChange={handleTags}
                isSearchable={false}
                noBorder={true}
              />
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
          </div>
          <div className="save-button add-project-save">
            <button className="btn-outline mt-0">
              <Icon name="save-outline" size="2rem" />
              Save
            </button>
          </div>
        </form>
      </div>
      {alertFlage && (
        <Alert type={"error"} msg={errorMsg} onExit={handleOnExit} />
      )}
    </ModalContainer>
  );
};

export default AddProject;

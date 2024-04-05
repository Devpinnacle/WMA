import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import SelectInput from "../../ui/SelectInput";
import { useGetSwUsersQuery } from "../../../redux/api/userApi";
import { useSelector } from "react-redux";
import "./AddTask.css";

const AddTask = ({ onCancel }) => {
  const [tag, setTag] = useState([]);
  const [taskData, setTaskData] = useState({
    name: "",
    startDt: "",
    dueDt: "",
  });
  const [list,setList]=useState({
    priority:"",
    status:"",
    stages:""
  })

  useGetSwUsersQuery();

  const { swUsers } = useSelector((state) => state.user);

  const tags = swUsers.map((user) => ({
    label: user.userName,
    value: user._id,
  }));

  const priorityTags = [
    { label: "High", value: "High" },
    { label: "Normal", value: "Normal" },
    { label: "Low", value: "Low" },
  ];

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

  const handleTags = (e) => {
    if (!tag.some((t) => t.value === e.value)) {
      setTag((prevTag) => [...prevTag, { label: e.label, value: e.value }]);
    }
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg.value !== item.value));
  };

  const inputHandler = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        <h1 style={{ color: "black" }}>Add Task</h1>
        <input
          type="text"
          style={{ color: "black" }}
          name="name"
          onChange={inputHandler}
          value={taskData.name}
        />
        <SelectInput
          placeholder="Tags"
          onChange={handleTags}
          isSearchable={false}
          options={tags}
        />
        <div className="selected-tag">
          {tag.map((tg, index) => (
            <div key={index} className="tag-container">
              <p style={{ color: "black" }}>
                {tg.label}
                <button onClick={() => handleRemoveTag(tg)}>c</button>
              </p>
            </div>
          ))}
        </div>
        <input
          type="date"
          style={{ color: "black" }}
          placeholder="startdate"
          name="startDt"
          onChange={inputHandler}
          value={taskData.startDt}
        />
        <input
          type="date"
          style={{ color: "black" }}
          placeholder="enddate"
          name="dueDt"
          onChange={inputHandler}
          value={taskData.dueDt}
        />
        <SelectInput
          placeholder="Priority"
          onChange={handleTags}
          isSearchable={false}
          options={priorityTags}
          
        />
        <SelectInput
          placeholder="Status"
          onChange={handleTags}
          isSearchable={false}
          options={statusTags}
        />
        <SelectInput
          placeholder="Stages"
          onChange={handleTags}
          isSearchable={false}
          options={stagesTags}
        />
        <input
          type="number"
          style={{ color: "black" }}
          placeholder="progress"
        />
        <input type="time" style={{ color: "black" }} placeholder="duration" />
        <input type="text" style={{ color: "black" }} placeholder="notes" />
        <button style={{ color: "black" }}>save</button>
      </div>
    </ModalContainer>
  );
};

export default AddTask;

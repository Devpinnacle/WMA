import React, { useState } from "react";
import AddSection from "../components/modals/section/AddSection";
import { useDispatch, useSelector } from "react-redux";
import { useGetSectionQuery } from "../redux/api/sectionApi";
import DeleteSection from "../components/modals/section/DeleteSection";
import { useNavigate } from "react-router-dom";
import { setSelectedSection } from "../redux/slice/sectionSlice";

const Section = () => {
  const [addSectionFlag, setAddSectionFlag] = useState(false);
  const [deleteSectionFlag, setDeleteSectionFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionHead, setSectionHead] = useState(null);
  const [sectionId, setSectionId] = useState(null);

  const { selectedProject } = useSelector((state) => state.project);
  const { sections } = useSelector((state) => state.section);
  const { user } = useSelector((state) => state.user);

  useGetSectionQuery(selectedProject);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredSections = sections.filter((section) =>
    section.sectionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnCancelSection = () => {
    setSectionHead(null);
    setSectionId(null);
    setDeleteSectionFlag(false);
  };

  const handleDeleteSection = (id, head) => {
    setSectionId(id);
    setSectionHead(head);
    setDeleteSectionFlag(true);
  };

  const handleSectionClick = (section) => {
    dispatch(setSelectedSection(section));
    navigate("/task");
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        style={{ color: "black" }}
        placeholder="search for section"
      />
      <button
        style={{ color: "black" }}
        onClick={() => setAddSectionFlag(true)}
      >
        addsection
      </button>

      {filteredSections.map((sec) => (
        <div
          key={sec._id}
          style={{ border: "1px solid black", padding: "10px" }}
          onClick={() => handleSectionClick(sec)}
        >
          <h2 style={{ color: "black" }}>{sec.sectionName}</h2>
          <p style={{ color: "black" }}>
            Start Date: {formatDate(sec.startDate)}
          </p>
          <p style={{ color: "black" }}>Due Date: {formatDate(sec.dueDate)}</p>
          <p style={{ color: "black" }}>
            Created By:{" "}
            {sec.createdBy._id === user._id ? "You" : sec.createdBy.userName}
          </p>
          <p style={{ color: "black" }}>{sec.progress}</p>
          <button style={{ color: "black" }}>add task</button>
          {sec.totalTask === 0 ? (
            <button
              style={{ color: "black" }}
              onClick={() => handleDeleteSection(sec._id, sec.sectionName)}
            >
              delete task
            </button>
          ) : (
            <button style={{ color: "black" }}>View task</button>
          )}
        </div>
      ))}

      {addSectionFlag && (
        <AddSection onCancel={() => setAddSectionFlag(false)} />
      )}
      {deleteSectionFlag && (
        <DeleteSection
          id={sectionId}
          head={sectionHead}
          onCancel={handleOnCancelSection}
        />
      )}
    </>
  );
};

export default Section;

import React from "react";
import ModalContainer from "../ModalContainer";
import "./DurationWarn.css"

const DurationWarn = ({ head, yes, no }) => {
  return (
    <ModalContainer onCancel={no} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal duration-warn-modal">
        <h1 style={{ color: "black" }}>{head}</h1>
        <div className="modal-header">
          <div className='title-container'>
            <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>{head}</span>
          </div>
        </div>
        <div className="del-content ml-5">Duration is not updated. Do you want to update the duration?</div>
        <div className="button-container p-1 ml-3" style={{ display: "flex" }}>
          {/* <button style={{ color: "black" }} onClick={yes}>yes</button>
          <button style={{ color: "black" }} onClick={no}>no</button> */}
          <button
            className="btn-outline" onClick={yes}>
            Yes
          </button>
          <button className="btn-del" onClick={no}>
            No
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DurationWarn;

import React from "react";
import ModalContainer from "../ModalContainer";

const DurationWarn = ({head, yes, no}) => {
  return (
    <ModalContainer onCancel={no} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        <h1 style={{ color: "black" }}>{head}</h1>
        <p style={{ color: "black" }}>Duration is not updated, is it OK</p>
        <button style={{ color: "black" }} onClick={yes}>yes</button>
        <button style={{ color: "black" }} onClick={no}>no</button>
      </div>
    </ModalContainer>
  );
};

export default DurationWarn;

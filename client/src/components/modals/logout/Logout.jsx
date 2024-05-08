import ModalContainer from "../ModalContainer";
import Icon from "../../ui/Icon";
import React, { useEffect } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/api/userApi";

const Logout = ({onCancel,logout}) => {
 
  return (
    <ModalContainer  onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal logout-modal">
        <div className="modal-header">
          <div className="title-container">
            <Icon name="logout-outline" size="5rem" />
            <span
              className="title"
              style={{ color: "#3D405B", fontWeight: "700", fontSize: "40px" }}
            >
              Logout
            </span>
          </div>
        </div>
        <div
          style={{
            color: "#3D405B",
            fontSize: "20px",
            fontWeight: "500",
            paddingLeft: "2rem",
          }}
        >
          Are you sure you want to logout?
        </div>
        <div className="log-can-btn">
          <button className="btn-del" onClick={logout}>
            <Icon name="logout-outline" size="2rem" />
            Logout
          </button>
          <button className="btn-outline" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Logout;

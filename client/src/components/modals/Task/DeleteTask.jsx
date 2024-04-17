import React from "react";
import ModalContainer from "../ModalContainer";
import "./DeleteTask.css"
import Icon from "../../ui/Icon";

const DeleteTask = () => {
    return (
        <ModalContainer backdropClass={"backdrop-dark"}>
            <div className="modal-container modal-centered user-modal delete-task-modal">
                <div className="modal-header delete-header">
                    <div className='title-container'>
                        <Icon
                            name="delete-outline"
                            size="6rem" />
                        <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>Delete task</span>
                    </div>
                    <Icon
                        className="close-icon"
                        name="close"
                        size="6rem"
                    />
                </div>
                <div className="del-content ml-5">Are you sure you want to delete <span>db</span> notes?</div>
                <div className="del-can-btn">
                    <button
                        className="btn-outline">
                        Cancel
                    </button>
                    <button
                        className="btn-del">
                        <Icon
                            name="delete-outline"
                            size="2rem"
                        />
                        Delete
                    </button>
                </div>
            </div>
        </ModalContainer>
    )
}

export default DeleteTask
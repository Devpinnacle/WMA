import React from 'react'
import Icon from '../../ui/Icon'
import ModalContainer from "../ModalContainer";
import "./UserNotification.css"
import SelectInput from '../../ui/SelectInput';
import SelectDate from '../../ui/SelectDate';

const UserNotification = () => {
    return (
        <ModalContainer backdropClass={"backdrop-dark"}>
            <div className="modal-container modal-notification">
                <div className='notification'>
                    <div className="project-header">
                        <span className="title">Notification</span>
                        <div className="header-right">
                            <SelectInput className="tags" placeholder="Type" />
                            <div
                                className="date-box"
                                style={{ padding: "1rem", margin: "1rem" }}
                            >
                                <SelectDate
                                    placeholder="Day dd-mm-yyyy"
                                />
                                

                            </div>
                        </div>
                    </div>
                    <div className='notification-container'>
                        <div className="notification-item" style={{ backgroundColor: "#FBEFDA", border: "2px solid #F3CF96" }}>
                            <div className="left-content">
                                <Icon name="add-outline" size="24px" />
                                <span className="ml-3">
                                    <span style={{ fontWeight: "700" }}>You</span> added a task in <span style={{ fontWeight: "700" }}>Bookbetter (Development)</span>
                                </span>
                            </div>
                            <span>8:00am </span>
                        </div>
                        <div className="notification-item" style={{ backgroundColor: "#FBEFDA", border: "2px solid #F3CF96" }}>
                            <div className="left-content">
                                <Icon name="progress-outline" size="24px" />
                                <span className="ml-3">
                                    <span style={{ fontWeight: "700" }}>You</span> updated progress in <span style={{ fontWeight: "700" }}>Bookbetter (Development)</span>
                                </span>
                            </div>
                            <span>8:00am </span>
                        </div>
                        <div className="notification-item" style={{ backgroundColor: "#FBEFDA", border: "2px solid #F3CF96" }}>
                            <div className="left-content">
                                <Icon name="edit-outline" size="24px" />
                                <span className="ml-3">
                                    <span style={{ fontWeight: "700" }}>Joel </span>edited your task in <span style={{ fontWeight: "700" }}>JT application (Updates)</span>
                                </span>
                            </div>
                            <span>8:00am </span>
                        </div>
                        <div className="notification-item" style={{ backgroundColor: "#F9E3DD", border: "2px solid #EDB1A1" }}>
                            <div className="left-content">
                                <Icon name="delete-outline" size="24px" />
                                <span className="ml-3">
                                    <span style={{ fontWeight: "700" }}>You </span>deleted a task
                                </span>
                            </div>
                            <span>8:00am </span>
                        </div>
                        <div className="notification-item" style={{ backgroundColor: "#F9E3DD", border: "2px solid #EDB1A1" }}>
                            <div className="left-content">
                                <Icon name="due-outline" size="24px" />
                                <span className="ml-3">
                                    Your task is due in
                                    <span style={{ fontWeight: "700" }}> JT application(Updates) </span>
                                </span>
                            </div>
                            <span>8:00am </span>
                        </div>
                        <div className="notification-item" style={{ backgroundColor: "#F9E3DD", border: "2px solid #EDB1A1" }}>
                            <div className="left-content">
                                <Icon name="critical-note-outline" size="24px" />
                                <span className="ml-3">
                                    <span style={{ fontWeight: "700" }}>You </span>added a critical note in <span style={{ fontWeight: "700" }}>JT application (Updates)</span>
                                </span>
                            </div>
                            <span>8:00am </span>
                        </div>
                        <div className="notification-item" style={{ backgroundColor: "#DCEAE3", border: "2px solid #AACBBA" }}>
                            <div className="left-content">
                                <Icon name="task-outline" size="24px" />
                                <span className="ml-3">
                                    <span style={{ fontWeight: "700" }}>You </span>
                                    completed task in
                                    <span style={{ fontWeight: "700" }}> JT application (Updates) </span>
                                </span>
                            </div>
                            <span>8:00am </span>
                        </div>
                    </div>
                </div>
            </div>
        </ModalContainer >
    )
}

export default UserNotification
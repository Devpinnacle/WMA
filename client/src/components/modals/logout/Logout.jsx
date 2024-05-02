import ModalContainer from "../ModalContainer";
import Icon from "../../ui/Icon";
import React from 'react'
import "./Logout.css"

const Logout = () => {
    return (
        <ModalContainer>
            <div className="modal-container modal-centered user-modal logout-modal">
                <div className="modal-header">
                    <div className='title-container'>
                        <Icon
                            name="logout-outline"
                            size="5rem" />
                        <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "40px" }}>Logout</span>
                    </div>
                </div>
                <div style={{color:"#3D405B",fontSize:"20px",fontWeight:"500",paddingLeft:"2rem"}}>Are you sure you want to logout?</div>
                <div className="log-can-btn">
                <button
                    className="btn-del">
                    <Icon
                        name="logout-outline"
                        size="2rem"
                    />
                    Logout
                </button>
                <button
                    className="btn-outline">
                    Cancel
                </button>
                
            </div>
            </div>
            
        </ModalContainer>
    )
}

export default Logout

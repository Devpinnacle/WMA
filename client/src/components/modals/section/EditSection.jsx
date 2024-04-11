import React from 'react'
import Icon from '../../ui/Icon'
import ModalContainer from '../ModalContainer'

const EditSection = () => {
    return (
        <ModalContainer>
            <div className="modal-container modal-centered user-modal">
                <div className="add-section-header">
                    <div className='title-container'>
                        <Icon
                            className="notes-icon"
                            name="notes-outline"
                            size="6rem" />
                        <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>Edit Section</span>
                    </div>
                    <Icon
                        className="close-icon"
                        name="close"
                        size="6rem"
                    />
                </div>
                <div className='section-input'>
                    <div>
                        <label htmlFor='section' style={{ color: "black", fontWeight: "bold" }}>Section: </label>
                        <input
                            type="text"
                            name="name"
                        />
                    </div>
                    <div>
                        <label htmlFor='section' style={{ color: "black", fontWeight: "bold" }}>Addition date: </label>
                        <input
                            type="date"
                            name="start"
                        />
                    </div>
                    <div>
                        <label htmlFor='section' style={{ color: "black", fontWeight: "bold" }}>Due date: </label>
                        <input
                            type="date"
                            name="due"
                        />
                    </div>
                    <div className='save-button'>
                    <button className="btn-outline">
                            <Icon
                                name="refresh-outline"
                                size="2rem"
                            />
                            Adjust all tasks dates
                        </button>
                        <button className="btn-outline">
                            <Icon
                                name="save-outline"
                                size="2rem"
                            />
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </ModalContainer>
    )
}

export default EditSection
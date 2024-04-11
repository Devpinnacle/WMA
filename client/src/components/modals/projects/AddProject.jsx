import React from 'react'
import ModalContainer from '../ModalContainer'
import Icon from '../../ui/Icon'
import "./AddProject.css"
import SelectInput from '../../ui/SelectInput'

const AddProject = () => {
    

    return (
        <ModalContainer>
            <div className="modal-container modal-centered user-modal">
                <div className="add-project-header">
                    <div className='add-title-container'>
                        <Icon
                            className="projects-icon"
                            name="projects"
                            size="6rem" />
                        <span className='add-title'>Add project</span>
                    </div>
                    <Icon
                        className="close-icon"
                        name="close"
                        size="6rem"
                        // onClick={onCancel}
                    />
                </div>
                <form>
                    <div className='project-input'>
                        <label htmlFor='Project' style={{ color: "black" }}>Projects:</label>
                        <input
                            className='project-input-box'
                            type="text"
                            name="head"
                        // onChange={inputHandler}
                        />
                    </div>
                    <div className='project-tags'>
                        <SelectInput
                            className="select-tag"
                            placeholder="Tags"
                            isSearchable={false}

                        />
   
                    </div>
                    <div className='save-button'>
                        <button className="btn-outline" >
                            <Icon
                                name="save-outline"
                                size="2rem"
                            />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </ModalContainer>
    )
}

export default AddProject
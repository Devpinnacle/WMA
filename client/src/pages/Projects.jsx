import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import './Projects.css'
import Icon from '../components/ui/Icon'

const Projects = () => {
    const project = [{title:''}]
    return (
        <MainContainer>
            <div className='project-customize'>
                <div className='search-box'>
                    <input
                        id="keyword"
                        name="keyword"
                        type="text"
                        placeholder="Search for projects"
                        autoComplete="new-off"
                    />
                </div>
                <Icon
                    title="Search"
                    name="search-icon"
                    size="2rem"
                />
            </div>

            {/* <div className='project-container'>
                <div className='project-item'>
                    <div className='project-title'>
                        <Icon
                            title="Project"
                            name="project-outline"
                            size="2rem"
                        />
                        Book Better-Hospitality
                    </div>
                    <div className='project-info'>

                    </div>
                    <div className='project-tags'>

                    </div>
                </div>
            </div> */}
            <div className='project-container'>
                {project.map((project, index) => (
                    <div className='project-item' key={index}>
                        <div className='project-title'>
                            <Icon
                                title="Project"
                                name="project-outline"
                                size="2rem"
                            />
                            {project.title}
                        </div>
                        <div className='project-info'>
                            {/* {project.info} */}
                        </div>
                        <div className='project-tags'>

                        </div>
                    </div>
                ))}
            </div>



        </MainContainer>
    )
}

export default Projects
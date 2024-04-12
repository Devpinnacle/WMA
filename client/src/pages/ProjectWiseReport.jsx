import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import ReportTopComponent from './ReportTopComponent'
import Icon from '../components/ui/Icon'
import SelectInput from '../components/ui/SelectInput'

const ProjectWiseReport = () => {
    return (
        <MainContainer pageName="Project-wise Report">
            <ReportTopComponent />
            <div className='project-wise'>
                <Icon
                    name="chart-icon"
                    size="3rem"
                    title="Go to chart"
                />
                <div className="search-box report-search">
                    <input
                        id="keyword"
                        name="keyword"
                        type="text"
                        placeholder="Search for projects"
                        autoComplete="new-off"
                    />
                    <Icon title="Search" name="search-icon" size="2rem" />
                </div>
                <div className="mt-3 ml-1 mr-1">
                    <SelectInput
                        placeholder="Tags"
                        isSearchable={false}
                    />
                </div>
            </div>
            <div className='project-wise-grid'>
                <div className='project-wise-item'>
                    <span className='ml-1' style={{ fontWeight: '700', color: 'black' }}>Book better</span>
                    <div className='project-wise-right'>
                        <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>Total section :
                            <span style={{ fontWeight: '700', marginLeft: '1rem' }}>
                                9
                            </span>
                        </span>
                        <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>Total Tasks :
                            <span style={{ fontWeight: '700', marginLeft: '1rem' }}>
                                9
                            </span>
                        </span>
                        <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>Completed tasks :
                            <span style={{ fontWeight: '700', marginLeft: '1rem' }}>
                                9
                            </span>
                        </span>
                        <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>Pending tasks :
                            <span style={{ fontWeight: '700', marginLeft: '1rem' }}>
                                9
                            </span>
                        </span>
                        <span style={{ color: 'red', marginLeft: '2rem', marginRight: '2rem' }}>Task due :
                            <span style={{ fontWeight: '700', marginLeft: '1rem', color: 'red' }}>
                                9
                            </span>
                        </span>
                        <div className='tag-container mr-5' style={{ color: 'black' }}>Software</div>
                        <Icon
                            name="download-outline"
                            size="2rem"
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export default ProjectWiseReport
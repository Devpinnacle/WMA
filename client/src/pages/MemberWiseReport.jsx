import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import ReportTopComponent from './ReportTopComponent'
import Icon from '../components/ui/Icon'

const MemberWiseReport = () => {
  return (
    <MainContainer pageName="Member-wise Report">
        <ReportTopComponent/>
        <div className='member-wise-item'>
                    <span className='ml-3' style={{ fontWeight: '700', color: 'black' }}>Rakshith</span>
                    <div className='member-wise-right'>
                        <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>Total projects :
                            <span style={{ fontWeight: '700', marginLeft: '1rem' }}>
                                9
                            </span>
                        </span>
                        <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>Total sections :
                            <span style={{ fontWeight: '700', marginLeft: '1rem' }}>
                                9
                            </span>
                        </span>
                        <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>Total tasks :
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
                        <span style={{ color: 'red', marginLeft: '2rem', marginRight: '4rem' }}>Task due :
                            <span style={{ fontWeight: '700', marginLeft: '1rem', color: 'red' }}>
                                9
                            </span>
                        </span>
                        <Icon
                            name="download-outline"
                            size="2rem"
                        />
                    </div>
                    
                </div>
    </MainContainer>
  )
}

export default MemberWiseReport
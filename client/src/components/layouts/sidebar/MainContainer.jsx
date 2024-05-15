import { Fragment, useRef, useState } from "react";
import Icon from "../../ui/Icon";
import SidebarModal from "./SidebarModal";
import "./MainContainer.css";

export default function MainContainer({ onGoBack, children, pageName, userName }) {
    const wrappedRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const pageIcons = {
        Hi: 'hi-emoji',
        Projects: 'projects',
        Section:'project-outline',  
        Reports:'reports',
        Task:'task-outline'
    };


    return (
        <Fragment>
            <SidebarModal
                onCancel={() => setShowModal(false)}
                showModal={showModal}
            />
            <div className="top-header">
                <div className="row-gap-1">
                    <div className="btn-menu">
                        <Icon
                            name="menu-outline"
                            size="3rem"
                            onClick={() => setShowModal(true)}
                            color="#f8f9fb"
                        />

                    </div>
                    {onGoBack && (
                        <Icon
                            title="Back"
                            name="arrow-outline"
                            size="5.9rem"
                            onClick={onGoBack}
                            color="#3D405B"
                        />
                    )}
                    <div className="page-name">
                        {/* <div className="page-icon"> */}
                        <Icon
                            name={pageIcons[pageName]}
                            size="50px"
                            noCursor={true}
                        />
                        {/* </div> */}
                        <span className="ml-4" style={{color:"#3D405B"}}>{pageName}{" "}{userName}</span>
                        
                    </div>


                </div>
            </div>
            {children}
        </Fragment>
    )
}

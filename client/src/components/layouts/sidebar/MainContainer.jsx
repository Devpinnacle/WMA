import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Icon from "../../ui/Icon";
import useOutsideClick from "../../../hooks/useOutsideClick";
import SidebarModal from "./SidebarModal";
import "./MainContainer.css";

export default function MainContainer({ onGoBack, children, pageName, userName }) {
    const wrappedRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    // const { user } = useSelector((state) => state.user);
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
                            name="long-arrow-back"
                            size="5.9rem"
                            onClick={onGoBack}
                            color="#f8f9fb"
                        />
                    )}
                    {/* <Icon
                        name="projects"
                        size="4rem"
                        /> */}
                    {/* <div className="head-container">
                        <Icon
                            name={pageIcons[pageName]}
                            size="5.9rem"
                        />
                        <span className="page-name">{pageName}</span>
                    </div> */}


                    <div className="page-name">
                        <Icon
                            name={pageIcons[pageName]}
                            size="54px"
                        />
                        <span className="ml-4" style={{color:"#3D405B"}}>{pageName}{" "}{userName}</span>
                        
                    </div>


                </div>
            </div>
            {children}
        </Fragment>
    )
}

import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Icon from "../../ui/Icon";
import useOutsideClick from "../../../hooks/useOutsideClick";
import SidebarModal from "./SidebarModal";
import "./MainContainer.css";

export default function MainContainer({ onGoBack, children, pageName }) {
    const wrappedRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    // const { user } = useSelector((state) => state.user);
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
                </div>
            </div>
            {children}
        </Fragment>
    )
}

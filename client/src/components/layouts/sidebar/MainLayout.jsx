import { Fragment } from "react";
// import { UseDispatch,useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar"
import useScreenSize from "../../../hooks/useScreenSize";
import "./MainLayout.css"

export default function MainLayout() {
    const { width } = useScreenSize();
    return (
        <Fragment>
            <div className="outer-container">
                {width > 992 && <Sidebar />}

                <div className="main-container">
                    <div>Hello world</div>
                    {/* <Outlet /> */}
                </div>
            </div>
        </Fragment>

    )
}


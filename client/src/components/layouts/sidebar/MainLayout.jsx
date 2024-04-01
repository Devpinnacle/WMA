import { Fragment } from "react";
// import { UseDispatch,useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import useScreenSize from "../../../hooks/useScreenSize";
import "./MainLayout.css";
import { useSelector } from "react-redux";

export default function MainLayout() {
    const { user } = useSelector((state) => state.user);
    const { width } = useScreenSize();
    return (
        <Fragment>
            {/* {user && ( */}
            <div className="outer-container">
               
                {width > 992 && <Sidebar /> }

                <div className="main-container">
                   
                    <Outlet />
                </div>
            </div>
            {/* )} */}
        </Fragment>

    )
}

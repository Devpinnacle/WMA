import React from "react";
import Icon from "../components/ui/Icon";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const ReportTopComponent = () => {

  const location = useLocation();
  const isProjectReportActive = location.pathname === "/reports/singleprojectreports";
  const isMemberReportActive = location.pathname === "/reports/singleuserreports";


  return (
    <>
      <div className="report-top">
        <NavLink
          className="top-items daily-report"
          to="dailyreports"
          style={{ color: "black", textDecoration: "none" }}
          activeClassName="active"
        >
          <div className="head-content">
            <div className="report-icon">
              <Icon id="project-icon" name="daily-report-outline" size="5.5rem" />
            </div>
            <span style={{ color: "black" }}>Daily Report</span>
          </div>
        </NavLink>

        <NavLink
          className={`top-items project-report${isProjectReportActive ? " active" : ""}`}
          to="projectreports"
          style={{ color: "black", textDecoration: "none" }}
          activeClassName="active"

        >
          <div className="head-content">
            <div className="report-icon">
              <Icon name="projects" size="5.5rem" />
            </div>
            <span style={{ color: "black" }}>Project-wise Report</span>
          </div>
        </NavLink>

        <NavLink
          className={`top-items member-report${isMemberReportActive ? " active" : ""}`}
          to="memberreports"
          style={{ color: "black", textDecoration: "none" }}
          activeClassName="active"
        >
          <div className="head-content">
            <div className="report-icon">
              <Icon name="member-wise-outline" size="5.5rem" />
            </div>
            <span style={{ color: "black" }}>Member-wise Report</span>
          </div>
        </NavLink>
      </div>
      <div><Outlet /></div>
    </>
  );
};

export default ReportTopComponent;

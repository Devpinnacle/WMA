import React from "react";
import Icon from "../components/ui/Icon";
import { NavLink, Outlet } from "react-router-dom";

const ReportTopComponent = () => {
  return (
    <>
      <div className="report-top">
        <NavLink
          className="top-items daily-report"
          to="dailyreports"
          style={{ color: "black", textDecoration: "none" }}
          activeClassName="active"
          
        >
          <Icon id="project-icon" name="daily-report-outline" size="5.5rem" />
          <span style={{ color: "black" }}>Daily Report</span>
        </NavLink>
        <NavLink
          className="top-items project-report"
          to="projectreports"
          style={{ color: "black", textDecoration: "none" }}
          activeClassName="active"
        >
          <Icon name="projects" size="5.5rem" />
          <span style={{ color: "black" }}>Project-wise Report</span>
        </NavLink>
        <NavLink
          className="top-items member-report"
          to="memberreports"
          style={{ color: "black", textDecoration: "none" }}
          activeClassName="active"
        >
          <Icon name="member-wise-outline" size="5.5rem" />
          <span style={{ color: "black" }}>Member-wise Report</span>
        </NavLink>
      </div>
      <div><Outlet/></div>
    </>
  );
};

export default ReportTopComponent;

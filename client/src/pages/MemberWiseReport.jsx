import React from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import ReportTopComponent from "./ReportTopComponent";
import Icon from "../components/ui/Icon";
import { useGetSingleUserReportMutation, useGetUserReportQuery } from "../redux/api/reportApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSetUser } from "../redux/slice/reportSlice";

const MemberWiseReport = () => {
  useGetUserReportQuery();
  const [getUser] = useGetSingleUserReportMutation()
  const { userReport } = useSelector((state) => state.report);
  console.log("userReport", userReport);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserClick = async (id) => {
    dispatch(getSetUser(id));
    getUser(id)
    navigate("/reports/singleuserreports");
  };

  return (
    <MainContainer>
      <div style={{ color: "#3D405B", fontWeight: "700", fontSize: "50px", paddingLeft: "2rem" }}>Member-wise Report</div>
      <div className="member-wise-report">

        <div className="btn-container member-wise-header-right">
          <div className="search-box report-search">
            <input
              id="keyword"
              name="keyword"
              type="text"
              placeholder="Search for Employee"
              autoComplete="new-off"
            />
            <Icon title="Search" name="search-icon" size="2rem" />
          </div>
          <Icon name="chart-icon" size="3rem" title="Go to chart" />
        </div>
      </div>
      {userReport.map((user) => (
        <div className="member-wise-item" onClick={() => handleUserClick(user._id)} >
          <span className="ml-3" style={{ fontWeight: "700", color: "black" }}>
            {user.userName}
          </span>
          <div className="member-wise-right">
            <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Total projects :
              <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                {user.totalProjects}
              </span>
            </span>
            <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Total sections :
              <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                {user.totalSections}
              </span>
            </span>
            <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Total tasks :
              <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                {user.totalTasks}
              </span>
            </span>
            <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Completed tasks :
              <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                {user.completedTasks}
              </span>
            </span>
            <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Pending tasks :
              <span style={{ fontWeight: "700", marginLeft: "1rem" }}>
                {user.pendingTasks}
              </span>
            </span>
            <span
              style={{ color: user.dueTasks === 0 ? `black` : `red`, marginLeft: "2rem", marginRight: "4rem" }}
            >
              Task due :
              <span
                style={{ fontWeight: "700", marginLeft: "1rem", color: user.dueTasks === 0 ? `black` : `red` }}
              >
                {user.dueTasks}
              </span>
            </span>
            {/* <div className="download-icon">
              <Icon name="download-outline" size="2rem" />
            </div> */}
          </div>
        </div>
      ))}
    </MainContainer>
  );
};

export default MemberWiseReport;

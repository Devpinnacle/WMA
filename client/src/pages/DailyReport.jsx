import React, { useState } from "react";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import ReportTopComponent from "./ReportTopComponent";
import Icon from "../components/ui/Icon";
import SelectDate from "../components/ui/SelectDate";
import "./DailyReport.css";
import { useGetDailyReportQuery } from "../redux/api/reportApi";
import { useSelector } from "react-redux";
import { dashedFormatDate, formatDate } from "../Helper/helper";
import NotesView from "../components/modals/Task/NotesView";

const DailyReport = () => {
  useGetDailyReportQuery();
  const [notes,setNotes]=useState(null)
  const { dailyReport } = useSelector((state) => state.report);
  console.log("daily report", dailyReport);
  return (
    <MainContainer pageName="Daily Report">
      {/* <ReportTopComponent /> */}
      <div className="daily-report-top">
        <span
          style={{
            color: "#3D405B",
            marginLeft: "2rem",
            fontSize: "22px",
            fontWeight: "500",
          }}
        >
          Wednesday 11-04-2024
        </span>
        <div className="daily-header-right">
          <Icon name="chart-icon" size="3rem" title="Go to chart" />
          <div className="date-box m-0 ml-3">
            <SelectDate placeholder="Day dd/mm/yyyy" />
          </div>
          <button className="btn-outline mt-0">
            <Icon name="excel-outline" size="2rem" />
            Download Excel
          </button>
        </div>
      </div>
      <div className="report-table daily-report-table">
        <table className="table table-border">
          <thead>
            <tr>
              <th scope="col">Employee</th>
              <th scope="col">Project</th>
              <th scope="col">Section</th>
              <th scope="col">SD Date</th>
              <th scope="col">Task</th>
              <th scope="col">TA Date</th>
              <th scope="col">TD Date</th>
              <th scope="col">Stage</th>
              <th scope="col">Duration(min)</th>
              <th scope="col">Status</th>
              <th scope="col">Progress</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {/* {dailyReport.map((date) => (
              <>
                <tr key={`date-${date.date}`}>
                  <td colSpan={12}>{date.date}</td>
                </tr>
                {date.data.map((name) => (
                  <>
                    {/* Render user name with rowspan */}
            {/* <tr key={`user-${name.name}`}>
                      <td rowSpan={name.nameData.length}>{name.name}</td>
                      <td>{name.nameData[0].projectName}</td>
                      <td>{name.nameData[0].projectData[0].sectionName}</td>
                    </tr> */}
            {/* Render additional projects and sections for the same user */}
            {/* {name.nameData.slice(1).map((proj) => (
                      <>
                        <tr key={`project-${proj.projectName}`}>
                          <td rowSpan={proj.projectData.length}>
                            {proj.projectName}
                          </td>
                          <td>{proj.projectData[0].sectionName}</td>
                        </tr>
                        {proj.projectData.slice(1).map((section) => (
                          <tr key={`section-${section.sectionName}`}>
                            <td>{section.sectionName}</td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </>
                ))}
              </> */}
            {/* ))} */}

            {dailyReport.map((report) => (
              <>
                <tr>
                  <td colSpan={12}>{report._id}</td>
                </tr>
                {report.data.map((detail) => (
                  <>
                    <tr>
                      <td>{detail.name}</td>
                      <td>{detail.projectName}</td>
                      <td>{detail.sectionName}</td>
                      <td>{formatDate(detail.sectionDue)}</td>
                      <td>{detail.taskName}</td>
                      <td>{formatDate(detail.assignedDate)}</td>
                      <td>{formatDate(detail.dueDate)}</td>
                      <td>{detail.stages}</td>
                      <td>{detail.duration}</td>
                      <td>{detail.status}</td>
                      <td>{detail.progress}</td>
                      <td>{detail.notes?<button>icon</button>:null}</td>
                    </tr>
                  </>
                ))}
              </>
            ))}

            {/* <tr>
              <td rowSpan={2}>Dev1</td>
              <td>shg</td>
            </tr>
            <tr><td>tcs</td></tr>
            <tr>
              <td>Dev2</td>
            </tr> */}

            {/* Dummy Example
            <tr>
              <td colSpan={12}>date</td>
            </tr>
            <tr>
              <td rowSpan={8}>Rakshith</td>
              <td rowSpan={4}>SHG</td>
              <td rowSpan={2}>Login</td>
              <td rowSpan={2}> 12/2/2024</td>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>Login</td>
              <td rowSpan={2}> 12/2/2024</td>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td rowSpan={4}>SHG</td>
              <td rowSpan={2}>Login</td>
              <td rowSpan={2}> 12/2/2024</td>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>Login</td>
              <td rowSpan={2}> 12/2/2024</td>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td rowSpan={4}>Rakshith</td>
              <td rowSpan={2}>SHG</td>
              <td rowSpan={1}>Login</td>
              <td rowSpan={1}> 12/2/2024</td>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr>
            <tr>
              <td rowSpan={1}>Login</td>
              <td rowSpan={1}> 12/2/2024</td>
              <td>frontend</td>
              <td>12/5/2024</td>
              <td>12/5/2024</td>
              <td>Development</td>
              <td>2</td>
              <td>In progress</td>
              <td>50%</td>
              <td>
                <Icon name="report-note-outline" size="24px" />
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* <NotesView onCancel={()=>setNotes(null) } head={notes}/> */}
    </MainContainer>
  );
};

export default DailyReport;

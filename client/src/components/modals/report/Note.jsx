import ModalContainer from "../ModalContainer";
import Icon from "../../ui/Icon";
import React from 'react'
import { useGetDailyReportQuery } from "../../../redux/api/reportApi";
import { useSelector } from "react-redux";

const Note = (onCancel) => {
    useGetDailyReportQuery();
    const { dailyReport } = useSelector((state) => state.report);

    return (
        <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
                <div className="modal-container modal-centered user-modal add-note-modal">
                <div className="note-content" style={{ color: "black" }}>
                    <sapn style={{ color: "black", fontWeight: "bold" }}>Note: </sapn>
                    {dailyReport.map((report) => (
                        <>
                            {report.data.map((detail) => (
                                <>
                                    {detail.notes}
                                </>
                            ))}
                        </>
                    ))}

                </div>

            </div>
        </ModalContainer>
    )
}

export default Note
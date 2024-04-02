import React from "react";
import { useSelector } from "react-redux";
import Alert from "../ui/Alert";
import { Outlet } from "react-router-dom";

const Root = () => {
  const { alertType, alertMsg } = useSelector((state) => state.user);
  console.log("hit")
  return (
    <>
      <Alert type={alertType} msg={alertMsg} />
      <Outlet />
    </>
  );
};

export default Root;

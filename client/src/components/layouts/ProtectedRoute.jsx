import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { useGetMeQuery, userApi } from "../../redux/api/userApi";

export default function ProtectedRoute({ children, reverse }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const outlet = useOutlet();
  const location = useLocation();
  const { isLoading, data } = useGetMeQuery();

  useEffect(() => {
    console.log("get me data",data)
    console.log("user",user)
    console.log(data && !user)
    if (data && !user) {
      console.log("reset Api")
      dispatch(userApi.util.resetApiState());
    }
  }, [data,user]);

  if (isLoading) {
    // return null;
  } else
   if (data) {
    // const logger=data.data?.user
    if (reverse) {
      return <Navigate to={"/"} state={location} replace />;
    } else {
      return children || outlet;
    }
  } else {
    if (reverse) {
      return children || outlet;
    } else {
      return <Navigate to="/login" state={location} replace />;
    }
  }
}

import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/api/userApi";
import { setAlert } from "../redux/slice/userSlice";
import { useGetNotesQuery } from "../redux/api/notesApi";
import { useSaveNotificationMutation } from "../redux/api/notificationApi";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const dispatch = useDispatch();
  const [login, { isLoading,error, data:logdata }] = useLoginMutation();
  const [saveNotification] = useSaveNotificationMutation();
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.user);

  const socket = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    if (error) dispatch(setAlert({ type: "error", msg: error }));

    if (logdata?.status === "SUCCESS") {
      saveNotification({ userId: logdata.userId });
      socket.emit("login", logdata.userId);
      dispatch(setAlert({ type: "success", msg: "Welcome" }));
      navigate("/")
    }
  }, [error, dispatch, logdata,user]);

  const inputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <h2 className="title" style={{ color: "white" }}>
          LOG IN
        </h2>

        <div className="login-input">
          <label htmlFor="username">Username*</label>
          <div className="form__input">
            <input
              className="input-box"
              required
              type="username"
              id="username"
              name="userName"
              onChange={inputHandler}
              value={formData.userName}
            />
          </div>
        </div>
        <div className="login-input">
          <label htmlFor="password">Password*</label>
          <div className="form__input">
            <input
              required
              className="input-box"
              type="password"
              id="password"
              name="password"
              onChange={inputHandler}
              value={formData.password}
            />
          </div>
        </div>
        <div className="flex-center">
          <button className="btn-login flex-center">Log in</button>
        </div>
      </form>
    </div>
  );
};
export default Login;

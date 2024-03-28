import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import "./Alert.css";
import { clearAlert } from "../../redux/slice/userSlice";

export default function Alert({ type, msg }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type && msg) {
      setShowAlert(true);
      setAlertClass("alert-enter");

      const timer = setTimeout(() => {
        setAlertClass("alert-exit");
        setTimeout(()=>{
          setShowAlert(false);
          dispatch(clearAlert());
        },300);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [msg, type, dispatch]);

  let alertColor;
  if (type === "error") {
    alertColor = "bg-red";
  } else if (type === "success") {
    alertColor = "bg-green";
  }

  const content = (
    <div className={`alert ${alertClass} ${alertColor}`}>
      {msg || (type === "error" && "Something went very wrong!")}
    </div>
  );

  return (
    showAlert &&
    ReactDOM.createPortal(content, document.getElementById("alert-modal-hook"))
  );
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import "./Alert.css";
import { clearAlert } from "../../redux/slice/userSlice";

export default function Alert({ type, msg }) {
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  console.log("entered Alert..........");

  useEffect(() => {
    if (type && msg) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(clearAlert());
      }, 3000);

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
    <div className={`alert ${alertColor}`}>
      {msg || (type === "error" && "Something went very wrong!")}
    </div>
  );

  return (
    showAlert &&
    ReactDOM.createPortal(content, document.getElementById("alert-modal-hook"))
  );
}

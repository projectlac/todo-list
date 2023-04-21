import { useStore } from "../../../contexts/TodoContext";
import React from "react";

function Toast() {
  const { message } = useStore();
  return (
    <div
      className={`notification-container ${
        message.message !== "" ? "top-right" : ""
      }`}
    >
      <div className="notification toast top-right">
        <div>
          <p
            className={`notification-title ${
              message.type === "Success" ? "success" : "error"
            }`}
          >
            {message.type}
          </p>
          <p
            className={`notification-message ${
              message.type === "Success" ? "success" : "error"
            }`}
          >
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Toast;

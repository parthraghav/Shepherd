import React from "react";
import "./styles.css";

export const FormButton = ({ label, prompt, hint, ...rest }: any) => {
  return (
    <div {...rest} className="form-container form-button">
      <div className="left-container">
        <div className="form-label">
          <span>{label}</span>
        </div>
        <div className="form-prompt">
          <span>{prompt}</span>
        </div>
      </div>
      <div className="right-container">{hint}</div>
    </div>
  );
};

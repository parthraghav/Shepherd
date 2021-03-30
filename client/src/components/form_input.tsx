import React from "react";
import { InputBox } from "./input_box";
import "./styles.css";

export const FormInput = ({
  label,
  prompt,
  prefix,
  placeholder,
  defaultValue,
  children,
  type,
  inputType,
  inputStyleType,
  onSubmit,
  ...rest
}: any) => {
  return (
    <div {...rest} className={"form-container " + type}>
      <div className={"form-input " + (inputStyleType == "fullWidth" ? "full-width" : "")}>
        <div className="left-container">
          <div className="form-label">
            <span>{label}</span>
          </div>
          <div className="form-prompt">
            <span>{prompt}</span>
          </div>
        </div>
        <div className="right-container">
          <InputBox
            type={inputType}
            prefix={prefix}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      <div className="form-input">{children}</div>
    </div>
  );
};

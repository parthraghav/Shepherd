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
  ...rest
}: any) => {
  return (
    <div {...rest} className={"form-container " + type}>
      <div className="form-input">
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
            prefix={prefix}
            defaultValue={defaultValue}
            placeholder={placeholder}
          />
        </div>
      </div>

      <div className="form-input">{children}</div>
    </div>
  );
};

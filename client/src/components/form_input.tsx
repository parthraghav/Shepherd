import React from "react";
import { InputBox } from "./input_box";
import "./styles.css";

export const FormInput = ({
  label,
  prompt,
  prefix,
  placeholder,
  defaultValue,
  ...rest
}: any) => {
  return (
    <div {...rest} className="form-container form-input">
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
  );
};

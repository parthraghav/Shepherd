import React from "react";
import { InputBox } from "./input_box";
import "./styles.css";

export const FormInput = ({
  id,
  label,
  prompt,
  prefix,
  placeholder,
  defaultValue,
  valueList,
  children,
  type,
  inputType,
  inputStyleType,
  onSubmit,
  onChange,
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
            id={id}
            type={inputType}
            prefix={prefix}
            valueList={valueList}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-input">{children}</div>
    </div>
  );
};

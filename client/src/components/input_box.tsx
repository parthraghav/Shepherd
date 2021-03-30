import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./styles.css";

export const InputBox = ({ prefix, placeholder, defaultValue, onSubmit, type, ...rest }: any) => {
  let _defaultValue = defaultValue ?? "";
  const [value, setValue] = useState(_defaultValue);
  const [size, setSize] = useState(_defaultValue.length);
  const handleChange = (evt: any) => {
    setSize(evt.target.value.length || _defaultValue.length);
    setValue(evt.target.value);
  };
  return (
    <div {...rest} className="input-box">
      {prefix != undefined && <span>{prefix}</span>}
      <input type={type ?? "text"} placeholder={_defaultValue} value={value} size={size} onChange={handleChange} />
      {value != _defaultValue && value != "" && (
        <div className="input-save-button" onClick={() => onSubmit(value)}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </div>
  );
};

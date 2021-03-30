import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./styles.css";

export const InputBox = ({
  id,
  prefix,
  placeholder,
  defaultValue,
  valueList,
  onSubmit,
  onChange,
  type,
  ...rest
}: any) => {
  let _defaultValue = defaultValue ?? "";
  const [value, setValue] = useState(_defaultValue);
  const [size, setSize] = useState(_defaultValue.length);
  const handleChange = (evt: any) => {
    setSize(evt.target.value.length || _defaultValue.length);
    setValue(evt.target.value);
  };
  return (
    <div {...rest} className="input-box">
      {type == "select" ? (
        <>
          <select
            name="select"
            id="select"
            className="input-select"
            value={defaultValue}
            defaultValue={defaultValue}
            onChange={evt => {
              onChange(evt.target.value);
              handleChange(evt);
            }}
          >
            {valueList &&
              valueList.map((value: string) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
          </select>
        </>
      ) : (
        <>
          {prefix != undefined && <span>{prefix}</span>}
          <input
            type={type ?? "text"}
            placeholder={_defaultValue}
            value={value}
            size={size}
            onChange={handleChange}
            id={id}
          />
          {value != _defaultValue && value != "" && (
            <div className="input-save-button" onClick={() => onSubmit(value)}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

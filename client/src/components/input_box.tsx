import React, { useState } from "react";
import "./styles.css";

export const InputBox = ({
  prefix,
  placeholder,
  defaultValue,
  ...rest
}: any) => {
  const [size, setSize] = useState(placeholder.length);
  const handleChange = (evt: any) => {
    setSize(evt.target.value.length || placeholder.length);
  };
  return (
    <div {...rest} className="input-box">
      {prefix != undefined && <span>{prefix}</span>}
      <input
        placeholder={placeholder}
        value={defaultValue}
        size={size}
        onChange={handleChange}
      />
    </div>
  );
};

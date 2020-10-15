import React from "react";

export const FormInput = ({
  label,
  prompt,
  prefix,
  placeholder,
  defaultValue,
  ...rest
}: any) => {
  return (
    <div {...rest} className="form-input">
      <div>
        <div>
          <span>{label}</span>
        </div>
        <div>
          <span>{prompt}</span>
        </div>
      </div>
      <div>
        <div>
          {prefix != undefined && <span>{prefix}</span>}
          <input placeholder={placeholder} value={defaultValue} />
        </div>
      </div>
    </div>
  );
};

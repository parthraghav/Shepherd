import React from "react";

export const FormButton = ({ label, prompt, hint }: any) => {
  return (
    <div>
      <div>
        <div>
          <span>{label}</span>
        </div>
        <div>
          <span>{prompt}</span>
        </div>
      </div>
      <div>{hint}</div>
    </div>
  );
};

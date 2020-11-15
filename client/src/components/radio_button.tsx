import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

export const RadioButton = ({ label, ...rest }: any) => {
  return (
    <div {...rest} className="styled-radio-button">
      <span>{label}</span>
    </div>
  );
};

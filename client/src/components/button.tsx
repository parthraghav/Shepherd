import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

export const Button = ({ label, icon, ...rest }: any) => {
  return (
    <div {...rest} className="styled-button">
      <span>{label}</span>
      <FontAwesomeIcon icon={icon ?? faArrowRight} />
    </div>
  );
};

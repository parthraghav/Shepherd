import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
export const VivianBox = ({
  icon,
  children,
  primaryColor,
  onCTAClick,
  ...rest
}: any) => {
  return (
    <div {...rest} className="vivian-box-wrapper">
      <div
        className="vivian-box-container"
        style={{
          background:
            primaryColor == 1 ? "var(--primary-1)" : "var(--primary-2)",
        }}
      >
        <div className="vivian-content-wrapper">{children}</div>
        <div
          className="vivian-iconic-button"
          onClick={onCTAClick}
          style={{
            background:
              primaryColor == 2 ? "var(--primary-1)" : "var(--primary-2)",
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "./screen.css";

const Screen = ({ children, className }: any) => {
  // pass window size as a prop
  return <div className={"screen " + className}>{children}</div>;
};

export default Screen;

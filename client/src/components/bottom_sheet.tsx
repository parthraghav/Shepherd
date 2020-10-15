import React from "react";

export const BottomSheet = ({
  children,
  close,
  primaryColor,
  ...rest
}: any) => {
  return (
    <div {...rest} className="bottom-sheet-container">
      <div
        className="bottom-sheet-background-overlay"
        onClick={() => close()}
      ></div>
      <div className="bottom-sheet" style={{ backgroundColor: primaryColor }}>
        {children}
      </div>
    </div>
  );
};

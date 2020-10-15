import React, { useEffect, useRef } from "react";
import { TweenMax, TimelineMax } from "gsap";

export const BottomSheet = ({
  children,
  close,
  primaryColor,
  ...rest
}: any) => {
  const overlayRef: any = useRef<HTMLDivElement>();
  const bottomSheetRef: any = useRef<HTMLDivElement>();

  const closeWithAnimate = () => {
    const timeline = new TimelineMax({ onComplete: () => close() });
    if (overlayRef.current != null) {
      timeline.to(
        overlayRef.current,
        {
          opacity: 0,
        },
        0
      );
    }
    if (bottomSheetRef.current != null) {
      timeline.to(
        bottomSheetRef.current,
        {
          transform: "translate(0,100%) scale(0.9)",
        },
        0
      );
    }
  };

  useEffect(() => {
    if (overlayRef.current != null) {
      overlayRef.current.style.display = "block";
      TweenMax.fromTo(
        overlayRef.current,
        0.1,
        {
          opacity: 0,
        },
        {
          opacity: 0.94,
        }
      );
    }
    if (bottomSheetRef.current != null) {
      bottomSheetRef.current.style.display = "block";
      TweenMax.fromTo(
        bottomSheetRef.current,
        0.3,
        {
          transform: "translate(0,100%) scale(0.9)",
        },
        {
          transform: "translate(0,0) scale(1)",
        }
      );
    }
  }, [TweenMax]);

  return (
    <div {...rest} className="bottom-sheet-container">
      <div
        ref={overlayRef}
        className="bottom-sheet-background-overlay"
        onClick={() => closeWithAnimate()}
        style={{ display: "none" }}
      ></div>
      <div
        ref={bottomSheetRef}
        className="bottom-sheet"
        style={{ backgroundColor: primaryColor, display: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

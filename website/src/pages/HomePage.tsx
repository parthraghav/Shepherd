import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HomePage.css";

const personBlobs = [
  "https://firebasestorage.googleapis.com/v0/b/income-share.appspot.com/o/website%2Fstatic%2FPerson-Blob-1.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/income-share.appspot.com/o/website%2Fstatic%2FPerson-Blob-2.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/income-share.appspot.com/o/website%2Fstatic%2FPerson-Blob-3.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/income-share.appspot.com/o/website%2Fstatic%2FPerson-Blob-4.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/income-share.appspot.com/o/website%2Fstatic%2FPerson-Blob-5.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/income-share.appspot.com/o/website%2Fstatic%2FPerson-Blob-6.png?alt=media",
];

const Page = () => {
  const blobsContainerRef: any = useRef<HTMLDivElement>();
  const blobSize = 100;
  const blobContainerWidth = (blobSize + 2 * 50) * personBlobs.length;
  useEffect(() => {
    let deltaX = blobContainerWidth;
    gsap.to(".blob-container", {
      duration: 5,
      ease: "none",
      x: "+=" + deltaX, //move each box 500px to right
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % deltaX), //force x value to be between 0 and 500 using modulus
      },
      repeat: -1,
    });
  }, [gsap]);
  return (
    <div className="web-bipage home-page-container">
      <div className="cta-alert">
        <b>Join 1000+ people now</b>
        <a>Go to App</a>
      </div>
      <div className="title-container">
        <h1>Shepherd App</h1>
        <span>Share your extra dollars weekly!</span>
      </div>
      <div className="wireframe-illustration">
        <img
          className="wireframe"
          src="https://firebasestorage.googleapis.com/v0/b/income-share.appspot.com/o/website%2Fstatic%2Fiphone-cropped-frame.png?alt=media"
        />
        <div ref={blobsContainerRef} className="blobs-container">
          {personBlobs.map((blobUrl, index) => (
            <img
              key={index}
              className="blob-container"
              src={blobUrl}
              width={blobSize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

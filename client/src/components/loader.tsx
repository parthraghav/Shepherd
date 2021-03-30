import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

export enum LoaderState {
  Uninitialized,
  Progress,
  Finished,
}

interface LoaderProps {
  state: LoaderState;
}

export const Loader = ({ state }: LoaderProps) => {
  return (
    <div className={"loader " + (state == LoaderState.Progress ? "animated-progress" : "finished")}>
      <FontAwesomeIcon icon={faCheck} />
    </div>
  );
};

import React, { useEffect, useRef } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
//@ts-ignore
import useScrollInfo from "react-element-scroll-hook";

import {
  AboutPagelet,
  BlockchainPagelet,
  DevelopPagelet,
  LegalPagelet,
} from "../pagelets";
import "./NavPage.css";

const NavBar = (props: any) => {
  const navBarRef: any = useRef<HTMLDivElement>();

  return (
    <div {...props} ref={navBarRef}>
      <div className="nav-bar-left">
        <NavLink to="/about" activeClassName="active-link">
          Who we are?
        </NavLink>
      </div>
      <div className="nav-bar-right">
        <NavLink to="/blockchain" activeClassName="active-link">
          Blockchain
        </NavLink>
        <NavLink to="/develop" activeClassName="active-link">
          Develop
        </NavLink>
        <NavLink to="/legal" activeClassName="active-link">
          Legal
        </NavLink>
      </div>
    </div>
  );
};

export const Page = () => {
  const [scrollInfo, scrollerRef] = useScrollInfo();

  return (
    <div className="web-bipage nav-page-container" ref={scrollerRef}>
      <NavBar
        className={"nav-bar " + (scrollInfo.y.value > 73 ? "floating" : "")}
      />
      <div className="pagelet-container">
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/about">
            <AboutPagelet />
          </Route>
          <Route path="/blockchain">
            <BlockchainPagelet />
          </Route>
          <Route path="/develop">
            <DevelopPagelet />
          </Route>
          <Route path="/legal">
            <LegalPagelet />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
export default Page;

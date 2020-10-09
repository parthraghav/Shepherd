import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import {
  AboutPagelet,
  BlockchainPagelet,
  DevelopPagelet,
  LegalPagelet,
} from "../pagelets";
import "./NavPage.css";

export const Page = () => {
  return (
    <div className="web-bipage nav-page-container">
      <div className="nav-bar">
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

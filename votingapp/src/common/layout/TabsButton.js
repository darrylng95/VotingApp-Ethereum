import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "@material-ui/core";

export default class TabsButton extends Component {
  render() {
    return (
      <div>
        <Tabs centered>
          <Tab
            label="Voter"
            style={{ color: "#ad1e22" }}
            component={Link}
            to="/voter"
          />
          <Tab
            label="Proposal"
            style={{ color: "#ad1e22" }}
            component={Link}
            to="/proposal"
          />
          <Tab
            label="Outcome"
            style={{ color: "#ad1e22" }}
            component={Link}
            to="/outcome"
          />
          <Tab
            label="Home"
            style={{ color: "#ad1e22" }}
            component={Link}
            to="/"
          />
        </Tabs>
      </div>
    );
  }
}

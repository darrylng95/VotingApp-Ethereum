import React, { Component } from "react";
import { If } from "rc-if-else";
// Component
import GetProposalModal from "./GetProposalModal";
import CreateProposal from "./CreateProposal";
import CheckProposalExpiry from "./CheckProposalExpiry";
import CalculateTotalVote from "./CalculateTotalVote";

import { Button, Divider, Grid } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

export default class Proposal extends Component {
  state = {
    createProposalFlag: false
  };
  render() {
    return (
      <div>
        <p align="center">
          <b>
            <u>Proposal Menus</u>
          </b>
        </p>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <CalculateTotalVote />
          </Grid>
          <Grid item xs={3}>
            <GetProposalModal />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                this.setState({ createProposalFlag: true });
              }}
            >
              Create Proposal
            </Button>
          </Grid>
          <Grid item xs={3}>
            <CheckProposalExpiry />
          </Grid>
        </Grid>
        <If condition={this.state.createProposalFlag}>
          <br />
          <br />
          <Divider />
          <CreateProposal />
          <MuiThemeProvider theme={theme}>
            <Grid container spacing={2}>
              <Grid item xs={0}>
                {" "}
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ createProposalFlag: false });
                  }}
                >
                  Hide
                </Button>
              </Grid>
            </Grid>
            <br />
            <br />
            <Divider />
          </MuiThemeProvider>
        </If>
      </div>
    );
  }
}
const theme = createMuiTheme({
  palette: {
    primary: purple
  },
  status: {
    danger: "orange"
  }
});

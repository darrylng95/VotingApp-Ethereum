import React, { Component } from "react";
import RegisterVote from "./RegisterVoter";
import CastVote from "./CastVote";
import { If } from "rc-if-else";

import { Button, Grid, Divider } from "@material-ui/core";
export default class Voter extends Component {
  state = {
    registervoteFlag: false,
    castvoteFlag: false
  };
  render() {
    return (
      <div>
        <p align="center"><b><u>Voter Menu</u></b></p>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            {" "}
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ registervoteFlag: true })}
            >
              Register Vote
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.setState({ castvoteFlag: true })}
            >
              Cast Vote
            </Button>
          </Grid>
        </Grid>
        <If condition={this.state.registervoteFlag}>
          <RegisterVote />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.setState({ registervoteFlag: false })}
          >
            HIDE
          </Button>
        </If>
        <If condition={this.state.castvoteFlag}>
          <CastVote />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.setState({ castvoteFlag: false })}
          >
            HIDE
          </Button>
        </If>
      </div>
    );
  }
}

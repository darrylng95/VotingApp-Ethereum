import React, { Component } from "react";
import {If} from 'rc-if-else'
// Contract Details
import { MyContract } from "../../contracts/ContractInstance";

import {
  Button,
  Box,
  TextField,
  CardHeader,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";

export default class GetOutcome extends Component {
  state = {
    ContractInstance: MyContract.at(
      "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
    ),
    proposalId: "",
    outcome:"",
    state:"",
    yesVote:"",
    noVote:"",
    submitState: false,

  };

  proposalIdHandler = event => {
    this.setState({ proposalId: event.target.value });
  };

  handleGetOutCome= () => {
    const { getOutcome } = this.state.ContractInstance;
    getOutcome.call(this.state.proposalId, (err, result) => {
      console.log("Checking expiry for proposal!");
      console.log(result);
      if (err) {
        alert("Something went wrong! Probably proposal expired!");
      } else {
        this.setState({
          outcome: result[0],
          state: result[1],
          yesVote: parseInt(result[2]),
          noVote: parseInt(result[3])
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Box py={2} px={6}>
          <Card align="center">
            <CardHeader
              title="Get Proposal Outcome"
            />
            <CardContent>
              <form>
                <TextField
                  label="Proposal Id"
                  type="number"
                  fullWidth
                  onChange={this.proposalIdHandler}
                  value={this.state.proposalId}
                  margin="normal"
                  variant="filled"
                />
                <br />
              </form>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.handleGetOutCome();
                  this.setState({submitState:true})
                }}
              >
                Submit
              </Button><br/><br/>
              <If condition = {this.state.submitState}>
              <Grid item xs={12}>
                    <Paper
                      style={{ backgroundColor: "#ffbb33" }}
                      align="center"
                    >
                      <Typography variant="body1" gutterBottom>
                        Outcome: {this.state.outcome}
                        <br />
                        State: {this.state.state}
                        <br />
                        Yes Vote(s): {this.state.yesVote}
                        <br />
                        No Vote(s): {this.state.noVote}
                      </Typography>
                    </Paper>
                  </Grid>
                  </If>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
}

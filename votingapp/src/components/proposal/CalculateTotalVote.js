import React, { Component } from "react";
import { MyContract } from "../../contracts/ContractInstance";
import { If } from "rc-if-else";
import { Button, TextField, Paper, Box } from "@material-ui/core";

export default class CalculateTotalVote extends Component {
  state = {
    ContractInstance: MyContract.at(
      "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
    ),
    proposalId: "",
    flag: false
  };
  proposalIdHandler = event => {
    this.setState({ proposalId: event.target.value });
  };
  handleCalculateTotalVote = () => {
    const { calculateTotalVotes } = this.state.ContractInstance;
    calculateTotalVotes(this.state.proposalId, (err, result) => {
      console.log("Calculating total votes that registered to proposal!");
      //console.log(result);
    });
  };
  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.setState({ flag: true })}
        >
          Calculate Total Vote
        </Button>
        <If condition={this.state.flag}>
          <br />
          <br />
          <Box height={150} width="100%">
            <TextField
              label="Proposal Id"
              type="number"
              fullWidth
              onChange={this.proposalIdHandler}
              value={this.state.proposalId}
              margin="normal"
              variant="filled"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleCalculateTotalVote()}
            >
              CALCULATE
            </Button>{" "}
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ flag: false })}
            >
              HIDE
            </Button>
          </Box>
        </If>
      </div>
    );
  }
}

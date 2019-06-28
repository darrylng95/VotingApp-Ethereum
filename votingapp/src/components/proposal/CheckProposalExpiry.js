import React, { Component } from "react";
import { MyContract } from "../../contracts/ContractInstance";
import { If } from "rc-if-else";
import { Button, TextField, Box } from "@material-ui/core";

export default class CheckProposalExpiry extends Component {
  state = {
    ContractInstance: MyContract.at(
      "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
    ),
    proposalId: "",
    checkExpiryFlag: false
  };

  handleCheckExpiry = pId => {
    const { checkExpiry } = this.state.ContractInstance;

    checkExpiry(pId, (err, result) => {
      console.log("Checking expiry for proposal!");
      //console.log(result);
    });
  };

  proposalIdHandler = event => {
    this.setState({ proposalId: event.target.value });
  };
  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.setState({ checkExpiryFlag: true })}
        >
          Check Expiry
        </Button>
        <If condition={this.state.checkExpiryFlag}>
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
              onClick={() => this.handleCheckExpiry(this.state.proposalId)}
            >
              CHECK
            </Button>{" "}
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ checkExpiryFlag: false })}
            >
              HIDE
            </Button>
          </Box>
        </If>
      </div>
    );
  }
}

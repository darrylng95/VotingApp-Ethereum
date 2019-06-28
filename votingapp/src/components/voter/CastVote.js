import React, { Component } from "react";
// Contract Details
import { MyContract } from "../../contracts/ContractInstance";

import {
  Button,
  Box,
  TextField,
  CardHeader,
  Card,
  CardContent
} from "@material-ui/core";

export default class CastVote extends Component {
  state = {
    ContractInstance: MyContract.at(
      "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
    ),
    votes: "",
    proposalId: "",
    userId: ""
  };
  onChangeVoteHandler = event => {
    this.setState({ votes: event.target.value });
  };

  onChangeProposalIdHandler = event => {
    this.setState({ proposalId: event.target.value });
  };

  onChangeUserIdHandler = event => {
    this.setState({ userId: event.target.value });
  };

  handleCastVote = () => {
    const { castVoteForProposal } = this.state.ContractInstance;
    castVoteForProposal(
      this.state.votes,
      this.state.userId,
      this.state.proposalId,
      (err, result) => {
        if (err) {
          alert(
            "Something went wrong! Perhaps voter casted votes already! Or Proposal is completed!"
          );
        }
        if (result) alert("Please wait for metamask confirmation!");
        console.log("Casting votes for proposal!");
        //console.log(result);
      }
    );
  };

  render() {
    return (
      <div>
        <Box py={2} px={6}>
          <Card align="center">
            <CardHeader title="Cast Vote" />
            <CardContent>
              <form>
                <TextField
                  label="User Id"
                  type="number"
                  fullWidth
                  onChange={this.onChangeUserIdHandler}
                  value={this.state.userId}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  label="Proposal Id"
                  type="number"
                  fullWidth
                  onChange={this.onChangeProposalIdHandler}
                  value={this.state.proposalId}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  label="Vote(s) to cast"
                  type="number"
                  fullWidth
                  onChange={this.onChangeVoteHandler}
                  value={this.state.votes}
                  margin="normal"
                  variant="filled"
                />
                <br />
              </form>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.handleCastVote();
                }}
              >
                Submit
              </Button>
              <br />
              <br />
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
}

import React, { Component } from "react";

import { MyContract } from "../../contracts/ContractInstance";

import {
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  Divider
} from "@material-ui/core";
import Popup from "reactjs-popup";
import { If} from "rc-if-else";

class GetProposalModal extends Component {
  state = {
    ContractInstance: MyContract.at(
      "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
    ),
    proposalId: "",
    proposalName: "",
    proposalDescription: "",
    proposalTotalVote: "",
    proposalState: "",
    getDetailsFlag: false
  };

  onProposalIdHandler = event => {
    this.setState({ proposalId: event.target.value });
  };

  onGetProposalDetails = () => {
    const { getProposalDetails } = this.state.ContractInstance;
    //const { proposalId: pId } = this.state;
    getProposalDetails.call(this.state.proposalId, (err, result) => {
      console.log("Getting Proposals");
      console.log(result);
      //let pTV = BigNumber(result[2]).toNumber();
      let totalVote = parseInt(result[2]);
      this.setState({
        proposalName: result[0],
        proposalDescription: result[1],
        proposalTotalVote: totalVote,
        proposalState: result[3]
      });
    });
  };
  render() {
    return (
      <div>
        <Popup
          width=""
          trigger={
            <Button variant="contained" color="primary">
              Get Proposal Details
            </Button>
          }
          modal
          contentStyle={contentStyle}
        >
          {close => (
            <React.Fragment>
              <TextField
                label="Proposal Id"
                placeholder="Proposal Id"
                type="number"
                onChange={this.onProposalIdHandler}
                value={this.state.proposalId}
                margin="normal"
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.onGetProposalDetails();
                  this.setState({ getDetailsFlag: true });
                }}
              >
                Get Details
              </Button>
              <br />
              <br />
              <Divider />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    fullWidth
                    rowsMax="4"
                    label="Querying ethAddress"
                    placeholder="Amount to order"
                    type="text"
                    margin="normal"
                    value={window.web3.eth.accounts[0]}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <If condition={this.state.getDetailsFlag}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Proposal Details</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper
                      style={{ backgroundColor: "#ffbb33" }}
                      align="center"
                    >
                      <Typography variant="body1" gutterBottom>
                        Name: {this.state.proposalName}
                        <br />
                        Description: {this.state.proposalDescription}
                        <br />
                        Total Votes Registered: {this.state.proposalTotalVote}
                        <br />
                        Current State: {this.state.proposalState}
                      </Typography>
                    </Paper>
                  </Grid>
                </If>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary">
                    OK
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log("modal closed ");
                      close();
                    }}
                  >
                    CLOSE
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Popup>
      </div>
    );
  }
}

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};
export default GetProposalModal;

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

export default class RegisterVoter extends Component {
  state = {
    ContractInstance: MyContract.at(
      "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
    ),
    shares: ""
  };

  onChangeSharesHandler = event => {
    this.setState({ shares: event.target.value });
  };

  //functions
  //register voters
  handleRegisterVoter = () => {
    const { registerVoters } = this.state.ContractInstance;

    registerVoters(
      this.state.shares,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.02, "ether")
      },
      (err, result) => {
        console.log("Registering voters!");
        //console.log(result);
        if (result) alert("Please wait for metmask confirmation!");
      }
    );
  };
  render() {
    return (
      <div>
        <Box py={2} px={6}>
          <Card align="center">
            <CardHeader title="Register Voter" />
            <CardContent>
              <form>
                <TextField
                  label="Voter Shares..."
                  type="number"
                  fullWidth
                  onChange={this.onChangeSharesHandler}
                  value={this.state.shares}
                  margin="normal"
                  variant="filled"
                />
                <br />
              </form>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.handleRegisterVoter();
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

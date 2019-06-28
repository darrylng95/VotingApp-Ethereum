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

export default class CreateProposal extends Component {
    state = {
        ContractInstance: MyContract.at(
            "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
          ),
        proposalName: "",
        proposalDescription: "",
        proposalQuorum: "",
        proposalTTL: "",
    }
    proposalNameHandler = event => {
        this.setState({ proposalName: event.target.value });
      };
      proposalDescriptionHandler = event => {
        this.setState({ proposalDescription: event.target.value });
      };
      proposalQuorumHandler = event => {
        this.setState({ proposalQuorum: event.target.value });
      };
      proposalTTLHandler = event => {
        this.setState({ proposalTTL: event.target.value });
      };

      handleCreateProposal= (name, description, quorum, ttl) => {
        const { createNewProposal } = this.state.ContractInstance;
    
        createNewProposal(
          name,
          description,
          quorum,
          ttl,
          {
            gas: 300000,
            from: window.web3.eth.accounts[0],
            value: window.web3.toWei(0.02, "ether")
          },
          (err, result) => {
            console.log("Creating new proposal!");
            //console.log(result);
            if(result) alert("Please wait for metamask confirmation!");
          }
        );
      }
  render() {
    return (
      <div>
        <Box py={2} px={6}>
          <Card align="center">
            <CardHeader
              title="Create Proposal"
              subheader="Fill in the form to create a Proposal"
            />
            <CardContent>
              <form>
                <TextField
                  label="Proposal Name"
                  type="name..."
                  fullWidth
                  onChange={this.proposalNameHandler}
                  value={this.state.proposalName}
                  margin="normal"
                  variant="filled"
                />
                <br />
                <TextField
                  label="Proposal Description"
                  type="text"
                  multiline
                  fullWidth
                  onChange={this.proposalDescriptionHandler}
                  value={this.state.proposalDescription}
                  margin="normal"
                  variant="filled"
                />
                 <br />
                <TextField
                  label="Proposal Quorum in %"
                  type="number"
                  fullWidth
                  onChange={this.proposalQuorumHandler}
                  value={this.state.proposalQuorumHandler}
                  margin="normal"
                  variant="filled"
                />
                 <br />
                <TextField
                  label="Proposal Time to live in seconds"
                  type="number"
                  fullWidth
                  onChange={this.proposalTTLHandler}
                  value={this.state.proposalTTL}
                  margin="normal"
                  variant="filled"
                />
              </form>
              <Button 
              variant="contained" 
              color="secondary"
              onClick = {()=> {
                this.handleCreateProposal(this.state.proposalName,this.state.proposalDescription,this.state.proposalQuorum,this.state.proposalTTL)
              }}
              >
                  Submit
              </Button>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
}

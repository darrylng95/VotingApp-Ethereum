import React, { Component } from "react";
import logo from "./logo.svg";
import { Grid, Paper, Button } from "@material-ui/core";
import "./App.css";
import BigNumber from "bignumber.js";
import { MyContract } from "../Contracts/ContractInstance";
/* Phase 2 -- Setting Up and Interacting with React */
class App extends Component {
  constructor(props) {
    super(props);

    /* Phase 2 */

    this.state = {
      /* Phase 2 */
      /* Edit this with each iteration of Smart Contract */
      /* Note: this adress is a placeholder and will not work */
      ContractInstance: MyContract.at(
        "0xbcae574d3386cd940649248e057cbcc2e4944502"
      ),
      /* Phase 3 -- Smart Contract Manipulation */
      contractState: "",
      numVotes: "",
      userId: "",
      proposalId: "",
      shares: "",
      proposalName: "",
      proposalDescription: "",
      proposalQuorum: "",
      proposalTTL: "",
      outcome: "",
      state: "",
      yesVote: "",
      noVote: "",
      currentPname: "",
      currentPdes: "",
      pTotalVotes: "",
      pState: ""
    };

    /* Phase 2 */
    this.querySecret = this.querySecret.bind(this);

    /* Phase 3 */
    this.handleContractStringSubmit = this.handleContractStringSubmit.bind(
      this
    );
    this.handleRegisterVoter = this.handleRegisterVoter.bind(this);
    this.handleCreateProposal = this.handleCreateProposal.bind(this);
    this.handleCalculateTotalVote = this.handleCalculateTotalVote.bind(this);
    this.handleCheckExpiry = this.handleCheckExpiry.bind(this);
    this.handleCastVote = this.handleCastVote.bind(this);
    this.handleGetOutCome = this.handleGetOutCome.bind(this);
    this.getProposalDetails = this.getProposalDetails.bind(this);
  }

  /* Phase 2 */
  querySecret() {
    const { getSecret } = this.state.ContractInstance;

    getSecret((err, secret) => {
      if (err) console.error("An error occured::::", err);
      console.log("This is our contract's secret::::", secret);
      this.setState({ contractState: secret });
    });
  }

  /* Phase 3 */
  handleContractStringSubmit(event) {
    event.preventDefault();

    const { setValue } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setValue(
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, "ether")
      },
      (err, result) => {
        console.log("Smart contract string is changing.");
      }
    );
  }

  //functions
  //register voters
  handleRegisterVoter(event) {
    event.preventDefault();
    const { registerVoters } = this.state.ContractInstance;

    const { shares: newShares } = this.state;
    registerVoters(
      newShares,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.02, "ether")
      },
      (err, result) => {
        console.log("Registering voters!");
        //console.log(result);
      }
    );
  }

  handleCreateProposal(event) {
    event.preventDefault();
    const { createNewProposal } = this.state.ContractInstance;
    const {
      proposalName: pName,
      proposalDescription: pDes,
      proposalQuorum: pQuorum,
      proposalTTL: pTTL
    } = this.state;

    createNewProposal(
      pName,
      pDes,
      pQuorum,
      pTTL,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.02, "ether")
      },
      (err, result) => {
        console.log("Creating new proposal!");
        //console.log(result);
      }
    );
  }

  handleCalculateTotalVote(event) {
    event.preventDefault();
    const { calculateTotalVotes } = this.state.ContractInstance;
    const { proposalId: pId } = this.state;

    calculateTotalVotes(pId, (err, result) => {
      console.log("Calculating total votes that registered to proposal!");
      //console.log(result);
    });
  }

  handleCastVote(event) {
    event.preventDefault();
    const { castVoteForProposal } = this.state.ContractInstance;
    const { numVotes: numVotes, userId: uId, proposalId: pid } = this.state;
    castVoteForProposal(numVotes, uId, pid, (err, result) => {
      if (err) {
        alert(
          "Something went wrong! Perhaps voter casted votes already! Or Proposal is completed!"
        );
      }
      console.log("Casting votes for proposal!");
      //console.log(result);
    });
  }

  handleCheckExpiry(event) {
    event.preventDefault();
    const { checkExpiry } = this.state.ContractInstance;
    const { proposalId: pId } = this.state;

    checkExpiry(pId, (err, result) => {
      console.log("Checking expiry for proposal!");
      //console.log(result);
    });
  }

  handleGetOutCome(event) {
    event.preventDefault();
    const { getOutcome } = this.state.ContractInstance;
    const { proposalId: pId } = this.state;
    getOutcome.call(pId, (err, result) => {
      console.log("Checking expiry for proposal!");
      console.log(result);
      if (err) {
        alert("Something went wrong! Probably proposal expired!");
      } else {
        let bignum1 = BigNumber(result[2]).toNumber();
        let bignum2 = BigNumber(result[3]).toNumber();
        this.setState({
          outcome: result[0],
          state: result[1],
          yesVote: bignum1,
          noVote: bignum2
        });
      }
    });
  }

  getProposalDetails(event) {
    event.preventDefault();
    const { getProposalDetails } = this.state.ContractInstance;
    const { proposalId: pId } = this.state;
    getProposalDetails.call(pId, (err, result) => {
      console.log("Getting Proposals");
      console.log(result);
      let pTV = BigNumber(result[2]).toNumber();
      this.setState({
        currentPname: result[0],
        currentPdes: result[1],
        pTotalVotes: pTV,
        pState: result[3]
      });
    });
  }

  querySecretMsg() {
    const { getSecretMsg } = this.state.ContractInstance;

    getSecretMsg.call((err, secret) => {
      if (err) console.error("An error occured::::", err);
      console.log("This is our contract's secret::::", secret);
    });
  }

  render() {
    this.querySecretMsg();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> React & Ethereum Voting Application </h1>
          <p>Your account: {window.web3.eth.accounts[0]} </p>
        </header>

        {/* Phase 2 */}
        <br />

        <Grid container spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Paper style={{ border: "1px solid black" }}>
              <h3>Get Proposal Details </h3>
              <form onSubmit={this.getProposalDetails}>
                <input
                  type="number"
                  name="string-change"
                  placeholder="Enter proposal id..."
                  value={this.state.proposalId}
                  onChange={event =>
                    this.setState({ proposalId: event.target.value })
                  }
                />
                <br />
                <button
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "black",
                    color: "white"
                  }}
                  type="submit"
                >
                  {" "}
                  Query Proposal{" "}
                </button>
                <br />
                <p>Proposal Name: {this.state.currentPname} </p>
                <p>Proposal Description: {this.state.currentPdes} </p>
                <p>
                  Proposal Total Votes Registered: {this.state.pTotalVotes}{" "}
                </p>
                <p>Proposal Current State: {this.state.pState} </p>
              </form>
            </Paper>
          </Grid>
        </Grid>
        {/* register voter */}
        <br />

        <Grid container spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Paper style={{ border: "1px solid blue" }}>
              <h2>Register Voter </h2>
              <form onSubmit={this.handleRegisterVoter}>
                <input
                  type="number"
                  name="register-voter"
                  placeholder="Enter voter shares..."
                  value={this.state.shares}
                  onChange={event =>
                    this.setState({ shares: event.target.value })
                  }
                />

                <br />
                <button
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "blue",
                    color: "white"
                  }}
                  type="submit"
                >
                  {" "}
                  Register Voter{" "}
                </button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Paper style={{ border: "1px solid black" }}>
              <br />
              <h2>Create Proposal </h2>
              <form onSubmit={this.handleCreateProposal}>
                <input
                  type="text"
                  name="proposal-name"
                  placeholder="Enter proposal name..."
                  value={this.state.proposalName}
                  onChange={event =>
                    this.setState({ proposalName: event.target.value })
                  }
                />
                <br />
                <input
                  type="text"
                  name="proposal-description"
                  placeholder="Enter proposal description..."
                  value={this.state.proposalDescription}
                  onChange={event =>
                    this.setState({ proposalDescription: event.target.value })
                  }
                />
                <br />
                <input
                  type="number"
                  name="proposal-quorum"
                  placeholder="Enter proposal quroum..."
                  value={this.state.proposalQuorum}
                  onChange={event =>
                    this.setState({ proposalQuorum: event.target.value })
                  }
                />
                <br />
                <input
                  type="number"
                  name="proposal-ttl"
                  placeholder="Enter proposal ttl..."
                  value={this.state.proposalTTL}
                  onChange={event =>
                    this.setState({ proposalTTL: event.target.value })
                  }
                />
                <br />
                <button
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "black",
                    color: "white"
                  }}
                  type="submit"
                >
                  {" "}
                  Create new Proposal{" "}
                </button>
              </form>
              <p>
                {" "}
                <br />{" "}
              </p>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Paper style={{ border: "1px solid blue" }}>
              <br />
              <h2>Calculate total vote </h2>
              <form onSubmit={this.handleCalculateTotalVote}>
                <input
                  type="number"
                  name="calculate votes registered to proposal"
                  placeholder="Enter proposal id..."
                  value={this.state.proposalId}
                  onChange={event =>
                    this.setState({ proposalId: event.target.value })
                  }
                />
                <br />
                <button
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "blue",
                    color: "white"
                  }}
                  type="submit"
                >
                  {" "}
                  Calculate votes registered to propose{" "}
                </button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Paper style={{ border: "1px solid black" }}>
              <br />
              <h2>Cast vote </h2>
              <form onSubmit={this.handleCastVote}>
                <input
                  type="number"
                  name="Cast-votes"
                  placeholder="Enter votes to cast..."
                  value={this.state.numVotes}
                  onChange={event =>
                    this.setState({ numVotes: event.target.value })
                  }
                />
                <br />
                <input
                  type="number"
                  name="Cast-votes-pId"
                  placeholder="Enter proposal id to cast votes..."
                  value={this.state.proposalId}
                  onChange={event =>
                    this.setState({ proposalId: event.target.value })
                  }
                />
                <br />
                <input
                  type="number"
                  name="Cast-votes-uId"
                  placeholder="Enter user id to cast..."
                  value={this.state.userId}
                  onChange={event =>
                    this.setState({ userId: event.target.value })
                  }
                />
                <br />
                <button
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "black",
                    color: "white"
                  }}
                  type="submit"
                >
                  {" "}
                  Cast Vote for proposal{" "}
                </button>
              </form>
              <p>
                {" "}
                <br />{" "}
              </p>
            </Paper>
          </Grid>
        </Grid>

        <br />
        <Grid container spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Paper style={{ border: "1px solid blue" }}>
              <h2>Check proposal expiry </h2>
              <p>Please check expiry for proposal before getting outcome!! </p>
              <form onSubmit={this.handleCheckExpiry}>
                <input
                  type="number"
                  name="Checking expiry date"
                  placeholder="Enter proposal id..."
                  value={this.state.proposalId}
                  onChange={event =>
                    this.setState({ proposalId: event.target.value })
                  }
                />
                <br />
                <button
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "blue",
                    color: "white"
                  }}
                  id="expiry"
                  type="submit"
                >
                  {" "}
                  Check Expiry{" "}
                </button>
              </form>
              <br />
            </Paper>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Paper style={{ border: "1px solid black" }}>
                <h2>Get Proposal Outcome </h2>
                <form onSubmit={this.handleGetOutCome}>
                  <input
                    type="number"
                    name="Get Outcome for proposal"
                    placeholder="Enter proposal id..."
                    value={this.state.proposalId}
                    onChange={event =>
                      this.setState({ proposalId: event.target.value })
                    }
                  />
                  <br />
                  <button
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "black",
                      color: "white"
                    }}
                    type="submit"
                  >
                    Get Outcome for proposal{" "}
                  </button>
                </form>
                <br />
                <p>Outcome is: {this.state.outcome} </p>
                <p>State is: {this.state.state} </p>

                <p>Yes Votes is: {this.state.yesVote} </p>
                <p>No Votes: {this.state.noVote} </p>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;

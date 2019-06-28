import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { MyContract } from "../contracts/ContractInstance";
//Component
import Home from "../components/Home";
import Voter from "../components/voter/Voter";
import Proposal from "../components/proposal/Proposal";
import Outcome from "../components/outcome/Outcome";
// layout
import Navbar from "../common/layout/navbar";

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
        "0x70e04a748f434708d946dd6fe9ba60d2523f3833"
      ),
      /* Phase 3 -- Smart Contract Manipulation */
      contractState: "",
  
    };

    /* Phase 2 */
    this.querySecret = this.querySecret.bind(this);

    /* Phase 3 */
    this.handleContractStringSubmit = this.handleContractStringSubmit.bind(
      this
    );
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
      <div style = {{ minHeight:"100vh", backgroundColor:"#A9A9A9"}}>
        <BrowserRouter>
          <Navbar />
          <p align="center" style={{color:"#800080"}}>Your account: {window.web3.eth.accounts[0]} </p>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/voter" component={Voter} />
            <Route exact path="/proposal" component={Proposal} />
            <Route exact path="/outcome" component={Outcome} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

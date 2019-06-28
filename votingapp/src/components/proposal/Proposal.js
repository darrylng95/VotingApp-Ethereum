import React, { Component } from 'react';
import {If, Else} from 'rc-if-else'
// Component
import GetProposalModal from './GetProposalModal';
import CreateProposal from './CreateProposal';

import { Button } from '@material-ui/core';

export default class Proposal extends Component {
state = {
    createProposalFlag:false,
}
    render() {

        return (
            <div>
                <GetProposalModal/>
                <br/>
                <Button variant= "contained" color="secondary"  onClick =  { () =>{this.setState({createProposalFlag:true})}}>
                    Create Proposal
                </Button>
                <If condition = {this.state.createProposalFlag}>
                <CreateProposal/>
                </If>
            </div>
        )
    }
}

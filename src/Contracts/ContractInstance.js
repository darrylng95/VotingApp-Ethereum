 /* Edit this with each iteration of Smart Contract */
    /* Note: this ABI is a placeholder and will not work */
export  const MyContract = window.web3.eth.contract([
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "proposals",
			"outputs": [
				{
					"name": "totalVotes",
					"type": "uint256"
				},
				{
					"name": "quorum",
					"type": "uint256"
				},
				{
					"name": "yesVotes",
					"type": "uint256"
				},
				{
					"name": "noVotes",
					"type": "uint256"
				},
				{
					"name": "state",
					"type": "uint8"
				},
				{
					"name": "outcome",
					"type": "uint8"
				},
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "description",
					"type": "string"
				},
				{
					"name": "owner",
					"type": "address"
				},
				{
					"name": "TTL",
					"type": "uint256"
				},
				{
					"name": "usedByDate",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "description",
					"type": "string"
				},
				{
					"name": "quorum",
					"type": "uint8"
				},
				{
					"name": "TTL",
					"type": "uint256"
				}
			],
			"name": "createNewProposal",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "getSecretMsg",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "proposalId",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "pId",
					"type": "uint256"
				}
			],
			"name": "getProposalDetails",
			"outputs": [
				{
					"name": "pName",
					"type": "string"
				},
				{
					"name": "pDes",
					"type": "string"
				},
				{
					"name": "pTotlalVotes",
					"type": "uint256"
				},
				{
					"name": "pState",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "numVoters",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newInt",
					"type": "uint256"
				}
			],
			"name": "setValue",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "secretMsg",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "getSecret",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "pId",
					"type": "uint256"
				}
			],
			"name": "calculateTotalVotes",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "shares",
					"type": "uint8"
				}
			],
			"name": "registerVoters",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "uncastedVotes",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "vote",
					"type": "uint8"
				},
				{
					"name": "userId",
					"type": "uint256"
				},
				{
					"name": "pId",
					"type": "uint256"
				}
			],
			"name": "castVoteForProposal",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newMsg",
					"type": "string"
				}
			],
			"name": "setMsg",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "pId",
					"type": "uint256"
				}
			],
			"name": "getOutcome",
			"outputs": [
				{
					"name": "pOutcome",
					"type": "string"
				},
				{
					"name": "pState",
					"type": "string"
				},
				{
					"name": "yesVotes",
					"type": "uint256"
				},
				{
					"name": "noVotes",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "secret",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "voters",
			"outputs": [
				{
					"name": "voterAddress",
					"type": "address"
				},
				{
					"name": "shares",
					"type": "uint256"
				},
				{
					"name": "voted",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "pId",
					"type": "uint256"
				}
			],
			"name": "checkExpiry",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "pId",
					"type": "uint256"
				}
			],
			"name": "abort",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]) 
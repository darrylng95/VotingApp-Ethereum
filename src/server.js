const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const Web3 = require("web3");
const Tx = require('ethereumjs-tx');
//Contract information
const abi = JSON.parse(fs.readFileSync('./Contracts/VotingApp.json').toString());
var contractAddress = '0xbcae574d3386cd940649248e057cbcc2e4944502';

const app = express();
app.use(bodyParser.json());

web3 = new Web3(new Web3.providers.HttpProvider('ropsten.infura.io/v3/6d9f801302c849ebaa87677677e215e2'));
web3.eth.net.getNetworkType(function(err, res){
      console.log("Network Type: "+res);
});
const myContract =web3.eth.Contract(abi, contractAddress);


app.get('/api/abi',(req,res) =>{
    res.send(abi);
})

app.get('/api/getsecretmsg', (req,res) => {
    console.log('api/getsecretmg');
    myContract.methods.getSecretMsg.call()
    .then(response => {
        res.send(response);
    }).catch(error => {
        res.send(error);
    })
})

const port = process.env.PORT || 8001

app.listen(port, ()=> console.log(`Server listening on port ${port}`));
const fs = require('fs');
const contractFile = JSON.parse(fs.readFileSync('../solidity/build/contracts/Tufa.json', 'utf8'));
const contractFileRegis = JSON.parse(fs.readFileSync('../solidity/build/contracts/Registration.json', 'utf8'));

const networks = contractFile.networks;
const network2 = contractFileRegis.networks;

exports.contractAddress = networks[Object.keys(networks)[0]].address; 
exports.AddressRegistration = network2[Object.keys(networks)[0]].address;

exports.contractABI = contractFile.abi;
exports.ABIRegistration = contractFileRegis.abi;
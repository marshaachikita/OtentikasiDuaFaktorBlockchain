const contractAddress = '0x40698624f889ba35274a94d429f583cef2d948b5';

const AddressRegistration = '0x7f8ed72e522ef58192c05196d745d8b58d161c2a';

const contractABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "authenticationToken",
        "type": "uint256"
      }
    ],
    "name": "authenticate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "prover",
        "type": "address"
      }
    ],
    "name": "getAuthenticationToken",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

const ABIRegistration = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "userData",
    "outputs": [
      {
        "name": "userEmail",
        "type": "bytes32"
      },
      {
        "name": "userPassword",
        "type": "bytes32"
      },
      {
        "name": "userEthAddr",
        "type": "address"
      },
      {
        "name": "userRole",
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
        "name": "hash_email",
        "type": "bytes32"
      },
      {
        "name": "hash_pass",
        "type": "bytes32"
      },
      {
        "name": "hash_ethAddr",
        "type": "address"
      },
      {
        "name": "role",
        "type": "uint256"
      }
    ],
    "name": "addUserData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "email",
        "type": "bytes32"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
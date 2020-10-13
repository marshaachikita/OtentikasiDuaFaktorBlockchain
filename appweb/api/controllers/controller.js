'use strict';

module.exports = (web3) => {
  var tufa = require('../models/tufa')(web3);
  const crypto = require('crypto');
  const AddressRegistration = '0x7f8ed72e522ef58192c05196d745d8b58d161c2a';
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
  const regisContract = web3.eth.contract(ABIRegistration).at(AddressRegistration);
  const addressSuperAdmin = "0x26E4255c3b46a3deD54DA50BC3d4213e91Bc238e";
  const addressAdmin = "0x8Dab0Bd9E82975474544893a9362e246ae8625EC";
  const addressStaff = "0x27ad543DaEC63a4822ADf4B49c0cA321670A0D8B";

  const regisAdmin = (req, res) => {  
  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pass_pattern=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(!req.body.email){
      res.status(401).send({ error: 'Email tidak boleh kosong' })
    }else if(!req.body.email.match(mailformat)){
      res.status(401).send({ error: 'Masukkan email dengan benar' })
    }

    if(!req.body.password){
      res.status(401).send({ error: 'Password tidak boleh kosong' })
    }else if(req.body.password.length < 8){
      res.status(401).send({ error: 'Password minimal 8 karakter' })
    }else if(!req.body.password.match(pass_pattern)){
      res.status(401).send({ error: 'Password harus berisi angka, upper case, dan simbol' })
    }

    const email_hash = "0x" + crypto.createHash('SHA256').update(req.body.email).digest('HEX');
    const pass_hash = "0x" + crypto.createHash('SHA256').update(req.body.password).digest('HEX');
    const role = 2;
    
    web3.eth.getAccounts((error, result) => {  
      const akun = result[0];  
      regisContract.getData.call(email_hash, (error, result) => { 
        console.log(result[0])
        console.log(result[1])
        console.log(result[2])
        console.log(parseInt(result[3]))
        if(result[0].toString() === email_hash.toString()) {
          res.status(401).send({ message : 'Email sudah terdaftar. Gunakan email lain'})
        }
        else {
          regisContract.addUserData(email_hash, pass_hash, addressAdmin, role, {
            from: akun,
            gas: 300000
          });
          res.json({
            status: 'OK'            
          });        
        }
      });
    });
    
  };

  const regisStaff = (req, res) => {  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pass_pattern=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(!req.body.email){
      res.status(401).send({ error: 'Email tidak boleh kosong' })
    }else if(!req.body.email.match(mailformat)){
      res.status(401).send({ error: 'Masukkan email dengan benar' })
    }

    if(!req.body.password){
      res.status(401).send({ error: 'Password tidak boleh kosong' })
    }else if(req.body.password.length < 8){
      res.status(401).send({ error: 'Password minimal 8 karakter' })
    }else if(!req.body.password.match(pass_pattern)){
      res.status(401).send({ error: 'Password harus berisi angka, upper case, dan simbol' })
    }

    if(!req.body.role){
      res.status(401).send({ error: 'Jabatan harus dipilih' })
    }else if(req.body.role == "0"){
      res.status(401).send({ error: 'Pilih jabatan dengan benar' })
    }

    const email_hash = "0x" + crypto.createHash('SHA256').update(req.body.email).digest('HEX');
    const pass_hash = "0x" + crypto.createHash('SHA256').update(req.body.password).digest('HEX');
    
    web3.eth.getAccounts((error, result) => {  
      const akun = result[0];  
      regisContract.getData.call(email_hash, (error, result) => { 
        console.log(result[0])
        console.log(result[1])
        console.log(result[2])
        console.log(parseInt(result[3]))
        if(result[0].toString() === email_hash.toString()) {
          res.status(401).send({ message : 'Email sudah terdaftar. Gunakan email lain'})
        }
        else {
          regisContract.addUserData(email_hash, pass_hash, addressStaff, req.body.role, {
            from: akun,
            gas: 300000
          });
          res.json({
            status: 'OK'            
          });        
        }
      });
    });
  };

  const regisSuperAdmin = (req, res) => {  
  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pass_pattern=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(!req.body.email){
      res.status(401).send({ error: 'Email tidak boleh kosong' })
    }else if(!req.body.email.match(mailformat)){
      res.status(401).send({ error: 'Masukkan email dengan benar' })
    }

    if(!req.body.password){
      res.status(401).send({ error: 'Password tidak boleh kosong' })
    }else if(req.body.password.length < 8){
      res.status(401).send({ error: 'Password minimal 8 karakter' })
    }else if(!req.body.password.match(pass_pattern)){
      res.status(401).send({ error: 'Password harus berisi angka, upper case, dan simbol' })
    }

    const email_hash = "0x" + crypto.createHash('SHA256').update(req.body.email).digest('HEX');
    const pass_hash = "0x" + crypto.createHash('SHA256').update(req.body.password).digest('HEX');
    const role = 1;
    
    console.log(email_hash)
    console.log(pass_hash)
    console.log(address)
    console.log(role)
    web3.eth.getAccounts((error, result) => {  
      const akun = result[0];  
      regisContract.getData.call(email_hash, (error, result) => { 
        console.log(result[0])
        console.log(result[1])
        console.log(result[2])
        console.log(parseInt(result[3]))
        if(result[0].toString() === email_hash.toString()) {
          res.status(401).send({ message : 'Email sudah terdaftar. Gunakan email lain'})
        }
        else {
          regisContract.addUserData(email_hash, pass_hash, addressSuperAdmin, role, {
            from: akun,
            gas: 300000
          });
          res.json({
            status: 'OK'            
          });        
        }
      });
    });    
  };

  class SessionUser {
    constructor(user){
      this.email = user.email;
      this.address = user.address;
      this.role = user.role;
      this.token = user.token;
      this.tokenVerification = false;
    }
  }

  const nextToken = (previous) => {
    const min = 1;
    //it will provide big and save integer for JS
    const max = Math.pow(10, 15);
    function getRandomInt() {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    let newToken = getRandomInt();
    while(previous == newToken) {
      newToken = getRandomInt();
    }
    return newToken;
  }


  const login = (req, res) => {
  
    const email_hash = "0x" + crypto.createHash('SHA256').update(req.body.email).digest('HEX');
    const pass_hash = "0x" + crypto.createHash('SHA256').update(req.body.password).digest('HEX');
    // console.log("Email hash: " + email_hash)
    // console.log("Password hash: " + pass_hash)
    // console.log("Checking email on blockchain...")

    if(req.body.email == "admin@admin.com" && req.body.password == "superAdm1n"){
      const user = {
        "email" : req.body.email,
        "password" : req.body.password,
        "address" : addressSuperAdmin,
        "role" : 1,
      }
      user.token = nextToken(user.token);
      req.session.user = new SessionUser(user, tufa.account);
      console.log(req.session.user)
      res.json({
        status: 'OK',
        user: req.session.user
      });
    }else{
      regisContract.getData.call(email_hash, (error, result) => {
        const b_email = result[0];
        const b_pass = result[1];
        // console.log("Email is registered on blockchain with:")
        // console.log("Email hash\t\t: " + result[0])
        // console.log("Password hash\t\t: " + result[1])
        // console.log("Ethereum address\t: " + result[2])
  
        
        if(b_email.toString() === email_hash.toString() && b_pass.toString() === pass_hash.toString() ) {
          // console.log("Email and password match!")
          const user = {
            "email" : result[0],
            "password" : result[1],
            "address" : result[2],
            "role" : parseInt(result[3])
          }
          // console.log(user)
          user.token = nextToken(user.token);
          // console.log(user.token)
          req.session.user = new SessionUser(user, tufa.account);
          console.log(req.session.user)
          res.json({
            status: 'OK',
            user: req.session.user
          });
        }else{
          res.status(401).send({ error: 'Email dan password tidak sesuai!' })
          console.log("Email dan Password Tidak Sesuai")
        }
      });
    }

    
  };

  const getUser = (req, res) => {
    if (req.session.user) {
      res.json({
        status: 'OK',
        user: req.session.user
      });
    } else {
      res.status(404).send();
    }    
  }; 

  const verify = (req, res) => {
    // console.log(req.body);
    // console.log("Session user: " + req.session.user);
    // console.log("Session user token verfication: " + req.session.user.tokenVerification);
    // console.log("Checking token...")

    const user = req.session.user;
    tufa.getAuthenticationToken(user.address).then(token => {      
      if (token.toString() === user.token.toString()) {
        req.session.user.tokenVerification = true;
        res.json({
          status: 'OK'
        });
        // console.log("Login success! User ETH address : " + user.address)
      } else {
        res.status(401).send({ error : 'Token tidak cocok!'})
      }
    }).catch(e => {
      res.status(500).send();
    });
  };

  const logout = (req, res) => {
    delete req.session.user;
    res.json({
      status: 'OK'
    });
  };

  return {
    regisAdmin: regisAdmin,
    regisSuperAdmin: regisSuperAdmin,
    regisStaff: regisStaff,
    verify: verify,
    login: login,
    logout: logout,
    getUser: getUser
  }; 
};

module.exports = function (web3) {

    const contract = require('./contract');
  
    const regisContract = web3.eth.contract(contract.ABIRegistration).at(contract.AddressRegistration);
    const registrasi = {};
    web3.eth.getAccounts((error, result) => {
      registrasi.account = result[0]
      // console.log("ETH Address Server : " + registrasi.account);
    });
  
    const callback = (resolve, reject) => {
      return (e, r) => {
        if (e) {
          reject(e);
        } else {
          resolve(r);
        }
      }
    };

    // this.addDataRegis = (email, pass, ethAddr) => {
    //   regisContract.addUserData(email, pass, ethAddr).send({
    //     from: registrasi.account
    //   }, callback(resolve, reject));
    // }

    function addDataRegis(email, pass, ethAddr){
      regisContract.methods.addUserData(email, pass, ethAddr).send({
        from: registrasi.account
      });
    };

    registrasi.getEmail = prover => new Promise((resolve, reject) => {
        if (!registrasi.account || !prover) {
            reject("Problem with accounts...");
        } else {
            try {
              // console.log("ETH Address User yang Login Web : " + prover);
              regisContract.getEmail.call(prover, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            } catch (e) {
              reject(e);
            }
        }
    })

    registrasi.getPassword = prover => new Promise((resolve, reject) => {
        if (!registrasi.account || !prover) {
            reject("Problem with accounts...");
        } else {
            try {
              // console.log("ETH Address User yang Login Web : " + prover);
              regisContract.getPassword.call(prover, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            } catch (e) {
              reject(e);
            }
        }
    })

    registrasi.getEthAddr = prover => new Promise((resolve, reject) => {
        if (!registrasi.account || !prover) {
            reject("Problem with accounts...");
        } else {
            try {
              // console.log("ETH Address User yang Login Web : " + prover);
              regisContract.getEthAddr.call(prover, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            } catch (e) {
              reject(e);
            }
        }
    })

    return registrasi;
  };
  
module.exports = function (web3) {

    const contract = require('./contract');
  
    const tufaContract = web3.eth.contract(contract.contractABI).at(contract.contractAddress);
    const tufa = {};
    web3.eth.getAccounts((error, result) => {
      tufa.account = result[0]
      console.log("ETH Address Server : " + tufa.account);
    });
  
    tufa.getAuthenticationToken = prover => new Promise((resolve, reject) => {
      if (!tufa.account || !prover) {
        reject("Problem with accounts...");
      } else {
        try {
          // console.log("ETH Address User yang Login Web : " + prover);
          tufaContract.getAuthenticationToken.call(prover, (error, result) => {
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
    });
  
    return tufa;
  };
  
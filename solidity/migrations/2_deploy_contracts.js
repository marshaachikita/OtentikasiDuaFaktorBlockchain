var Tufa = artifacts.require("./Tufa.sol");
var Registration = artifacts.require("./Registration.sol")

module.exports = function (deployer) {
  deployer.deploy(Tufa);
  deployer.deploy(Registration);
};

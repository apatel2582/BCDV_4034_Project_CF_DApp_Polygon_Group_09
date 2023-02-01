require ("@nomicfoundation/hardhat-toolbox");
// import 'dotenv/config';
require('dotenv').config({ path: './.env' });
const privateKey = process.env.PUBLIC_PRIVATE_KEY

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "polygon",
  networks: {
    // hardhat: {},
    polygon: {
      url: process.env.ALCHEMY_URL,
      accounts: [privateKey]
    }
  }
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/7d00bf84530c4264969a4f0f231de8b6`,
      accounts: [``]
    }
  }
};

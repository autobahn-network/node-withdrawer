const { CrossChainMessenger, StandardBridgeAdapter } = require("@autobahn-network/sdk");
const { contracts } = require('../contracts');

const getCrossChainMessenger = (l1Signer, l2Signer, startBlock) => {
  return new CrossChainMessenger({
    l1ChainId: 56,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Signer,
    startBlock,
    contracts,
    bridges: {
      standard: {
        Adapter: StandardBridgeAdapter,
        l1Bridge: contracts.l1.L1StandardBridge,
        l2Bridge: contracts.l2.L2StandardBridge,
      }
    },
  });
}

module.exports = {
  getCrossChainMessenger,
}

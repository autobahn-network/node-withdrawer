const { L1_BLOCK_TIME } = require("./constants");

const getL1BlockNumberForTx = async (l1Provider, l2Provider, hash) => {
  const l2Tx = await l2Provider.getTransaction(hash);
  const l2Block = await l2Provider.getBlock(l2Tx.blockHash);
  const latestL1Block = await l1Provider.getBlock('latest');
  const secondsBetweenBlocks = latestL1Block.timestamp - l2Block.timestamp;
  const secondsInL1Blocks = Math.round(secondsBetweenBlocks / L1_BLOCK_TIME * 1.1); // apply 10% on top to make sure it's included
  return latestL1Block.number - secondsInL1Blocks;
}

module.exports = { getL1BlockNumberForTx }

const { getCrossChainMessenger, getSigners, getL1BlockNumberForTx } = require('./shared');

const checkWithdrawal = async(hash) => {
  const [l1Signer, l2Signer] = getSigners();
  const l1BlockNumberForTx = await getL1BlockNumberForTx(l1Signer.provider, l2Signer.provider, hash)
  const crossChainMessenger = getCrossChainMessenger(l1Signer, l2Signer, l1BlockNumberForTx);
  const waitTime = await crossChainMessenger.estimateMessageWaitTimeSeconds(hash);
  console.info(`Withdrawal has ${waitTime} seconds wait time (~${waitTime / 60 / 60 / 24} days)`);
}

module.exports = {
  checkWithdrawal,
}

const { getSigners, getCrossChainMessenger, getL1BlockNumberForTx} = require("./shared");

const finalizeWithdrawal = async (hash) => {
  const [l1Signer, l2Signer] = getSigners();
  const l1BlockNumberForTx = await getL1BlockNumberForTx(l1Signer.provider, l2Signer.provider, hash)
  const crossChainMessenger = getCrossChainMessenger(l1Signer, l2Signer, l1BlockNumberForTx);
  const withdrawalTx = await l2Signer.provider.getTransactionReceipt(hash);
  try {
    const finalizationTx = await crossChainMessenger.finalizeMessage(withdrawalTx);
    console.info(`Withdrawal successful with tx ${finalizationTx.hash}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  finalizeWithdrawal,
}

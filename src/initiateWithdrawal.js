const { getCrossChainMessenger, getSigners } = require('./shared');

const initiateWithdrawal = async(l1Erc20Address, l2Erc20Address, amount) => {
  const [l1Signer, l2Signer] = getSigners();
  const latestL1Block = await l1Signer.provider.getBlock('latest');
  const crossChainMessenger = getCrossChainMessenger(l1Signer, l2Signer, latestL1Block.number);

  const withdrawRes = await crossChainMessenger.withdrawERC20(l1Erc20Address, l2Erc20Address, amount);
  await withdrawRes.wait();

  console.info(`Withdrawal hash: ${withdrawRes.hash}`);
};

module.exports = {
  initiateWithdrawal,
}

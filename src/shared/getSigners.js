const ethers = require("ethers");
const { L1_RPC, L2_RPC } = require("./constants");

const getSigners = () => {
  if (!process.env.L1_PRIVATE_KEY || !process.env.L2_PRIVATE_KEY) {
    throw new Error('Please set L1_PRIVATE_KEY and L2_PRIVATE_KEY');
  }

  const l1RpcProvider = new ethers.providers.JsonRpcProvider(L1_RPC)
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(L2_RPC)

  const l1Wallet = new ethers.Wallet(process.env.L1_PRIVATE_KEY, l1RpcProvider)
  const l2Wallet = new ethers.Wallet(process.env.L2_PRIVATE_KEY, l2RpcProvider)

  return [l1Wallet, l2Wallet]
}

module.exports = {
  getSigners,
}
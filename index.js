const { program } = require('commander');
const { checkWithdrawal, finalizeWithdrawal, initiateWithdrawal } = require('./src');

program
  .command('withdraw')
  .argument('l1-erc20', 'The address of the ERC20 to withdraw on L1')
  .argument('l2-erc20', 'The mapped ERC20 to withdraw on L2')
  .argument('amount', 'The amount to withdraw')
  .action(async (l1Erc20, l2Erc20, amount) => {
    await initiateWithdrawal(l1Erc20, l2Erc20, amount);
  })

program
  .command('check-withdrawal')
  .argument('hash')
  .action(async (hash) => {
    await checkWithdrawal(hash);
  })

program
  .command('finalize-withdrawal')
  .argument('hash')
  .action(async (hash) => {
    await finalizeWithdrawal(hash);
  })

program.parse();

import hre from 'hardhat';

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const accountBalance = await owner.provider.getBalance(owner.address);

  console.log('Deployed by:', owner.address);
  console.log('Account balance:', accountBalance.toString());

  const post = await hre.ethers.deployContract('Post', {
    value: hre.ethers.parseEther('0.03')
  });
  await post.waitForDeployment();

  console.log('Post deployed to:', post.target);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain()

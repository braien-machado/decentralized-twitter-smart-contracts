import hre from "hardhat";

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const post = (await hre.ethers.deployContract('Post', {
    value: hre.ethers.parseEther('0.1')
  }));
  await post.waitForDeployment();

  console.log('Post deployed to:', post.target);
  console.log('Deployed by:', owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(post.target);
  
  console.log('Contract balance:', hre.ethers.formatEther(contractBalance))

  const waveTxn = await post.createPost('Sending 1# post');
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(post.target);
  console.log('Contract balance after sending post:', hre.ethers.formatEther(contractBalance))

  await post.getTotalPosts();
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

import hre from "hardhat";

const main = async () => {
  const post = await hre.ethers.deployContract('Post');
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

import hre from "hardhat";

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const post = (await hre.ethers.deployContract('Post'));
  await post.waitForDeployment();

  console.log('Post deployed to:', post.target);
  console.log('Deployed by:', owner.address);

  await post.getTotalPosts();

  const waveTxn = await post.createPost();
  await waveTxn.wait();

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

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import 'hardhat/console.sol';

contract Post {
  uint256 totalPosts;

  constructor() {
    console.log('Post');
  }

  function createPost() public {
    totalPosts += 1;
    console.log('Post created by %s', msg.sender);
  }

  function getTotalPosts() public view returns (uint256) {
    console.log('Total posts: %d', totalPosts);
    return totalPosts;
  }
}
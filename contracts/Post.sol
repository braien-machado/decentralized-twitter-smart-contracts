// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import 'hardhat/console.sol';

contract Post {
  uint256 totalPosts;
  uint256 private seed;

  event NewPost(address indexed from, uint256 timestamp, string message);

  struct IPost {
    address sender;
    string message;
    uint256 timestamp;
  }

  IPost[] posts;

  mapping(address => uint256) public lastPostAt;

  constructor() payable {
    console.log('Contract created!');
    seed = (block.timestamp + block.prevrandao) % 100;
  }

  function createPost(string memory _message) public {
    require(lastPostAt[msg.sender] + 30 seconds < block.timestamp, 'Must wait 30 seconds before waving again.');

    lastPostAt[msg.sender] = block.timestamp;

    totalPosts += 1;
    console.log('Post created by: %s', msg.sender);

    posts.push(IPost(msg.sender, _message, block.timestamp));

    seed = (block.prevrandao + block.timestamp + seed) % 100;

    if (seed < 50) {
      console.log('%s won 0.0001 Ethereum!', msg.sender);

      uint256 prizeAmount = 0.0001 ether;

      require(prizeAmount <= address(this).balance, 'Trying to withdraw more money than the contract has.');
      (bool success, ) = (msg.sender).call{value: prizeAmount}('');
      require(success, 'Failed to withdraw money from contract.');
    }

    emit NewPost(msg.sender, block.timestamp, _message);
  }

  function getAllPosts() public view returns (IPost[] memory) {
    return posts;
  }

  function getTotalPosts() public view returns (uint256) {
    console.log('Total posts: %d', totalPosts);
    return totalPosts;
  }
}
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping (address => uint) public recordWaveCount;

    constructor() {
        console.log("Dear web3, Be kind !! ");
    }

    function wave() public {
        totalWaves += 1;
        recordWaveCount[msg.sender] += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function stats() public view returns (uint256) {
        console.log("%s waved a total of %d times", msg.sender, recordWaveCount[msg.sender]);
        return recordWaveCount[msg.sender];
    }

}
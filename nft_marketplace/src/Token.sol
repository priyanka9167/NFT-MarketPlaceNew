// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Pixie", "PIX") {
        _mint(msg.sender, initialSupply);
    }

    function distributeTokens(address recipient, uint256 amount) public {
        _mint(recipient, amount);
    }

    function getBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    // Override the decimals function to set the desired number of decimals
    function decimals() public view virtual override returns (uint8) {
        return 0; // Set to 8 decimals
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NFTCollection.sol";
import "../src/Token.sol";
import "../src/Counter.sol";

contract NFTCollectionTest is Test {
    Token private pixieToken;
    NFTCollection private nftCollection;
    address private owner;
    address private addr1;
    address private addr2;

    // function setUp() public {
    //     owner = address(this);
    //     addr1 = address(0x123);
    //     addr2 = address(0x456);

    //     pixieToken = new PixieToken(100);
    //     nftCollection = new NFTCollection("MyNFTCollection", "MNFTC", address(pixieToken));

    //     // Mint an NFT to the owner address
    //     nftCollection.createNFT("tokenURI_1", 10);
    //     nftCollection.transferFrom(address(this), owner, 1);

    //     // Transfer PixieTokens to addr1
    //     pixieToken.transfer(addr1, 10);
    // }

    // function testCreateNFT() public {
    //     vm.prank(addr1);
    //     nftCollection.createNFT("tokenURI_1", 10);
    //     NFTCollection.MintedNFT memory mintedNFT = nftCollection.getNFTForTokenId(1);

    //     assertEq(mintedNFT.tokenId, 1);
    //     assertEq(mintedNFT.owner, addr1);
    //     assertEq(mintedNFT.price, 10);
    // }

    // function testBuyNFT() public {
    //     nftCollection.createNFT("tokenURI_1", 10);

    //     pixieToken.transfer(addr1, 10);
    //     vm.prank(addr1);
    //     pixieToken.approve(address(nftCollection), 10);

    //     vm.prank(addr1);
    //     nftCollection.buyNFT(1);

    //     NFTCollection.MintedNFT memory mintedNFT = nftCollection.getNFTForTokenId(1);

    //     assertEq(mintedNFT.owner, addr1);
    // }


      function setUp() public {
        owner = address(this);
        addr1 = address(0x123);
        addr2 = address(0x456);

        pixieToken = new Token(100);
        nftCollection = new NFTCollection("MyNFTCollection", "MNFTC", address(pixieToken));

        vm.prank(addr2);
        // Mint an NFT to the owner address
        nftCollection.createNFT("tokenURI_1", 10 * 10 ** 18);

        // Transfer PixieTokens to addr1
        pixieToken.transfer(addr1, 10 * 10 ** 18);
        uint256 balance = pixieToken.getBalance(addr1);
        assertEq(balance, 10 * 10 ** 18);
    }

    function testBuyNFT() public {
        NFTCollection.MintedNFT memory mintedNFT_old = nftCollection.getNFTForTokenId(1);

        assertEq(mintedNFT_old.owner, addr2);

        // Approve the NFTCollection contract to spend addr1's PixieTokens
        vm.prank(addr1);
        pixieToken.approve(address(nftCollection), 10);

        // Buy the NFT from addr1
        vm.prank(addr1);
        nftCollection.buyNFT(1);

        NFTCollection.MintedNFT memory mintedNFT = nftCollection.getNFTForTokenId(1);

        assertEq(mintedNFT.owner, addr1);
    }

    // function testBuyNFT() public {
    //     // Approve the NFTCollection contract to spend addr1's PixieTokens
    //     vm.prank(addr1);
    //     pixieToken.approve(address(nftCollection), 10);

    //     // Buy the NFT from addr1
    //     vm.prank(addr1);
    //     nftCollection.buyItem(1);

    //     NFTCollection.MintedNFT memory mintedNFT = nftCollection.getNFTForTokenId(1);

    //     assertEq(mintedNFT.owner, addr1);
    // }

    // function testGetNFTsInCollection() public {
    //     nftCollection.createNFT("tokenURI_1", 10 * 10 ** 18);
    //     nftCollection.createNFT("tokenURI_2", 20 * 10 ** 18);

    //     NFTCollection.MintedNFTWithURI[] memory nfts = nftCollection.getNFTsInCollection();

    //     assertEq(nfts.length, 2);
    //     assertEq(nfts[0].uri, "tokenURI_1");
    //     assertEq(nfts[1].uri, "tokenURI_2");
    // }

    // function testGetNFTsOwnedBy() public {
    //     nftCollection.createNFT("tokenURI_1", 10 * 10 ** 18);
    //     nftCollection.createNFT("tokenURI_2", 20 * 10 ** 18);

    //     pixieToken.transfer(addr1, 30 * 10 ** 18);
    //     vm.prank(addr1);
    //     pixieToken.approve(address(nftCollection), 30 * 10 ** 18);

    //     vm.prank(addr1);
    //     nftCollection.buyNFT(1);
    //     vm.prank(addr1);
    //     nftCollection.buyNFT(2);

    //     NFTCollection.MintedNFTWithURI[] memory nftsOwned = nftCollection.getNFTsOwnedBy(addr1);

    //     assertEq(nftsOwned.length, 2);
    //     assertEq(nftsOwned[0].uri, "tokenURI_1");
    //     assertEq(nftsOwned[1].uri, "tokenURI_2");
    // }

    // function testGetNFTPrice() public {
    //     nftCollection.createNFT("tokenURI_1", 10 * 10 ** 18);
    //     uint256 price = nftCollection.getNFTPrice(1);

    //     assertEq(price, 10 * 10 ** 18);
    // }
}

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NFTCollection.sol";
import "../src/Counter.sol";

contract NftCollectionTest is Test {
    NFTCollection private nftCollection;
    Counter private counter;
    address private owner;
    address private addr1;
    address private addr2;

    function setUp() public {
        owner = address(this);
        addr1 = address(0x1);
        addr2 = address(0x2);

        counter = new Counter();
        nftCollection = new NFTCollection("My NFT Collection", "MNFT");
    }

    function testMintToken() public {
        string memory tokenURI = "https://mytoken.com/token/1";
        vm.prank(addr1);
        nftCollection.createNFT(tokenURI);

        NFTCollection.MintedNFT memory mintedNFT = nftCollection.getNFTForTokenId(1);
        assertEq(mintedNFT.tokenId, 1);
        assertEq(mintedNFT.owner, addr1);
    }

    function testGetNftsInCollection() public {
        string memory tokenURI1 = "https://mytoken.com/token/1";
        string memory tokenURI2 = "https://mytoken.com/token/2";

        vm.prank(addr1);
        nftCollection.createNFT(tokenURI1);

        vm.prank(addr2);
        nftCollection.createNFT(tokenURI2);

        NFTCollection.MintedNFTWithURI[] memory tokens = nftCollection.getNFTsInCollection();
        assertEq(tokens.length, 2);

        assertEq(tokens[0].tokenId, 1);
        assertEq(tokens[0].owner, addr1);
        assertEq(tokens[0].uri, tokenURI1);

        assertEq(tokens[1].tokenId, 2);
        assertEq(tokens[1].owner, addr2);
        assertEq(tokens[1].uri, tokenURI2);
    }
}

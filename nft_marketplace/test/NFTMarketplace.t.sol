// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NFTMarketplace.sol";
import "../src/Counter.sol";

contract NFTMarketplaceTest is Test {
    NFTMarketplace private nftMarketplace;
    Counter private counter;
    address private owner;
    address private addr1;
    address private addr2;

    function setUp() public {
        owner = address(this);
        addr1 = address(0x1);
        addr2 = address(0x2);

        counter = new Counter();
        nftMarketplace = new NFTMarketplace("Marketplace", "MKT");
    }

    function testCreateCollection() public {
        string memory collectionName = "My NFT Collection";
        address collectionAddress = address(0x1234);

        vm.prank(addr1);
        nftMarketplace.createCollection(collectionName, collectionAddress);

        NFTMarketplace.Collection memory collection = nftMarketplace.getAllCollections()[0];
        assertEq(collection.id, 1);
        assertEq(collection.name, collectionName);
        assertEq(collection.owner, addr1);
        assertEq(collection.contractAddress, collectionAddress);
    }

    function testGetAllCollections() public {
        string memory collectionName1 = "NFT Collection 1";
        string memory collectionName2 = "NFT Collection 2";
        address collectionAddress1 = address(0x1234);
        address collectionAddress2 = address(0x5678);

        vm.prank(addr1);
        nftMarketplace.createCollection(collectionName1, collectionAddress1);

        vm.prank(addr2);
        nftMarketplace.createCollection(collectionName2, collectionAddress2);

        NFTMarketplace.Collection[] memory collections = nftMarketplace.getAllCollections();
        assertEq(collections.length, 2);

        assertEq(collections[0].id, 1);
        assertEq(collections[0].name, collectionName1);
        assertEq(collections[0].owner, addr1);
        assertEq(collections[0].contractAddress, collectionAddress1);

        assertEq(collections[1].id, 2);
        assertEq(collections[1].name, collectionName2);
        assertEq(collections[1].owner, addr2);
        assertEq(collections[1].contractAddress, collectionAddress2);
    }
}

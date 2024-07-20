// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "./Counter.sol";

contract NFTMarketplace is ERC721URIStorage { 
    Counter private _collectionIds;

    struct Collection {
        uint256 id;
        string name;
        address owner;
        address contractAddress;
    }

    // Collection[] private CollectionsList;

    mapping(uint256 => Collection) private collectionsMapping;

    event CollectionCreated(uint256 indexed collectionId, string name, address indexed owner, address contractAddress);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        _collectionIds = new Counter();
        _collectionIds.setNumber(0);
    }

// add collection entry into marketplace
    function createCollection(string memory name, address collectionAddress) public {
        _collectionIds.increment();
        uint256 newCollectionId = _collectionIds.getCurrentId();

        collectionsMapping[newCollectionId] = Collection(newCollectionId, name, msg.sender, collectionAddress);
        emit CollectionCreated(newCollectionId, name, msg.sender, collectionAddress);
    }

    function getAllCollections() public view returns (Collection[] memory) {
        uint totalCollectionCount = _collectionIds.getCurrentId();
        Collection[] memory collectionList = new Collection[](totalCollectionCount);
        for (uint i = 0; i < totalCollectionCount; i++) {
            Collection storage collection = collectionsMapping[i + 1];
            collectionList[i] = collection;
        }
        return collectionList;
    }


}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "./Counter.sol";

contract NFTCollection is ERC721URIStorage {
    Counter private _mintedNFTIds;

    struct MintedNFT {
        uint256 tokenId;
        address owner;
    }

    struct MintedNFTWithURI {
        uint256 tokenId;
        address owner;
        string uri;
    }

    // MintedNFT[] private MintedNFTtList;

    mapping(uint256 => MintedNFT) private MintedNFTMapping;

    event NFTCreated(uint256 indexed tokenId, address indexed owner, string tokenURI);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        _mintedNFTIds = new Counter();
        _mintedNFTIds.setNumber(0);
    }

    function createNFT(string memory tokenURI) public {
        _mintedNFTIds.increment();
        uint256 newNftId = _mintedNFTIds.getCurrentId();

        _safeMint(msg.sender, newNftId);
        _setTokenURI(newNftId, tokenURI);

        MintedNFTMapping[newNftId] = MintedNFT(newNftId, msg.sender);

        // MintedNft.push(MintedToken(newNftId, msg.sender));

        emit NFTCreated(newNftId, msg.sender, tokenURI);
    }

    // function getNFTsInCollection() public view returns (MintedNFT[] memory) {
    //     uint totalNFTCount = _mintedNFTIds.getCurrentId();
    //     MintedNFT[] memory mintedNFTList = new MintedNFT[](totalNFTCount);
    //     for (uint i = 0; i < totalNFTCount; i++) {
    //         MintedNFT storage mintedNFT = MintedNFTMapping[i + 1];
    //         mintedNFTList[i] = mintedNFT;
    //     }
    //     return mintedNFTList;
    // }

    function getNFTsInCollection() public view returns (MintedNFTWithURI[] memory) {
        uint totalNFTCount = _mintedNFTIds.getCurrentId();
        MintedNFTWithURI[] memory mintedNFTList = new MintedNFTWithURI[](totalNFTCount);
        for (uint i = 0; i < totalNFTCount; i++) {
            MintedNFT storage mintedNFT = MintedNFTMapping[i + 1];
            
            MintedNFTWithURI memory mintedNFTWithURI = MintedNFTWithURI(mintedNFT.tokenId, mintedNFT.owner, tokenURI(mintedNFT.tokenId));

            mintedNFTList[i] = mintedNFTWithURI;
        }
        return mintedNFTList;
    }

    function getNFTForTokenId(uint256 tokenId) public view returns (MintedNFT memory) {
        MintedNFT memory nft = MintedNFTMapping[tokenId];
        return nft;
    }


}

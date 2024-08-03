// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Counter.sol";
import "forge-std/console.sol";

contract NFTCollection is ERC721URIStorage {
    Counter private _mintedNFTIds;
    ERC20 private _paymentToken;

    struct MintedNFT {
        uint256 tokenId;
        address owner;
        uint256 price;
    }

    struct MintedNFTWithURI {
        uint256 tokenId;
        address owner;
        string uri;
        uint256 price;
    }

    mapping(uint256 => MintedNFT) private MintedNFTMapping;

    event NFTCreated(uint256 indexed tokenId, address indexed owner, string tokenURI, uint256 price);
    event NFTBought(uint256 indexed tokenId, address indexed buyer, uint256 price);

    // event 

    constructor(
        string memory _name,
        string memory _symbol,
        address paymentTokenAddress
    ) ERC721(_name, _symbol) {
        _mintedNFTIds = new Counter();
        _mintedNFTIds.setNumber(0);
        _paymentToken = ERC20(paymentTokenAddress);
    }

    function createNFT(string memory tokenURI, uint256 price) public  {
        _mintedNFTIds.increment();
        uint256 newNftId = _mintedNFTIds.getCurrentId();

        _safeMint(msg.sender, newNftId);

        _setTokenURI(newNftId, tokenURI);

        MintedNFTMapping[newNftId] = MintedNFT(newNftId, msg.sender, price);

        

        emit NFTCreated(newNftId, msg.sender, tokenURI, price);
    }

    function buyNFT(uint256 tokenId) public {

        uint256 price = MintedNFTMapping[tokenId].price;
        // address owner = ownerOf(tokenId);
        address owner = MintedNFTMapping[tokenId].owner;

        console.log("Price: ", price);
        console.log("Owner: ", owner);
        console.log("Msg.sender: ", msg.sender);

        require(_paymentToken.transferFrom(msg.sender, owner, price), "Payment failed");

        _transfer(owner, msg.sender, tokenId);
        MintedNFTMapping[tokenId].owner = msg.sender;

        emit NFTBought(tokenId, msg.sender, price);
    }


    function getNFTsInCollection() public view returns (MintedNFTWithURI[] memory) {
        uint totalNFTCount = _mintedNFTIds.getCurrentId();
        MintedNFTWithURI[] memory mintedNFTList = new MintedNFTWithURI[](totalNFTCount);
        for (uint i = 0; i < totalNFTCount; i++) {
            MintedNFT storage mintedNFT = MintedNFTMapping[i + 1];
            MintedNFTWithURI memory mintedNFTWithURI = MintedNFTWithURI(
                mintedNFT.tokenId,
                mintedNFT.owner,
                tokenURI(mintedNFT.tokenId),
                mintedNFT.price
            );
            mintedNFTList[i] = mintedNFTWithURI;
        }
        return mintedNFTList;
    }

    function getNFTForTokenId(uint256 tokenId) public view returns (MintedNFT memory) {

        MintedNFT memory nft = MintedNFTMapping[tokenId];
        return nft;
    }

    function getNFTsOwnedBy(address owner) public view returns (MintedNFTWithURI[] memory) {
        uint totalNFTCount = _mintedNFTIds.getCurrentId();
        uint count = 0;

        for (uint i = 0; i < totalNFTCount; i++) {
            if (MintedNFTMapping[i + 1].owner == owner) {
                count++;
            }
        }

        MintedNFTWithURI[] memory ownedNFTs = new MintedNFTWithURI[](count);
        uint index = 0;

        for (uint i = 0; i < totalNFTCount; i++) {
            if (MintedNFTMapping[i + 1].owner == owner) {
                MintedNFT storage mintedNFT = MintedNFTMapping[i + 1];
                ownedNFTs[index] = MintedNFTWithURI(
                    mintedNFT.tokenId,
                    mintedNFT.owner,
                    tokenURI(mintedNFT.tokenId),
                    mintedNFT.price
                );
                index++;
            }
        }

        return ownedNFTs;
    }

    function getNFTPrice(uint256 tokenId) public view returns (uint256) {

        return MintedNFTMapping[tokenId].price;
    }
}

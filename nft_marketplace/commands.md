
forge init nft_marketplace

cd nft_marketplace

forge install OpenZeppelin/openzeppelin-contracts




## Deploy

forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/MyContract.sol:MyContract


forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/NFTMarketplace.sol:NFTMarketplace --constructor-args "collectionManager" "CM"

NFTMarketplace deployed address is - 0x5FbDB2315678afecb367f032d93F642f64180aa3 




forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/NFTCollection.sol:NFTCollection --constructor-args "second" "Second"


NFTCollection deployed address is - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 
NFTCollection deployed address is - 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0









CAST - 

Create collection

cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "createCollection(string, address)" "Collection_2" "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80



Get All Collections 

cast call 0x5FbDB2315678afecb367f032d93F642f64180aa3 "getAllCollections()((uint256,string,address,address)[])" --rpc-url http://127.0.0.1:8545



Mint NFT 

cast send 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 "createNFT(string)" "www.meta.com" --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80


Get all NFTS from collection 

cast call 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 "getNFTsInCollection()((uint256,address,string)[])" --rpc-url http://127.0.0.1:8545
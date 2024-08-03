
forge init nft_marketplace

cd nft_marketplace

forge install OpenZeppelin/openzeppelin-contracts




## Deploy

forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/MyContract.sol:MyContract


forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/Token.sol:Token --constructor-args "10000"

Pixie Token deployed on - 0x5FbDB2315678afecb367f032d93F642f64180aa3



forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/NFTMarketplace.sol:NFTMarketplace --constructor-args "collectionManager" "CM"

NFTMarketplace deployed address is - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 


forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/NFTCollection.sol:NFTCollection --constructor-args "First" "First" 0x5FbDB2315678afecb367f032d93F642f64180aa3


NFTCollection deployed address is - 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 

<!-- ---

forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/NFTCollection.sol:NFTCollection --constructor-args "First" "First"


NFTCollection deployed address is - 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 
<!-- NFTCollection deployed address is - 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 -->






CAST - 

Create collection

cast send 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 "createCollection(string, address)" "Collection_2" "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80



Get All Collections 

cast call 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 "getAllCollections()((uint256,string,address,address)[])" --rpc-url http://127.0.0.1:8545



Mint NFT 

<!-- cast send cast send NFTCollection "createNFT(string,uint256)" "www.meta.com" 20 --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 -->

cast send 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 "createNFT(string,uint256)" "www.meta.com" 20 --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80


Get all NFTS from collection 

cast call 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 "getNFTsInCollection()((uint256,address,string,uint256)[])" --rpc-url http://127.0.0.1:8545



Distribute Pixie tokens

<!-- cast send tokenAddress "distributeTokens(address,uint256)" Available Account 200 --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 -->

cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "distributeTokens(address,uint256)" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 200 --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80


Approve Pixie tokens to be spent on nft marketplace

cast send <pixieTokenAddress> "approve(address,uint256)" <nftCollectionAddress> 10000000000000000000 --rpc-url http://localhost:8545 --private-key <private-key-of-addr1>

cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "approve(address,uint256)" 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 150 --rpc-url http://localhost:8545 --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d


Buy NFT 

<!-- cast send CollectionAddress "buyNFT(uint256)" 1 --rpc-url 127.0.0.1:8545 --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d -->

cast send 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 "buyNFT(uint256)" 1 --rpc-url 127.0.0.1:8545 --private-key 0x70997970C51812dc3A010C7d01b50e0d17dc79C8



Get NFTs owned by a user

cast call 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 "getNFTsOwnedBy(address)((uint256,address,string,uint256)[])" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --rpc-url http://127.0.0.1:8545


Get Pixie balance 

cast call 0x5FbDB2315678afecb367f032d93F642f64180aa3 "getBalance(address)(uint256)" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --rpc-url http://127.0.0.1:8545



# Deploy on testnet

 Deploy Marketplace 

forge create --rpc-url https://sepolia.infura.io/v3/7df002994c0244b49f2b1f251ca8c9af --private-key dfe92cdc0bab42a3255c45131185ead5e7ed733a3dc5bd57f5aa2c033a3ab2a6 src/NFTMarketplace.sol:NFTMarketplace --constructor-args "collectionManager" "CM"

 Deployed on - 0xcd1e07190b23aa6b45F8e0C9bACa41da23946060



 Deploy Collection 

forge create --rpc-url https://sepolia.infura.io/v3/7df002994c0244b49f2b1f251ca8c9af --private-key dfe92cdc0bab42a3255c45131185ead5e7ed733a3dc5bd57f5aa2c033a3ab2a6 src/NFTCollection.sol:NFTCollection --constructor-args "My First collection" "First"

Deployed on - 0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6


# Cast commands 


 Get All Collections 

cast call 0xcd1e07190b23aa6b45F8e0C9bACa41da23946060 "getAllCollections()((uint256,string,address,address)[])" --rpc-url https://sepolia.infura.io/v3/7df002994c0244b49f2b1f251ca8c9af


Create collection

cast send 0xcd1e07190b23aa6b45F8e0C9bACa41da23946060 "createCollection(string, address)" "My First Collection" "0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6" --rpc-url https://sepolia.infura.io/v3/7df002994c0244b49f2b1f251ca8c9af --private-key dfe92cdc0bab42a3255c45131185ead5e7ed733a3dc5bd57f5aa2c033a3ab2a6


Mint NFT 

cast send 0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6 "createNFT(string)" "www.meta.com" --rpc-url https://sepolia.infura.io/v3/7df002994c0244b49f2b1f251ca8c9af --private-key dfe92cdc0bab42a3255c45131185ead5e7ed733a3dc5bd57f5aa2c033a3ab2a6


Get all NFTS from collection 

cast call 0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6 "getNFTsInCollection()((uint256,address,string)[])" --rpc-url https://sepolia.infura.io/v3/7df002994c0244b49f2b1f251ca8c9af














cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "distributeTokens(address,uint256)" 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC 200 --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
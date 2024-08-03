
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

cast call 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 "getNFTsInCollection()((uint256,address,string)[])" --rpc-url http://127.0.0.1:8545



# Deploy on testnet

 Deploy Marketplace 

forge create --rpc-url https://sepolia.infura.io/v3/f62d1e178f134982940c6071ad3b4c70 --private-key 87f7ef8d9106fade7a168ab0e9272780ef74bdcdca904fe1b95fca0213fee0b9 src/NFTMarketplace.sol:NFTMarketplace --constructor-args "collectionManager" "CM"

Deployed on - 0x57E3294D70Fc3bb2765af1A975BEA84115a322C2



Deploy Token


forge create --rpc-url https://sepolia.infura.io/v3/f62d1e178f134982940c6071ad3b4c70 --private-key 87f7ef8d9106fade7a168ab0e9272780ef74bdcdca904fe1b95fca0213fee0b9 src/Token.sol:Token --constructor-args "100000"

Deployed on - 0x5fCC9a5BE3a0cf0DdB647f7a1Ba71Fd6B45E4066


Deploy 

Deploy Collection 

forge create --rpc-url https://sepolia.infura.io/v3/f62d1e178f134982940c6071ad3b4c70 --private-key ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/NFTCollection.sol:NFTCollection --constructor-args "My First collection" "First"

Deployed on - 0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6


# Cast commands 


 Get All Collections 

cast call 0xcd1e07190b23aa6b45F8e0C9bACa41da23946060 "getAllCollections()((uint256,string,address,address)[])" --rpc-url https://sepolia.infura.io/v3/f62d1e178f134982940c6071ad3b4c70


Create collection

cast send 0xcd1e07190b23aa6b45F8e0C9bACa41da23946060 "createCollection(string, address)" "My First Collection" "0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6" --rpc-url https://sepolia.infura.io/v3/f62d1e178f134982940c6071ad3b4c70 --private-key f98918409590a35abea6305c9795c757a007aa1dd05fdfceeed57c0f91c81df5


Mint NFT 

cast send 0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6 "createNFT(string)" "www.meta.com" --rpc-url https://sepolia.infura.io/v3/f62d1e178f134982940c6071ad3b4c70 --private-key f98918409590a35abea6305c9795c757a007aa1dd05fdfceeed57c0f91c81df5


Get all NFTS from collection 

cast call 0xF58F38DC555F24D42c9a308Ab2B71B67A556C2e6 "getNFTsInCollection()((uint256,address,string)[])" --rpc-url https://sepolia.infura.io/v3/f62d1e178f134982940c6071ad3b4c70
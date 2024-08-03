import { Button, Input, Box, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import NFTCollection from './utils/NFTCollection.json';
import TokenContract from './utils/Token.json';
import { getSigner, getContract } from './ether_utils';


// Define the type for your collection items
interface CollectionItem {
    id: number;
    owner: `0x${string}`;
    uri: string;
    price: BigInt;
}


export default function NFT() {
    const location = useLocation();
    const { name } = useParams<{ name: string }>();
    const [fileImg, setFileImg] = useState(null);
    const [nftAddress, setNftAddress] = useState(null);
    const [nftImageCollection, setNftImageCollection] = useState<CollectionItem[]>([]);
    const [price, setPrice] = useState<number>(0);

    // const [signer, setSigner] = useState<any>(null);
    const tokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as `0x${string}` | undefined;




    const handleUploadClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (fileImg) {
                const formData = new FormData();
                formData.append("file", fileImg);
                let resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    headers: {
                        'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                        'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY,
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData,

                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                console.log("ImgHash=======>", ImgHash);
                console.log("NFT Address==>", nftAddress);
                const signer = await getSigner();
                const collection_contract = getContract(nftAddress, NFTCollection.abi, signer);
                let response_nft = await collection_contract.createNFT(ImgHash, price);
                let new_nft = {
                    id: nftImageCollection.length + 1,
                    owner: '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720' as `0x${string}`,
                    uri: ImgHash,
                    price: BigInt(price)
                }
                setNftImageCollection(prevState => [...prevState, new_nft]);

            }
        }
        catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        }
    }

    const getAllCollections = async () => {
        if (nftAddress) {
            try {
                const signer = await getSigner();
                const collection_contract = getContract(nftAddress, NFTCollection.abi, signer);

                let response_all_nfts = await collection_contract.getNFTsInCollection();
                console.log("response_all_nfts", response_all_nfts);
                const formattedCollections: CollectionItem[] = response_all_nfts.map((collection: any) => ({
                    id: collection[0],
                    owner: collection[1],
                    uri: collection[2],
                    price: collection[3]
                }));

                console.log("formattedCollections", formattedCollections);
                setNftImageCollection(formattedCollections);
            } catch (error) {
                console.error(error);
            }
        }
    };



    const buyNFT = async (nft_id: any) => {
        try {
            const signer = await getSigner();
            console.log("signer address", signer?.address, nftAddress)
            const token_contract = getContract(tokenAddress, TokenContract.abi, signer);
            await token_contract.approve(nftAddress, 500);
            console.log("Tokens approved!", Number(nft_id));
            const collection_contract = getContract(nftAddress, NFTCollection.abi, signer);
            await collection_contract.buyNFT(Number(nft_id));
        }
        catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        const init = async () => {
            try {
                const authResponse = await axios.get("https://api.pinata.cloud/data/testAuthentication", {
                    headers: {
                        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
                    }
                });
                // setSigner(location.state.signer);
                setNftAddress(location.state.nft_address);


            }
            catch (error) {
                console.log("Pinata Authentication error---", error)
            }
        }
        init();
    }, [])

    useEffect(() => {
        if (nftAddress) {
            getAllCollections();
        }
    }, [nftAddress]);

    return (
        <div style={{ marginTop: 10, textAlign: 'center' }}>
            <form onSubmit={handleUploadClick}>
                <div style={{ marginBottom: '16px' }}>
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e: any) => setFileImg(e.target.files[0])}
                        placeholder=''
                        required
                    />
                </div>
                <div>
                    <label htmlFor="number-input">Enter a number: </label>

                    <input
                        id="number-input"
                        type="number"
                        onChange={(e: any) => setPrice(e.target.value)}
                        placeholder=''
                        required
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    Mint NFT
                </Button>
            </form>
            <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', mt: 20 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4, flexWrap: 'wrap', gap: 2,
            }}>
                {nftImageCollection.map((element, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            width: '300px',
                            height: '400px', // Adjusted height to accommodate additional content
                            padding: '16px',
                            margin: '8px 0',
                            display: 'flex',
                            flexDirection: 'column', // Ensure vertical stacking
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={element.uri}
                            alt={`NFT ${index}`}
                            style={{ width: '100%', height: '60%', objectFit: 'cover' }} // Adjust height percentage as needed
                        />
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>Price: {Number(element.price)}</div>
                        <div style={{ textAlign: 'center', wordWrap: 'break-word', width: '100%' }}>
                            Owner: {element.owner}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => buyNFT(element.id)}
                            sx={{ mt: 2 }}
                        >
                            Buy NFT
                        </Button>
                    </Paper>
                ))}
            </Box>
        </Box>
            </div>
        </div>


    )
}

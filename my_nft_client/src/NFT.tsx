import { Button, Input, Box, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import NFTCollection from './utils/NFTCollection.json';
import { getSigner, getContract } from './ether_utils';


// Define the type for your collection items
interface CollectionItem {
    id: number;
    owner: `0x${string}`;
    uri: string
}


export default function NFT() {
    const location = useLocation();
    const { name } = useParams<{ name: string }>();
    const [fileImg, setFileImg] = useState(null);
    const [nftAddress, setNftAddress] = useState(null);
    const [nftImageCollection, setNftImageCollection] = useState<CollectionItem[]>([]);
    // const [signer, setSigner] = useState<any>(null);




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
                let response_nft = await collection_contract.createNFT(ImgHash);
                let new_nft = {
                    id: nftImageCollection.length + 1,
                    owner: '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720' as `0x${string}`,
                    uri: ImgHash
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
                const formattedCollections: CollectionItem[] = response_all_nfts.map((collection: any) => ({
                    id: collection[0],
                    owner: collection[1],
                    uri: collection[2],
                }));

                console.log("formattedCollections", formattedCollections);
                setNftImageCollection(formattedCollections);
            } catch (error) {
                console.error(error);
            }
        }
    };

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
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e: any) => setFileImg(e.target.files[0])}
                    placeholder=''
                    required
                />
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
                        display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4, flexWrap: 'wrap', gap: 2, // space between items

                    }}>
                        {nftImageCollection.map((element, index) => (
                            <Paper
                                key={index}
                                elevation={3}
                                sx={{
                                    width: '300px',
                                    height: '300px', // Ensure fixed height
                                    padding: '16px',
                                    margin: '8px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={element.uri}
                                    alt={`NFT ${index}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Maintain aspect ratio and cover the container
                                />
                            </Paper>


                        ))}
                    </Box>
                </Box>
            </div>
        </div>


    )
}

import React, { useEffect, useState } from 'react';
import {
    WagmiConfig, createConfig, configureChains, mainnet, useConnect, useAccount, useDisconnect, useEnsAvatar,
    useEnsName, useContractRead, useContractWrite
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import MarketPlaceContract from './utils/NFTMarketplace.json';
import { Button, DialogTitle, DialogContent, DialogContentText, Dialog, DialogActions, TextField, Box, Typography, Paper } from '@mui/material';
import { ethers, ContractFactory, ContractRunner } from 'ethers';
import { getSigner, getContract } from './ether_utils';
import NFTCollection from './utils/NFTCollection.json';
import { useNavigate, Link } from 'react-router-dom';


// Define the type for your collection items
interface CollectionItem {
    contractAddress: `0x${string}`;
    id: number;
    name: string;
    owner: `0x${string}`;
}


export default function Home() {

    const { address, connector, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name: ensName });
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { disconnect } = useDisconnect();
    const [collection, setCollection] = useState<CollectionItem[]>([]);
    const contractAddress = process.env.REACT_APP_MARKET_PLACE_CONTRACT_ADDRESS as `0x${string}` | undefined;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [collectionName, setCollectionName] = useState<string>("");
    const [marketPlaceContract, setMarketPlaceContract] = useState<any>(null);
    const [signer, setSigner] = useState<any>(null);
    const navigate = useNavigate();




    const changeCollectionName = (value: string) => {
        setCollectionName(value);
    }

    const deployCollection = async (name: string) => {
        try {
            let factory = new ContractFactory(NFTCollection.abi, NFTCollection.bytecode, signer);
            let contract_1 = await factory.deploy("Collection", "1");
            await contract_1.waitForDeployment();
            let new_collection_address = await contract_1.getAddress();
            let response_1 = await marketPlaceContract.createCollection(name, new_collection_address);
            if (response_1) {
                changeCollectionName("");
                setShowModal(false);
                let nft_address = response_1.hash;
                navigate(`/nft/${name}`, { state: { nft_address: new_collection_address, signer: signer } });
            }

        }
        catch (error) {
            console.log(error);
        }

    }

    const getAllCollections = async () => {

        if (marketPlaceContract) {
            try {
                const response = await marketPlaceContract.getAllCollections(); // Replace with your contract method
                const formattedCollections: CollectionItem[] = response.map((collection: any) => ({
                    id: collection[0],
                    name: collection[1],
                    owner: collection[2],
                    contractAddress: collection[3]
                }));

                setCollection(formattedCollections);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                const signer = await getSigner();
                if (!contractAddress) {
                    throw new Error("Contract address not found in environment variables");
                }
                const market_place_contract = getContract(contractAddress, MarketPlaceContract.abi, signer);
                setSigner(signer);
                setMarketPlaceContract(market_place_contract);


            } catch (error) {
                console.error("Initialization error:", error);
            }
        };
        init();
    }, [isConnected]);

    useEffect(() => {
        if (marketPlaceContract) {
            getAllCollections();
        }
    }, [marketPlaceContract]);

    if (isConnected) {
        console.log("collection details", collection)
        return (
            <div>
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <h1>Connected to {connector?.name}</h1>
                </div>
                <Button  onClick={() => disconnect()}>Disconnect</Button>


                <div style={{ textAlign: 'center' }}>
                    <React.Fragment>
                        <Button style={{ textAlign: 'center' }} variant="outlined" onClick={() => setShowModal(true)}>
                            Create New Collections
                        </Button>
                        <Dialog
                            open={showModal}
                            onClose={() => changeCollectionName("")}
                            PaperProps={{
                                component: 'form',
                                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries((formData as any).entries());
                                    const name = formJson.name;
                                    deployCollection(name)
                                },
                            }}
                        >
                            <DialogTitle>Collection Name</DialogTitle>
                            <DialogContent>

                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button type="submit">Create</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', mt: 20 }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4, flexWrap: 'wrap', gap: 2, // space between items

                    }}>
                        {collection.map((element, index) => (
                             <Link
                             to={`/nft/${element.name}`}
                             state={{
                                nft_address: element.contractAddress, 
                                signer: signer 
                             }}
                           >

                            <Paper
                                key={index}
                                elevation={3}
                                sx={{
                                    width: '300px',
                                    padding: '16px',
                                    margin: '8px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h6">{element.name}</Typography>
                            </Paper>
                            </Link>   

                        ))}
                    </Box>
                </Box>

            </div>
        )
    }

    return (
        <div style={{textAlign:'center', marginTop:20}}>
            {connectors.map((connector) => (
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                </Button>
            ))}

            {error && <div>{error.message}</div>}
        </div>


    )
}

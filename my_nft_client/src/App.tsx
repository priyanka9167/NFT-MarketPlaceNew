import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import Home from './Home';
import { WagmiConfig, createConfig, configureChains, mainnet, useConnect, useAccount, useDisconnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import NFT from './NFT';



// Local RPC URL

/// Configure chains & providers with the local JSON-RPC provider
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.REACT_APP_RPC_URL as string,
      }),
    }),
  ]
);


const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  publicClient,
  webSocketPublicClient,
})




function App() {



  return (
    <WagmiConfig config={config}>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/nft/:name" element={<NFT></NFT>}></Route>
        </Routes>
      </Router>
    </WagmiConfig>


  );
}

export default App;

import { useContext } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { AppContext } from '../context/AppContext';

import { INFURA_ID } from '../config';
import { SIGNATURE_MESSAGE } from '../utils/constants';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID
    }
  }
};

let web3Modal;

export const useWallet = () => {
  const context = useContext(AppContext);

  const connectWallet = async () => {
    web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions
    });

    web3Modal.clearCachedProvider();
    const modalProvider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(modalProvider);

    const signerAddress = (
      await ethersProvider.getSigner().getAddress()
    ).toLowerCase();

    let signature = await ethersProvider
      .getSigner()
      .signMessage(SIGNATURE_MESSAGE);

    modalProvider.on('accountsChanged', async () => {
      window.location.reload();
    });

    context.setWeb3Data({
      signerAddress: signerAddress,
      signature: signature
    });
  };

  const disconnect = async () => {
    web3Modal.clearCachedProvider();
  };

  return { connectWallet, disconnect };
};

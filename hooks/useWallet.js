/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { AppContext } from '../context/AppContext';

import { INFURA_ID } from '../config';
import { SIGNATURE_MESSAGE, WHITELISTED_ADDRESSES } from '../utils/constants';
import { getMemberByAddress } from '../utils/requests';
import { validateMembership } from '../utils/web3';
import { getProfile } from '../utils/3Box';

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

  useEffect(() => {
    context.signerAddress && checkMembership();
  }, [context.signerAddress]);

  const getMemberProfile = async () => {
    const member = await getMemberByAddress(
      context.signature,
      context.signerAddress
    );
    return member;
  };

  const checkMembership = async () => {
    const isMember = await validateMembership(context.signerAddress);
    const isWhitelisted =
      context.signerAddress.toLowerCase() in WHITELISTED_ADDRESSES;
    context.setWeb3Data({
      isMember: isMember ? true : false,
      isWhitelisted: isWhitelisted,
      whitelistedAccess: isWhitelisted
        ? WHITELISTED_ADDRESSES[context.signerAddress.toLowerCase()]
        : []
    });
    if (isMember || isWhitelisted) {
      const profile = await getProfile(context.signerAddress);
      const member = await getMemberProfile();
      context.setWeb3Data({
        profileImage: profile ? profile.imageUrl : null,
        isMember: isMember ? true : false,
        member
      });
    }
    context.setWeb3Data({ profileValidated: true });
  };

  const connectWallet = async () => {
    web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions
    });

    web3Modal.clearCachedProvider();
    const modalProvider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(modalProvider);

    const signerAddress = await ethersProvider.getSigner().getAddress();

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

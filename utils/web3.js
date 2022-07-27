import { providers, utils, Contract } from 'ethers';

import {
  GNOSIS_RPC,
  RAIDGUILD_DAO_ADDRESS,
  RAIDGUILD_DAO_MIN_SHARES
} from './constants';

export const validateMembership = async (_address) => {
  const gnosisEthersProvider = new providers.JsonRpcProvider(GNOSIS_RPC);
  const abi = new utils.Interface([
    'function members(address account) view returns (address, uint256, uint256, bool, uint256, uint256)'
  ]);
  const contract = new Contract(
    RAIDGUILD_DAO_ADDRESS,
    abi,
    gnosisEthersProvider
  );
  const member = await contract.members(_address.toLowerCase());
  return Number(member[1] >= RAIDGUILD_DAO_MIN_SHARES);
};

export const getSmartInvoiceAddress = async (_address) => {
  const gnosisEthersProvider = new providers.JsonRpcProvider(GNOSIS_RPC);
  const abi = new utils.Interface([
    'function invoice() public view returns(address)'
  ]);
  const contract = new Contract(_address, abi, gnosisEthersProvider);
  const smartInvoice = await contract.invoice();
  return smartInvoice;
};

export const getRaidPartyAddress = async (address) => {
  const gnosisEthersProvider = new providers.JsonRpcProvider(GNOSIS_RPC);
  const abi = new utils.Interface([
    'function child() public view returns(address)'
  ]);
  const contract = new Contract(address, abi, gnosisEthersProvider);
  const child = await contract.child();
  return child;
};

export const balanceOf = async (token, address) => {
  const gnosisEthersProvider = new providers.JsonRpcProvider(GNOSIS_RPC);
  const abi = new utils.Interface([
    'function balanceOf(address account) view returns(uint256)'
  ]);
  const contract = new Contract(token, abi, gnosisEthersProvider);
  return contract.balanceOf(address);
};

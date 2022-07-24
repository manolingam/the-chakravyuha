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

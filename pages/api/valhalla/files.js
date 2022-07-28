import { ListObjectsCommand } from '@aws-sdk/client-s3';
import { providers, utils, Contract } from 'ethers';

import { s3Client } from '../../../config';
import {
  GNOSIS_RPC,
  RAIDGUILD_DAO_ADDRESS,
  RAIDGUILD_DAO_MIN_SHARES,
  SIGNATURE_MESSAGE
} from '../../../utils/constants';

const ethersProvider = new providers.JsonRpcProvider(GNOSIS_RPC);
const bucketParams = { Bucket: 'raidguild' };

export default async function handler(req, res) {
  try {
    const address = utils.verifyMessage(
      SIGNATURE_MESSAGE,
      req.body.signature.toString()
    );

    const abi = new utils.Interface([
      'function members(address account) view returns (address, uint256, uint256, bool, uint256, uint256)'
    ]);
    const contract = new Contract(RAIDGUILD_DAO_ADDRESS, abi, ethersProvider);
    const member = await contract.members(address.toLowerCase());

    if (Number(member[1] >= RAIDGUILD_DAO_MIN_SHARES)) {
      try {
        const data = await s3Client.send(new ListObjectsCommand(bucketParams));
        res.status(200).json({ response: data.Contents });
      } catch (err) {
        console.log('Error', err);
      }
    } else {
      res.status(200).json({ response: 'Error' });
    }
  } catch (err) {
    console.log('Error', err);
    res.status(200).json({ response: 'Error' });
  }
}

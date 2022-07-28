import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { providers, utils, Contract } from 'ethers';

import { s3Client } from '../../../config';
import {
  GNOSIS_RPC,
  RAIDGUILD_DAO_ADDRESS,
  SIGNATURE_MESSAGE,
  RAIDGUILD_DAO_MIN_SHARES
} from '../../../utils/constants';

const ethersProvider = new providers.JsonRpcProvider(GNOSIS_RPC);

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
        const bucketParams = {
          Bucket: 'raidguild',
          Key: req.body.key
        };
        const url = await getSignedUrl(
          s3Client,
          new GetObjectCommand(bucketParams),
          { expiresIn: 15 * 60 }
        );
        res.status(200).json({ channel: url });
      } catch (err) {
        console.log('Error', err);
      }
    } else {
      res.status(200).json({ response: 'Error' });
    }
  } catch (err) {
    res.status(200).json({ response: 'Error' });
  }
}

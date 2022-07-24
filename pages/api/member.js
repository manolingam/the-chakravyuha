import { connectToDatabase } from '../../utils/mongo';

export default async function handler(req, res) {
  const { signerAddress } = req.body;

  const { db } = await connectToDatabase();

  let member;
  member = await db
    .collection('members')
    .find({ eth_address: signerAddress.toLowerCase() })
    .toArray();

  if (member.length === 0) {
    member = await db
      .collection('members')
      .find({ eth_address: signerAddress })
      .toArray();
  }

  res.status(200).json({ member });
}

import { connectToDatabase } from '../../utils/mongo';

export default async function handler(req, res) {
  const { skip } = req.body;

  const { db } = await connectToDatabase();

  const members = await db
    .collection('members')
    .find({})
    .skip(skip)
    .limit(10)
    .toArray();

  res.status(200).json({ members });
}

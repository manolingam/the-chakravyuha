import { connectToDatabase } from '../../utils/mongo';

export default async function handler(req, res) {
  const { filter } = req.body;

  const { db } = await connectToDatabase();

  let raids;

  if (filter === 'awaiting') {
    raids = await db
      .collection('raids')
      .aggregate([{ $match: { status: 'Awaiting' } }])
      .toArray();
  } else if (filter === 'preparing') {
    raids = await db
      .collection('raids')
      .aggregate([{ $match: { status: 'Preparing' } }])
      .toArray();
  } else if (filter === 'raiding') {
    raids = await db
      .collection('raids')
      .aggregate([{ $match: { status: 'Raiding' } }])
      .toArray();
  } else if (filter === 'shipped') {
    raids = await db
      .collection('raids')
      .aggregate([{ $match: { status: 'Shipped' } }])
      .toArray();
  }

  res.status(200).json({ raids });
}

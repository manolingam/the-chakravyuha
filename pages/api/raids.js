import { connectToDatabase } from '../../utils/mongo';

export default async function handler(req, res) {
  const { filter, skip } = req.body;

  const { db } = await connectToDatabase();

  let raids;
  let recordCount;

  if (filter === 'awaiting') {
    recordCount = await db
      .collection('raids')
      .find({ status: 'Awaiting' })
      .count();
  } else if (filter === 'preparing') {
    recordCount = await db
      .collection('raids')
      .find({ status: 'Preparing' })
      .count();
  } else if (filter === 'raiding') {
    recordCount = await db
      .collection('raids')
      .find({ status: 'Raiding' })
      .count();
  } else if (filter === 'shipped') {
    recordCount = await db
      .collection('raids')
      .find({ status: 'Shipped' })
      .count();
  }

  if (filter === 'awaiting') {
    raids = await db
      .collection('raids')
      .find({ status: 'Awaiting' })
      .skip(skip)
      .limit(10)
      .toArray();
  } else if (filter === 'preparing') {
    raids = await db
      .collection('raids')
      .find({ status: 'Preparing' })
      .skip(skip)
      .limit(10)
      .toArray();
  } else if (filter === 'raiding') {
    raids = await db
      .collection('raids')
      .find({ status: 'Raiding' })
      .skip(skip)
      .limit(10)
      .toArray();
  } else if (filter === 'shipped') {
    raids = await db
      .collection('raids')
      .find({ status: 'Shipped' })
      .skip(skip)
      .limit(10)
      .toArray();
  }

  res.status(200).json({ raids, recordCount });
}

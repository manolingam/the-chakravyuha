import { connectToDatabase } from '../../utils/mongo';

export default async function handler(req, res) {
  const { filter } = req.body;

  const { db } = await connectToDatabase();

  const consultations =
    filter === 'cancelled'
      ? await db
          .collection('consultations')
          .aggregate([{ $match: { consultation_hash: 'cancelled' } }])
          .toArray()
      : filter === 'completed'
      ? await db
          .collection('consultations')
          .find({ consultation_hash: { $ne: null } })
          .toArray()
      : await db
          .collection('consultations')
          .find({ consultation_hash: { $not: { $ne: null } } })
          .toArray();

  res.status(200).json({ consultations });
}

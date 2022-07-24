import { connectToDatabase } from '../../utils/mongo';

export default async function handler(req, res) {
  const { filter, skip } = req.body;

  const { db } = await connectToDatabase();

  const recordCount =
    filter === 'cancelled'
      ? await db
          .collection('consultations')
          .find({ consultation_hash: 'cancelled' })
      : filter === 'completed'
      ? await db
          .collection('consultations')
          .find({ consultation_hash: { $ne: null } })
          .count()
      : await db
          .collection('consultations')
          .find({ consultation_hash: { $not: { $ne: null } } })
          .count();

  const consultations =
    filter === 'cancelled'
      ? await db
          .collection('consultations')
          .find({ consultation_hash: 'cancelled' })
          .skip(skip)
          .limit(10)
          .toArray()
      : filter === 'completed'
      ? await db
          .collection('consultations')
          .find({ consultation_hash: { $ne: null } })
          .skip(skip)
          .limit(10)
          .toArray()
      : await db
          .collection('consultations')
          .find({ consultation_hash: { $not: { $ne: null } } })
          .skip(skip)
          .limit(10)
          .toArray();

  res.status(200).json({ consultations, recordCount });
}

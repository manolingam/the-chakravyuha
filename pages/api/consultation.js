import { connectToDatabase } from '../../utils/mongo';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.body;

  const { db } = await connectToDatabase();

  const consultation = await db
    .collection('consultations')
    .aggregate([{ $match: { _id: ObjectId(id) } }])
    .toArray();

  res.status(200).json({ consultation });
}

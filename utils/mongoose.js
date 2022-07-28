import mongoose from 'mongoose';
import { CONFIG } from '../config';

const connectMongo = async () => mongoose.connect(CONFIG.MONGODB_URI);

export default connectMongo;

import mongoose from 'mongoose';

const MONGO_URL = `mongodb+srv://nasa-api:KmBwJz2VhjLaaj0n@nasacluster.zllqcbs.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready!');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

export async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

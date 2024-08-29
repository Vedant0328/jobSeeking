import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: 'MERN_JOB_SEEKING',
    })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.log(`Error in connection with database ${err}`);
    });
};

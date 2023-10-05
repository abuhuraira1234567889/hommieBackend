import { error } from 'console';
import dotenv from 'dotenv';

dotenv.config();
const DB = process.env.DB;
const mongoose = require('mongoose');

export async function Connect() {
  await mongoose.connect(
    DB,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUndefinedTopology: true,
    },
    () => {
      console.log('database is connected');
    }
  );
}

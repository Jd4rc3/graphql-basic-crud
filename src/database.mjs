import mongoose from 'mongoose';

/**
 * @description Connect to the database
 * @return {Promise<void>}
 * @async
 * @example
 * connect();
 **/
export async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongodbgraphql', {
      useNewUrlParser: true,
    });

    console.log('Database is connected');
  } catch (error) {
    console.error(error);
    console.log('Database is not connected');
  }
}

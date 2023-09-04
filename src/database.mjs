import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongodbgraphql', {
            useNewUrlParser: true,
        })

        console.log('Database is connected');
    } catch (error) {
        console.error(error);
        console.log('Database is not connected');
    }
}

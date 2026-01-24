const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../../.env' }); // Adjust path if needed or just use default

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medyxra');
        console.log('DB Connected');

        // Drop Indexes
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            if (collection.collectionName === 'users') {
                console.log('Dropping Users Collection to clear bad states...');
                try {
                    await collection.drop();
                    console.log('Users collection dropped.');
                } catch (e) {
                    console.log('Error dropping collection (maybe didnt exist)', e.message);
                }
            }
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();

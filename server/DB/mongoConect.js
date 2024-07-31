import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gili:wallpapers@cluster0.uuibaeu.mongodb.net/wallpaper', {
            // remove useNewUrlParser and useUnifiedTopology as they are deprecated
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export { connectToDB };
// // mongoConnect.js
// const mongoose = require('mongoose');

// const connectToDB = async () => {
//     try {
//         await mongoose.connect('your-mongodb-uri-here', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected...');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

//  export default connectToDB;

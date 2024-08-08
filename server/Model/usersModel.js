// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     name: { type: String, unique: true, required: true },
//     userId: { type: Number, unique: true, required: true },
//     profile: String,
//     password: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     myImages: { type: [Number], default: [] },
//     collections: { type: [[String, Number]], default: [] },
//     favorites: { type: [Number], default: [] },
//     isDeleted: { type: Boolean, default: false }
// });

// // נסה להוסיף את השורה הזו כדי לוודא שהאינדקס נוצר במידה והוא לא קיים
// userSchema.index({ userId: 1 }, { unique: true });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//     // Compare the hashed password with the candidate password
//     return await bcrypt.compare(candidatePassword, this.password);
// };
// const User = mongoose.model('User', userSchema);
// export default User;
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// //import { getNextUserId } from '../utils/idGenerator.js';

// const userSchema = new mongoose.Schema({
//     name: { type: String, unique: true, required: true },
//     userId: { type: Number, unique: true },
//     profile: String,
//     password: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     myImages: [Number],
//     collections: [[String, Number]],
//     favorites: [Number],
//     isDeleted: { type: Boolean, default: false }
// });

// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//         // Hash the password before saving
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// userSchema.comparePassword = async function (candidatePassword) {
//     // Compare the hashed password with the candidate password
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// export default User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//     name: { type: String, unique: true, required: true },
//     userId: { type: Number, unique: true },
//     profile: String,
//     password: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     myImages: [Number],
//     collections: [[String, Number]],
//     favorites: [Number],
//     isDeleted: { type: Boolean, default: false }
// });

// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//         // Hash the password before saving
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// // הוספת המתודה comparePassword תחת methods של הסכמה
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     // Compare the hashed password with the candidate password
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// export default User;
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// /**
//  * @typedef {Object} IUser
//  * @property {string} name
//  * @property {number} userId
//  * @property {string} [profile]
//  * @property {string} password
//  * @property {string} email
//  * @property {number[]} [myImages]
//  * @property {Array<[string, number]>} [collections]
//  * @property {number[]} [favorites]
//  * @property {boolean} [isDeleted]
//  * @property {Function} comparePassword - Method to compare passwords
//  */

// /**
//  * @type {mongoose.Schema<IUser>}
//  */
// const userSchema = new mongoose.Schema({
//     name: { type: String, unique: true, required: true },
//     userId: { type: Number, unique: true },
//     profile: String,
//     password: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     myImages: [Number],
//     collections: [[String, Number]],
//     favorites: [Number],
//     isDeleted: { type: Boolean, default: false }
// });

// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//         // Hash the password before saving
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// /**
//  * Compare the hashed password with the candidate password
//  * @param {string} candidatePassword - The password to compare
//  * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false
//  */
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// export default User;
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    userId: { type: Number, unique: true },
    profile: String,
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    myImages: [Number],
    collections: [{
        type: { type: String, required: true }, // מחרוזת המייצגת את שם האוסף
        items: [Number] // מערך של מספרים
    }],
    favorites: [Number],
    isDeleted: { type: Boolean, default: false }
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

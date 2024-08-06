import User from '../Model/usersModel.js';

// יצירת יוזר חדש
export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// עדכון יוזר לפי ID
export const updateUserById = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

// מחיקת יוזר לפי ID (מעכשיו לא מוחק, אלא מסמן כמותאם)
export const deleteUserById = async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

// פעולה שמחזירה את כל האוספים של יוזר
export const getUserCollections = async (userId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    return user.collections;
};

// פעולה שמחזירה יוזר לפי ה-ID שלו
export const getUserById = async (userId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

// פעולה שמוסיפה תמונה לאוסף של יוזר
export const addImageToCollection = async (userId, collectionName, imageId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }

    // בודקים אם האוסף קיים, אם לא מוסיפים אוסף חדש
    let collection = user.collections.find(c => c[0] === collectionName);
    if (!collection) {
        collection = [collectionName, []];
        user.collections.push(collection);
    }

    // מוסיפים את ה-ID של התמונה לאוסף
    collection[1].push(imageId);
    await user.save();
    return user;
};

// פעולה שמחזירה את כל התמונות של יוזר
export const getUserImages = async (userId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    const images = await Image.find({ id: { $in: user.myImages }, isDeleted: false });
    return images;
};




// import User from '../Model/usersModel.js';  // Import your User model

// // Create a new user
// export const createUser = async (userData) => {
//     const user = new User(userData);
//     return await user.save();
// };

// // Update user by ID
// export const updateUserById = async (id, userData) => {
//     return await User.findByIdAndUpdate(id, userData, { new: true });
// };

// // Delete user by ID (mark as deleted)
// export const deleteUserById = async (id) => {
//     return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
// };

// // Get user collections
// export const getUserCollections = async (userId) => {
//     const user = await User.findOne({ userId, isDeleted: false });
//     if (!user) throw new Error('User not found');
//     return user.collections;
// };

// // Get user by ID
// export const getUserById = async (userId) => {
//     const user = await User.findOne({ userId, isDeleted: false });
//     if (!user) throw new Error('User not found');
//     return user;
// };

// // Add image to user's collection
// export const addImageToCollection = async (userId, collectionName, imageId) => {
//     const user = await User.findOne({ userId, isDeleted: false });
//     if (!user) throw new Error('User not found');

//     // Check if collection exists, if not, add new collection
//     let collection = user.collections.find(c => c[0] === collectionName);
//     if (!collection) {
//         collection = [collectionName, []];
//         user.collections.push(collection);
//     }

//     // Add image ID to the collection
//     collection[1].push(imageId);
//     await user.save();
//     return user;
// };

// // Get user images
// export const getUserImages = async (userId) => {
//     const user = await User.findOne({ userId, isDeleted: false });
//     if (!user) throw new Error('User not found');
//     const images = await Image.find({ id: { $in: user.myImages }, isDeleted: false });
//     return images;
// };

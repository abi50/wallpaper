import Image from '../Model/imagesModel.js';
import User from '../Model/usersModel.js';

// מחיקת תמונה לפי ID (מעכשיו לא מוחק, אלא מסמן כמותאם)
export const deleteImageByIdService = async (id) => {
    return await Image.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

// פעולה שמחזירה תמונה לפי קוד
export const getImageByCodeService = async (code) => {
    const image = await Image.findOne({ code, isDeleted: false });
    if (!image) {
        throw new Error('Image not found');
    }
    return image;
};

// פעולה שמחזירה את כל התמונות של יוזר
export const getUserImagesService = async (userId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    const images = await Image.find({ id: { $in: user.myImages }, isDeleted: false });
    return images;
};

// הוספת תמונה למועדפים
export const addImageToFavoritesService = async (userId, imageId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.favorites.includes(imageId)) {
        user.favorites.push(imageId);
        await user.save();
    }
    return user;
};

// הוספת תמונה לאוסף
export const addImageToCollectionService = async (userId, collectionName, imageId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    const collection = user.collections.find(([name]) => name === collectionName);
    if (collection) {
        collection[1].push(imageId);
    } else {
        user.collections.push([collectionName, [imageId]]);
    }
    await user.save();
    return user;
};

// החזרת מספר הלייקים של תמונה
export const getImageLikesService = async (code) => {
    const image = await Image.findOne({ code, isDeleted: false });
    if (!image) {
        throw new Error('Image not found');
    }
    return image.likes;
};

// החזרת תמונות מועדפות של יוזר
export const getFavoriteImagesService = async (userId) => {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    const images = await Image.find({ id: { $in: user.favorites }, isDeleted: false });
    return images;
};

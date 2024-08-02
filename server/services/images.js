import Image from '../Model/imagesModel.js';
import User from '../Model/usersModel.js';

export const deleteImageByIdService = async (id) => {
    const image = await Image.findOneAndDelete({ id });
    if (!image) {
        throw new Error('Image not found');
    }
};

export const getImageByCodeService = async (code) => {
    const image = await Image.findOne({ code });
    if (!image) {
        throw new Error('Image not found');
    }
    return image;
};

export const getUserImagesService = async (userId) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    const images = await Image.find({ id: { $in: user.myImages } });
    return images;
};

export const addImageToFavoritesService = async (userId, imageId) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.favorites.includes(imageId)) {
        user.favorites.push(imageId);
        await user.save();
    }
    return user;
};

export const addImageToCollectionService = async (userId, collectionName, imageId) => {
    const user = await User.findOne({ id: userId });
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

export const getImageLikesService = async (code) => {
    const image = await Image.findOne({ code });
    if (!image) {
        throw new Error('Image not found');
    }
    return image.likes;
};

export const getFavoriteImagesService = async (userId) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    const images = await Image.find({ id: { $in: user.favorites } });
    return images;
};

import Image from '../Model/imagesModel.js';
import User from '../Model/usersModel.js';
import { getNextImageId } from '../utils/idGenerator.js';
import Category from '../Model/categoryModel.js';
//יצירת תמונה

export const createImageService = async (req) => {
    const { userName, categories } = req.body;
    if (!userName) {
        throw new Error('userName is required');
    }

    const user = await User.findOne({ name: userName });
    if (!user) {
        throw new Error('User does not exist');
    }

    const imageId = await getNextImageId();
    const url = `/uploads/${req.file.filename}`;
    user.myImages.push(imageId);
    const image = new Image({
        url,
        userName,
        categories: JSON.parse(categories),
        imageId
    });

    await image.save();
    return image;
};
// מחיקת תמונה לפי ID (מעכשיו לא מוחק, אלא מסמן כמותאם)
export const deleteImageByIdService = async (imageId) => {
    return await Image.findByIdAndUpdate({ imageId : imageId, isDeleted: true }, { new: true });
};


// פעולה שמחזירה תמונה לפי קוד
export const getImageByCodeService = async (code) => {
    const image = await Image.findOne({ imageId:code, isDeleted: false });
    if (!image) {
        throw new Error('Image not found');
    }
    return image;
};

// פעולה שמחזירה את כל התמונות של יוזר
export const getUserImagesService = async (userId) => {
    const user = await User.findOne({ userId: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    const images = await Image.find({ imageId: { $in: user.myImages }, isDeleted: false });
    return images;
};

// הוספת תמונה למועדפים
export const addImageToFavoritesService = async (userId, imageId) => {
    const user = await User.findOne({ userId: userId, isDeleted: false });
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
// export const addImageToCollectionService = async (userId, collectionName, imageId) => {
//     const user = await User.findOne({ userId: userId, isDeleted: false });
//     if (!user) {
//         throw new Error('User not found');
//     }
//     const collection = user.collections.find(([name]) => name === collectionName);
//     if (collection) {
//         collection[1].push(imageId);
//     } else {
//         user.collections.push([collectionName, [imageId]]);
//     }
//     await user.save();
//     return user;
// };

// החזרת מספר הלייקים של תמונה
export const getImageLikesService = async (imageId) => {
    const image = await Image.findOne({ imageId:imageId, isDeleted: false });
    if (!image) {
        throw new Error('Image not found');
    }
    return image.likes;
};

// החזרת תמונות מועדפות של יוזר
export const getFavoriteImagesService = async (userId) => {
    const user = await User.findOne({ userId: userId, isDeleted: false });
    if (!user) {
        throw new Error('User not found');
    }
    const images = await Image.find({ imageId: { $in: user.favorites }, isDeleted: false });
    return images;
};

export const getImagesWithPaginationService = async (page, limit) => {
    const skip = (page - 1) * limit;
    return await Image.find({ isDeleted: false })
        .skip(skip)
        .limit(limit)
        .exec();
};

export const addLikeToPictureService = async (imageId) => {
    try {
        const image = await Image.findOne({ imageId: imageId });
        if (image) {
            image.likes += 1;
            await image.save();
            return image;
        }
        return null; // Image not found
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getImagesByCategory = async (categoryName) => {
    console.log(categoryName );
    const category = await Category.findOne({  isDeleted: false, name: categoryName });

    
    console.log(category);

    if (!category) {
        return { message: 'Sorry, but there is no such category. Please consider adding images related to this category.' };
    }

    const images = await Image.find({ categories: category.code, isDeleted: false });
    return { images };
};

export const getAllImages = async () => {
    return await Image.find({ isDeleted: false });
};
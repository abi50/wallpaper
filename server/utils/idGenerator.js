
import User from '../Model/usersModel.js';
import Image from '../Model/imagesModel.js';
import Category from '../Model/categoryModel.js';


let userCounter = 1; // אתחול הספירה למשתמשים

export const getNextUserId = async () => {
    const lastUser = await User.findOne().sort({ userId: -1 });
    if (lastUser && lastUser.userId) {
        userCounter = lastUser.userId + 1;
    } else {
        userCounter = 1;
    }
    console.log('Next User ID:', userCounter);
    return userCounter;
};

let imageCounter = 1; // אתחול הספירה למשתמשים

export const getNextImageId = async () => {
    const lastImage = await Image.findOne().sort({ imageId: -1 });
    if (lastImage && lastImage.imageId) {
        imageCounter = lastImage.imageId + 1;
    } else {
        imageCounter = 1;
    }
    console.log('Next image ID:', imageCounter);
    return imageCounter;
};

let categoryCounter = 1;

export const getNextCategoryId = async () => {
    const lastCategory = await Category.findOne().sort({ code: -1 });
    if (lastCategory && lastCategory.code) {
        categoryCounter = lastCategory.code + 1;
    } else {
        categoryCounter = 1;
    }
    console.log('Next Category Code:', categoryCounter);
    return categoryCounter;
};
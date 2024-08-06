
import User from '../Model/usersModel.js';
import Image from '../Model/imagesModel.js';



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
    const lastImage = await User.findOne().sort({ userId: -1 });
    if (lastImage && lastImage.userId) {
        imageCounter = lastImage.userId + 1;
    } else {
        imageCounter = 1;
    }
    console.log('Next image ID:', imageCounter);
    return imageCounter;
};


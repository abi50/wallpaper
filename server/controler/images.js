import Image from '../Model/imagesModel.js';
import User from '../Model/usersModel.js';
import { 
    deleteImageByIdService,
    getImageByCodeService,
    getUserImagesService,
    addImageToFavoritesService,
    addImageToCollectionService,
    getFavoriteImagesService
} from '../services/images.js';

export const createImage = async (req, res) => {
    try {
        const { userName, ...imageData } = req.body;
        if (!userName) {
            return res.status(400).send({ message: 'userName is required' });
        }

        const user = await User.findOne({ name: userName });
        if (!user) {
            return res.status(400).send({ message: 'User does not exist' });
        }

        const imageId = await getNextImageId();
        const image = new Image({ ...imageData, userName, imageId });
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(400).send(error.message);
    }
};



// export const createImage = async (req, res) => {
//     try {
//         const { userId, ...imageData } = req.body;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).send({ message: 'User does not exist' });
//         }

//         const image = new Image(imageData);
//         await image.save();
//         res.status(201).json(image);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };

// פעולה שמוחקת תמונה לפי ID
export const deleteImageByIdController = async (req, res) => {
    try {
        await deleteImageByIdService(req.params.imageId);
        res.send({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// פעולה שמחזירה תמונה לפי קוד
export const getImageByCodeController = async (req, res) => {
    try {
        const image = await getImageByCodeService(req.params.code);
        res.json(image);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// פעולה שמחזירה את כל התמונות של יוזר
export const getUserImagesController = async (req, res) => {
    try {
        const images = await getUserImagesService(req.params.imageId);
        res.json(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// פעולה שמוסיפה תמונה למועדפים
export const addImageToFavoritesController = async (req, res) => {
    try {
        const { userId, imageId } = req.body;
        const user = await addImageToFavoritesService(userId, imageId);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// פעולה שמוסיפה תמונה לאוסף
export const addImageToCollectionController = async (req, res) => {
    try {
        const { userId, collectionName, imageId } = req.body;
        const user = await addImageToCollectionService(userId, collectionName, imageId);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// פעולה שמחזירה את כל התמונות המועדפות של יוזר
export const getFavoriteImagesController = async (req, res) => {
    try {
        const images = await getFavoriteImagesService(req.params.imageId);
        res.json(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

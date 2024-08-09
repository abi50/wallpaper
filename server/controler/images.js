import Image from '../Model/imagesModel.js';
import User from '../Model/usersModel.js';
import fs from 'fs';
import { 
    getAllImages,
    getImagesByCategory,
    createImageService,
    deleteImageByIdService,
    getImageByCodeService,
    getUserImagesService,
    addImageToFavoritesService,
    getFavoriteImagesService,
    getImagesWithPaginationService

} 
from '../services/images.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadImage = async (req, res) => {
    try {
        console.log("nhjfdkjv");

        const { imageId } = req.params;
        console.log(imageId);

        // שימוש ב-await לחכות לתוצאה של findOne
        const image = await Image.findOne({ imageId: Number(imageId), isDeleted: false });
        console.log(image);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Adjust the file path based on where the image is stored
        const filePath = path.join(__dirname, "../", image.url);
        console.log(filePath);
        
        res.download(filePath, (err) => {
            if (err) {
                res.status(404).json({ message: 'Image not found' });
            }
        });
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const createImageController = async (req, res) => {
    try {
        const image = await createImageService(req);
        res.status(201).json(image);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
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

        const image = new Image({ userName, ...imageData });
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


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
        console.log(req.params.imageId);

        const image = await getImageByCodeService(req.params.imageId);
        res.json(image);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export const getImageBtId = async (req, res) => {
    try {
        console.log("in getImageBtId");

        const { imageId } = req.params;
        const image = await getImageByCodeService(imageId);
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
// export const addImageToCollectionController = async (req, res) => {
//     try {
//         const { userId, collectionName, imageId } = req.body;
//         const user = await addImageToCollectionService(userId, collectionName, imageId);
//         res.json(user);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };

// פעולה שמחזירה את כל התמונות המועדפות של יוזר
export const getFavoriteImagesController = async (req, res) => {
    try {
        const images = await getFavoriteImagesService(req.params.imageId);
        res.json(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
};
export const getImagesWithPagination = async (req, res) => {
    try {
        console.log("zxcvbnm,")
        const { page = 1, limit = 10 } = req.query;
        const images = await getImagesWithPaginationService(Number(page), Number(limit));
        res.json(images);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
export async function getImages(req, res) {
    const { page = 1, limit = 10, category } = req.query;
    const skip = (page - 1) * limit;
    console.log(category)
    try {
        let query = { isDeleted: false };
        if (category) {
            const categoryDoc = await Category.findOne({ name: category });
            if (categoryDoc) {
                query = { ...query, categories: categoryDoc.code };
            } else {
                return res.status(404).json({ message: 'Category not found. Please add images related to this category.' });
            }
        }
        const images = await Image.find(query).skip(skip).limit(Number(limit));
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const searchImages = async (req, res) => {
    console.log("fg")

    const { category } = req.query;
    console.log(category)
    console.log("fg")
    

    try {
        if (!category) {
            const images = await getAllImages();
            return res.json(images);
        }

        const result = await getImagesByCategory(category);
        
        if (result.message) {
            return res.status(404).json({ message: result.message });
        }

        res.json(result.images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
};

export const addLikeToPicture = async (req, res) => {
    const { imageId } = req.params; // קבלת מזהה התמונה מה-params של הבקשה
    console.log(imageId)

    try {
        // חיפוש התמונה לפי imageId
        const image = await Image.findOne({ imageId: Number(imageId), isDeleted: false });
        console.log(image)
        if (!image) {
            // אם התמונה לא נמצאת או נמחקה, החזר שגיאה
            return res.status(404).json({ message: 'Image not found' });
        }

        // עדכון מספר הלייקים
        image.likes += 1;

        // שמירה של התמונה עם הלייק החדש
        await image.save();

        // החזרת תגובה מוצלחת
        res.status(200).json({ message: 'Like added successfully', image });
    } catch (error) {
        // טיפול בשגיאות
        console.error('Error adding like:', error);
        res.status(500).json({ message: 'Server error' });
    }
};







// Get image by imageId
export const getImageById = async (req, res) => {
    try {
        const { imageId } = req.params;
        const image = await Image.findOne({ imageId: parseInt(imageId), isDeleted: false });
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get image by path
export const getImageByPath = async (req, res) => {
    try {
        const { url } = req.query; // Assuming the path is sent as a query parameter
        if (!url) {
            return res.status(400).json({ error: 'Image URL is required' });
        }
        const imagePath = path.join(__dirname, '..', url);
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({ error: 'Image not found' });
            }
            res.sendFile(imagePath);
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


export const incrementDownloadCounter = async (req, res) => {
    try {
        const { imageId } = req.params;
        const image = await Image.findOneAndUpdate(
            { imageId: imageId },
            { $inc: { downloadsCounter: 1 } },  // הגדלת מונה ההורדות ב-1
            { new: true }
        );

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json({ success: true, downloadsCounter: image.downloadsCounter });
    } catch (error) {
        console.error('Error incrementing download counter:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
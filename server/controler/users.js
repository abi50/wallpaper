import User from '../Model/usersModel.js';
import { 
    deleteUserById as deleteUserByIdService,
    getUserCollections as getUserCollectionsService,
    getUserById as getUserByIdService,
    addImageToCollection as addImageToCollectionService,
    getUserImages as getUserImagesService
} from '../services/users.js';

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// בקר שמחזיר יוזר לפי ה-ID שלו
export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export const updateUserByIdController = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ id: req.params.id, isDeleted: false }, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteUserByIdController = async (req, res) => {
    try {
        await deleteUserByIdService(req.params.id);
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// בקר שמחזיר את כל האוספים של יוזר
export const getUserCollectionsController = async (req, res) => {
    try {
        const collections = await getUserCollectionsService(req.params.id);
        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// בקר שמחזיר את כל התמונות של יוזר
export const getUserImagesController = async (req, res) => {
    try {
        const images = await getUserImagesService(req.params.id);
        res.json(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// בקר שמוסיף תמונה לאוסף של יוזר
export const addImageToCollectionController = async (req, res) => {
    try {
        const { userId, collectionName, imageId } = req.body;
        const user = await addImageToCollectionService(userId, collectionName, imageId);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


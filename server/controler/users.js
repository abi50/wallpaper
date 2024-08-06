import User from '../Model/usersModel.js';
import {
    deleteUserById as deleteUserByIdService,
    getUserCollections as getUserCollectionsService,
    getUserById as getUserByIdService,
    addImageToCollection as addImageToCollectionService,
    getUserImages as getUserImagesService
} from '../services/users.js';
import { getNextUserId } from '../utils/idGenerator.js';

export const createUser = async (req, res) => {
    try {
        const { name, profile, email, password } = req.body;

        const userId = await getNextUserId();
        console.log('Generated User ID:', userId);
        if (isNaN(userId)) {
            throw new Error('Failed to generate valid userId');
        }
        console.log('Next User ID:', userId);
       
        if (await User.findOne({ name, isDeleted: false })) {
            return res.status(400).send({ message: 'Username already exists' });
        }
        if (await User.findOne({ email, isDeleted: false })) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        const user = new User({ name, userId, profile, email, password });
        console.log('User before save:', user);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(400).send(error.message);
    }
};
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
        res.status(400).send(error.message);
    }
};

export const deleteUserByIdController = async (req, res) => {
    try {
        await deleteUserByIdService(req.params.id);
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getUserCollectionsController = async (req, res) => {
    try {
        const collections = await getUserCollectionsService(req.params.id);
        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserImagesController = async (req, res) => {
    try {
        const images = await getUserImagesService(req.params.id);
        res.json(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export const addImageToCollectionController = async (req, res) => {
    try {
        const { userId, collectionName, imageId } = req.body;
        const user = await addImageToCollectionService(userId, collectionName, imageId);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

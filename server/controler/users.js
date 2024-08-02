import User from '../Model/usersModel.js';
import { deleteUserById as deleteUserByIdService, getUserCollections as getUserCollectionsService } from '../services/users.js';

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getUserByName = async (req, res) => {
    try {
        const name = req.params.name;
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
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
        const { id } = req.params;
        await deleteUserByIdService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserCollectionsController = async (req, res) => {
    try {
        const { id } = req.params;
        const collections = await getUserCollectionsService(id);
        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

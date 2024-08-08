import User from '../Model/usersModel.js';
import {
    deleteUserById as deleteUserByIdService,
    getUserById as getUserByIdService,
    getUserImages as getUserImagesService,
    ImageToMyImagesService

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
        console.log("id=");
        console.log(req.params.userId); // כאן צריך להיות userId
        const user = await getUserByIdService(req.params.userId); // כאן גם צריך להיות userId
        res.json(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export const updateUserByIdController = async (req, res) => {
    try {
        // הגדר אובייקט עדכון המבוסס על הגוף של הבקשה
        const updates = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            // הוסף כאן שדות נוספים לפי הצורך
        };
            console.log("user id is", req.params.userId)
        const user = await User.findOneAndUpdate(
            { userId: req.params.userId, isDeleted: false }, // וודא שהשדה userId תואם
            updates, // אובייקט עדכון
            { new: true, runValidators: true }
        );

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
        await deleteUserByIdService(req.params.userId);
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getUserCollectionsController = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user.collections);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getUserImagesController = async (req, res) => {
    try {
        const images = await getUserImagesService(req.params.userId);
        res.json(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
};
export const addImageToMyImagesController = async (req, res) => {
    try {
        const { userId, imageId } = req.body;
        const user = await ImageToMyImagesService(userId, imageId);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};



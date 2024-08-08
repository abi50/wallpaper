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
        await deleteUserByIdService(req.params.id);
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// export const getUserCollectionsController = async (req, res) => {
//     try {
//         const collections = await getUserCollectionsService(req.params.id);
//         res.json(collections);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// GET /users/:id/collections - לקבל את כל האוספים של משתמש לפי ID
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
// POST /users/:id/collections - הוספת אוסף חדש למשתמש
export const addCollectionToUserController = async (req, res) => {
    try {
        const { type, items } = req.body;

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // הוספת האוסף החדש
        user.collections.push({ type, items });
        await user.save();

        res.status(201).json(user.collections);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
// PUT /users/:id/collections/:type - עדכון אוסף לפי שם למשתמש
export const updateCollectionController = async (req, res) => {
    try {
        const { items } = req.body;

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const collectionIndex = user.collections.findIndex(c => c.type === req.params.type);
        if (collectionIndex === -1) {
            return res.status(404).send('Collection not found');
        }

        // עדכון האוסף
        user.collections[collectionIndex].items = items;
        await user.save();

        res.json(user.collections[collectionIndex]);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
// DELETE /users/:id/collections/:type - מחיקת אוסף לפי שם למשתמש
export const deleteCollectionController = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const collectionIndex = user.collections.findIndex(c => c.type === req.params.type);
        if (collectionIndex === -1) {
            return res.status(404).send('Collection not found');
        }

        // מחיקת האוסף
        user.collections.splice(collectionIndex, 1);
        await user.save();

        res.status(204).send(); // מחיקת אוסף, לא מחזירים תוכן
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// GET /users/:id/collections/:type - לקבל אוסף לפי שם (type) של משתמש לפי ID
export const getCollectionByTypeController = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const collection = user.collections.find(c => c.type === req.params.type);
        if (!collection) {
            return res.status(404).send('Collection not found');
        }

        res.json(collection);
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

export const addImageToCollectionController = async (req, res) => {
    try {
        const { userId, collectionName, imageId } = req.body;
        const user = await addImageToCollectionService(userId, collectionName, imageId);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

import Image from '../Model/imagesModel.js';
import {
    deleteImageByIdService,
    getImageByCodeService,
    getUserImagesService,
    addImageToFavoritesService,
    addImageToCollectionService,
    getImageLikesService,
    getFavoriteImagesService
} from '../services/images.js';

export const createImage = async (req, res) => {
    try {
        const image = new Image(req.body);
        await image.save();
        res.status(201).send(image);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getImageById = async (req, res) => {
    try {
        const image = await Image.findOne({ id: req.params.id });
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }
        res.send(image);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateImageById = async (req, res) => {
    try {
        const image = await Image.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }
        res.send(image);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteImageById = async (req, res) => {
    try {
        const image = await Image.findOneAndDelete({ id: req.params.id });
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }
        res.send({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteImageByIdController = async (req, res) => {
    try {
        const { code } = req.params;
        await deleteImageByIdService(code);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getImageByCodeController = async (req, res) => {
    try {
        const { code } = req.params;
        const image = await getImageByCodeService(code);
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserImagesController = async (req, res) => {
    try {
        const { id } = req.params;
        const images = await getUserImagesService(id);
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addImageToFavoritesController = async (req, res) => {
    try {
        const { userId, imageId } = req.body;
        const user = await addImageToFavoritesService(userId, imageId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addImageToCollectionController = async (req, res) => {
    try {
        const { userId, collectionName, imageId } = req.body;
        const user = await addImageToCollectionService(userId, collectionName, imageId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getImageLikesController = async (req, res) => {
    try {
        const { code } = req.params;
        const likes = await getImageLikesService(code);
        res.json(likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFavoriteImagesController = async (req, res) => {
    try {
        const { userId } = req.params;
        const images = await getFavoriteImagesService(userId);
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

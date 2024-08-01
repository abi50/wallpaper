// controllers/imageController.js
import Image from '../Model/imagesModel.js';

export const createImage = async (req, res) => {
    try {
        const image = new Image(req.body);
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getImageById = async (req, res) => {
    try {
        const image = await Image.findOne({ id: req.params.id });
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateImageById = async (req, res) => {
    try {
        const image = await Image.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteImageById = async (req, res) => {
    try {
        const image = await Image.findOneAndDelete({ id: req.params.id });
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json({ message: 'Image deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controllers/imageController.js
import Image from '../Model/imagesModel.js';

// Create a new image
export const createImage = async (req, res) => {
    try {
        const newImage = new Image(req.body);
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get an image by ID
export const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.json(image);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an image by ID
export const updateImageById = async (req, res) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.json(image);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an image by ID
export const deleteImageById = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

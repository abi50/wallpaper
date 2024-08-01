import Image from '../Model/imagesModel.js';

// Create a new image
export const createImage = async (imageData) => {
    const image = new Image(imageData);
    return await image.save();
};

// Get an image by ID
export const getImageById = async (id) => {
    return await Image.findById(id);
};

// Update an image by ID
export const updateImageById = async (id, imageData) => {
    return await Image.findByIdAndUpdate(id, imageData, { new: true });
};

// Delete an image by ID
export const deleteImageById = async (id) => {
    return await Image.findByIdAndDelete(id);
};
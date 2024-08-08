import express from 'express';
import multer from 'multer';
import {
    searchImages,
    createImageController,
    getImagesWithPagination,
    addLikeToPicture,
    downloadImage,
    createImage,
    deleteImageByIdController,
    getImageByCodeController,
    getUserImagesController,
    addImageToFavoritesController,
    getFavoriteImagesController
} from '../controler/images.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // התקייה שבה הקבצים יישמרו
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // שם הקובץ יהיה ייחודי
    }
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), createImageController);
router.get('/download/:imageId', downloadImage);
router.get('/',  getImagesWithPagination);
router.get('/search', searchImages);
router.get('/:code', getImageByCodeController);
router.post('/add-to-favorites', addImageToFavoritesController);
router.post('/like/:imageId', addLikeToPicture);
router.post('/',createImage );
router.delete('/:imageId', deleteImageByIdController);
router.get('/:imageId', getImageByCodeController);
router.get('/users/:imageId/images', getUserImagesController);
router.post('/images/add-to-favorites', addImageToFavoritesController);
router.get('/users/:imageId/favorites', getFavoriteImagesController);
router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });
});
export default router;




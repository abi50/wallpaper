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
    getFavoriteImagesController,
    getImageById,
    getImageByPath,
    incrementDownloadCounter
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

// Route to get image by imageId
router.get('/getImageById/:imageId', getImageById);

// Route to get image by path
// router.get('/getImageByPath', getImageByPath); // Assuming the path will be sent as a query parameter






router.post('/upload', upload.single('image'), createImageController);
router.get('/download/:imageId', downloadImage);
router.get('/',  getImagesWithPagination);
router.get('/search', searchImages);

// router.get('/:code', getImageByCodeController);
router.post('/add-to-favorites', addImageToFavoritesController);
router.post('/like/:imageId', addLikeToPicture);
router.post('/',createImage );
// router.get('/getImageBtId/:imageId',  getImageBtId);

router.delete('/:imageId', deleteImageByIdController);
router.get('/users/:imageId/images', getUserImagesController);
router.post('/images/add-to-favorites', addImageToFavoritesController);
router.post('/increment-downloads/:imageId', incrementDownloadCounter);
// router.get('/users/:imageId/favorites', getFavoriteImagesController);
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


router.get('/user/:id/profile', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ profileImageUrl: user.profile });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;




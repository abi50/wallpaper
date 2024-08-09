import express from 'express';
import {
    createUser,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController,
    getUserCollectionsController,
    getUserImagesController,
    addImageToMyImagesController
   
   
} from '../controler/users.js'; // ודא שהנתיב נכון

const router = express.Router();
router.post('/add-image-to-myimages', addImageToMyImagesController); // הוספת תמונה לאוסף
router.post('/', createUser); // יצירת יוזר חדש
router.get('/:userId', getUserByIdController);
router.put('/:userId', updateUserByIdController); // עדכון יוזר לפי ID
router.delete('/:userId', deleteUserByIdController); // מחיקת יוזר לפי ID
router.get('/:userId/collections', getUserCollectionsController); // קבלת אוספים של יוזר
router.get('/:userId/images', getUserImagesController); // קבלת תמונות של יוזר


export default router;

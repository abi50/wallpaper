import express from 'express';
import {
    createUser,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController,
    getUserCollectionsController,
    getUserImagesController,
    addImageToMyImagesController
    // addImageToCollectionController,
    // addCollectionToUserController,
    // updateCollectionController,
    // deleteCollectionController
   
} from '../controler/users.js'; // ודא שהנתיב נכון

const router = express.Router();
router.post('/add-image-to-myimages', addImageToMyImagesController); // הוספת תמונה לאוסף
router.post('/', createUser); // יצירת יוזר חדש
router.get('/:userId', getUserByIdController);
//router.get('/:userId', getUserByIdController); // קבלת יוזר לפי ID
router.put('/:userId', updateUserByIdController); // עדכון יוזר לפי ID
router.delete('/:userId', deleteUserByIdController); // מחיקת יוזר לפי ID
router.get('/:userId/collections', getUserCollectionsController); // קבלת אוספים של יוזר
router.get('/:userId/images', getUserImagesController); // קבלת תמונות של יוזר
// router.post('/add-image-to-collection', addImageToCollectionController); // הוספת תמונה לאוסף
// router.post('/users/:userId/collections', addCollectionToUserController);//הוספת אוסף למשתמש
// router.put('/users/:userId/collections/:type', updateCollectionController);//עדכון אוסף למשתמש
// router.delete('/users/:userId/collections/:type', deleteCollectionController);//מחיקת אוסף למשתמש לפי שם אוסף

export default router;

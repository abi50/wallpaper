// routes/images.js
import express from 'express';
import { createImage,
    getImageById, 
    updateImageById, 
    deleteImageById,
    deleteImageByIdController,
    getImageByCodeController,
    getUserImagesController,
    addImageToFavoritesController,
    addImageToCollectionController,
    getImageLikesController,
    getFavoriteImagesController } 
    from '../controler/images.js';

const router = express.Router();

router.post('/', createImage);
router.get('/:id', getImageById);
router.put('/:id', updateImageById);
router.delete('/:id', deleteImageById);
router.delete('/:code', deleteImageByIdController);
router.get('/code/:code', getImageByCodeController);
router.get('/user/:id', getUserImagesController);
router.post('/favorites', addImageToFavoritesController);
router.post('/collections', addImageToCollectionController);
router.get('/likes/:code', getImageLikesController);
router.get('/favorites/:userId', getFavoriteImagesController);

export default router;



// import express from 'express';
// import imegeModel from '../Model/imagesModel.js';

// const router = express.Router();
// router.get('/route', (req, res) => {
//     res.send('Route!');
//   });
// const routeImage = (app) =>{
//     app.get('/', (req, res) => {
//         res.send('get Image work!')
//       })
//       app.get('/images', (req, res) => {
//         res.send('get Image Image work!')
//       })
      
//       app.put('/',(req,res)=>{
//           res.send("put  Image work")
//       });
//       app.post('/',(req,res)=>{
//           res.send('post Image work')
//       });
//       app.delete('/',(req,res)=>{
//           res.send('delete Image work')
//       });
// }

//   export default routeImage;
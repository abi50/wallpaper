import express from 'express';
import {
    deleteImageByIdController,
    getImageByCodeController,
    getUserImagesController,
    addImageToFavoritesController,
    addImageToCollectionController,
    getFavoriteImagesController
} from '../controler/images.js';

const router = express.Router();

router.delete('/images/:id', deleteImageByIdController);
router.get('/images/:code', getImageByCodeController);
router.get('/users/:id/images', getUserImagesController);
router.post('/images/add-to-favorites', addImageToFavoritesController);
router.post('/images/add-to-collection', addImageToCollectionController);
router.get('/users/:id/favorites', getFavoriteImagesController);

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
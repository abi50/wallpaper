import express from 'express';
import * as imageController from '../controler/images.js';

const router = express.Router();

router.post('/', imageController.createImage);
router.get('/:id', imageController.getImageById);
router.put('/:id', imageController.updateImageById);
router.delete('/:id', imageController.deleteImageById);

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
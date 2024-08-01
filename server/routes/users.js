import express from 'express';
import * as userController from '../controler/users.js';  // ודא שהנתיב נכון

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

export default router;


// import express from 'express';

// const router = express.Router();
// router.get('/route', (req, res) => {
//     res.send('Route!');
//   });
// const routesUser = (app) =>{
//     app.get('/', (req, res) => {
//         res.send('get users work!')
//       })
//       app.get('/users', (req, res) => {
//         res.send('get usersusers work!')
//       })
      
//       app.put('/',(req,res)=>{
//           res.send("put users work")
//       });
//       app.post('/',(req,res)=>{
//           res.send('post users work')
//       });
//       app.delete('/',(req,res)=>{
//           res.send('delete users work')
//       });
    
// }

//   export default routesUser;
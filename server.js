import 'express-async-errors'; // instead of using trycatch 
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
//import {body, validationResult} from 'express-validator';
//import { validateTest } from './middleware/validationMiddleware.js';
import cookieParser from 'cookie-parser';

//import fetch from 'node-fetch';
//import { nanoid } from 'nanoid';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js'

// Middleware 
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser}  from './middleware/authMiddleware.js';

// Public and Upload
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// cloudinary
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));


//  New Features in node
// 1.
// fetch('https://www.course-api.com/react-useReducer-cart-project')
// .then(res => res.json())
// .then(data => console.log(data));

// 2.
// const getData = async () =>{
// const response = await  fetch('https://www.course-api.com/react-useReducer-cart-project');
// const cartData = await response.json();
// console.log(cartData);
// }; 
// getData();

// 3.
// try {
// const response = await  fetch('https://www.course-api.com/react-useReducer-cart-project');
// const cartData = await response.json();
// console.log(cartData);
  
// } catch (error) {
//   console.log(error);
// }

// let jobs = [
//   { id: nanoid(), company: 'apple', position: 'front-end' },
//   { id: nanoid(), company: 'google', position: 'back-end' },
// ];


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//app.use(express.static(path.resolve(__dirname, './public')));
    // change to cloudinary for image storage
//app.use(express.static(path.resolve(__dirname, './public')));


//app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.static(path.resolve(__dirname, './client/dist')));

//app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.post('/api/v1/test', 
//   // [body('name').notEmpty().withMessage('name is required').isLength({min: 50}).withMessage('name must be at least 50')], (req, res, next)=>{
//   //  const errors = validationResult(req); 
//   //  //console.log(errors.isEmpty());
//   //  if(!errors.isEmpty()){
//   //   const errorMessages = errors.array().map((error) => error.msg);
//   //   return res.status(400).json({errors: errorMessages});
//   //  }
//   //  next();
//   // },
//   validateTest,
//    (req, res) => {
//     //console.log(req); 
//     const {name} = req.body;
//     //res.json({message:'data received', data: req.body});
//     res.json({message:`hello ${name}`});

// });

// GET ALL JOBS
//app.get('/api/v1/jobs',);

// CREATE JOB
//app.post('/api/v1/jobs',);

// GET SINGLE JOB
//app.get('/api/v1/jobs/:id',);

// EDIT JOB
//app.patch('/api/v1/jobs/:id',);

// DELETE JOB
//app.delete('/api/v1/jobs/:id',);

app.get('/api/v1/test', (req, res) =>{
  res.json({msg: 'test route'});
})


// For All Route
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

//console.log('Current directory:', process.cwd());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});



//Not Found and Error Route
app.use('*', (req, res) => {
  res.status(404).json({msg: 'Not Found'});
});
// app.use((err, req, res, next) => {
//   console.log(err);
//  res.status(500).json({msg: 'something went wrong'});
// });

app.use(errorHandlerMiddleware);


// const port = process.env.PORT || 5100;
// app.listen(port, () => {
//   console.log(`server running on PORT ${port}....`);
// });
const port = process.env.PORT || 5100;


try{
await mongoose.connect(process.env.MONGO_URL);
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
} catch (error) {
  console.log(error);
  process.exit(1);
}

// app.listen(5100, () => {
//   console.log('server running....');
// });
  
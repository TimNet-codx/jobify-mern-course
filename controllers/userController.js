import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
//import { promises as fs } from 'fs';
import { formatImage } from '../middleware/multerMiddleware.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({_id: req.user.userId});
  const userWithoutPassword = user.toJSON(); // it should not send back password
  res.status(StatusCodes.OK).json({user: userWithoutPassword});
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({users, jobs});
};

export const updateUser = async (req, res) => {
// console.log(req.file);
  const newUser = {...req.body};
  delete newUser.password; // it should not send back password
  
  // check if the file image is there and then do the update if is there...
  if(req.file){
    const file = formatImage(req.file);
    //const response = await cloudinary.v2.uploader.upload(req.file.path);
    const response = await cloudinary.v2.uploader.upload(file);

    //await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  
  }

  //console.log(obj);
  const updateUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  // if the user want to change the profile image
  if(req.file && updateUser.avatarPublicId){
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId);
    
  };
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};

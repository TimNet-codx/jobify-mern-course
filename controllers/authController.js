import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
//import bcrypt from 'bcryptjs';
import { comparePassword, hashPassword } from '../Utils/passwordUtils.js';
import { UnauthenticatedError } from '../Errors/customError.js';
import { createJWT } from '../Utils/tokenUtils.js';

export const register = async (req, res) => {
  //res.send('register');
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  //hashing  the Password
  //const salt = await bcrypt.genSalt(10);
  //const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({msg: 'user created'});
};
export const login = async (req, res) => {
  // check if user exists
  // check if password is correct
  
  const user = await User.findOne({email: req.body.email});
//   if(!user) throw new UnauthenticatedError('invalid credentials');
   
//   const isPasswordCorrect = await comparePassword(req.body.password, user.password);
//    if(!isPasswordCorrect) throw new UnauthenticatedError('invalid password');

const isValidUser = user && (await comparePassword(req.body.password, user.password));
if(!isValidUser) throw new UnauthenticatedError('invalid credentials');

const token = createJWT({userId: user._id, role: user.role});

const oneDay = 1000 * 60 * 60 * 24;

res.cookie('token', token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === 'production',
});

  //res.send({token});
  res.status(StatusCodes.OK).json({msg: 'user logged in'});

};

export const logout = (req, res) =>{
  res.cookie('token', 'logout', {
   httpOnly: true,
   expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({msg: 'user logged out'});
}
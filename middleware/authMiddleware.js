import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../Errors/customError.js";
import { verifyJWT } from "../Utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
   //console.log(req.cookies);
   const {token} = req.cookies;
   if(!token) throw new UnauthenticatedError('authentication invalid');

   try {
    // const user = verifyJWT(token);
    // console.log(user);
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '66f171cfca64a3c4858e4d6b';
    req.user = { userId, role, testUser };
    next();
   } catch (error) {
       throw new UnauthenticatedError('authentication invalid');
   }
};

export const authorizePermissions = (...roles) =>{
    return (req, res, next) =>{
      console.log(roles);
      if(!roles.includes(req.user.role)) {
        throw new UnauthorizedError('Unauthorized to access this route');
      }
      next();
    }   
};

export const checkForTestUser = (req, res, next) => {
  if(req.user.testUser) throw new BadRequestError('Demo User. Read Only!');
  next();
};
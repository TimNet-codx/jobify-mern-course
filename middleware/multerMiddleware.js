import multer from "multer";
import DataParser from 'datauri/parser.js';
import path from 'path';

// cb == call back
/*const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, 'public/uploads');
 },
 filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
 },
});
// We change the  above because it don't work free Render when deploy it
*/

// We change the  above because it don't work free Render when deploy it
// For file upload or picture upload
const storage = multer.memoryStorage()
const upload = multer({storage});

const parser = new DataParser();

export const formatImage = (file) => {
  //console.log(file);
  const fileExtension = path.extname(file.originalname).toString()
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
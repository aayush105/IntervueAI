// const multer = require("multer");

// // configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // specify the uploads directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname); // append a unique suffix to the original filename
//   },
// });

// // file filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // accept the file
//   } else {
//     cb(
//       new Error(
//         "Invalid file type. Only .jpeg, .jpg and .png formats are allowed."
//       ),
//       false
//     ); // reject the file
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
//   fileFilter: fileFilter, // apply the file filter
// });

// module.exports = upload; // export the configured multer instance

const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // Use memory storage for image uploads

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
    }
  },
});

module.exports = upload;

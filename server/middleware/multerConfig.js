const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'), // Set the upload folder to ../public/images
    filename: (req, file, cb) => {
        // Extract the extension from the original file name
        const ext = path.extname(file.originalname).toLowerCase();
        // Create a filename with just the date and extension
        const filename = Date.now() + ext;
        cb(null, filename);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('profileImage'); // 'profileImage' is the name of the form field

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload;

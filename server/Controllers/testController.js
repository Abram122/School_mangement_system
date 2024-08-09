const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images')); // specify the folder to store the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // name the file with a timestamp and original extension
    }
});

// Set up file filter
const fileFilter = (req, file, cb) => {
    // Accept only certain file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
    }
};

// Initialize upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3 // limit file size to 3MB
    },
    fileFilter: fileFilter
}).single('image'); // use 'single' for single file upload, 'array' for multiple files

// Controller function to handle file upload
const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        console.log(req.file)
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        // File upload successful
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file.' });
        }
        res.status(200).json({
            message: 'File uploaded successfully.',
            file: req.file
        });
    });
};

module.exports = {
    uploadImage
};

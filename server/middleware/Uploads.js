const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'), 
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = Date.now() + ext;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 50 }, 
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('material'); 

function checkFileType(file, cb) {
    const filetypes = /pdf|doc|docx|ppt|pptx|xls|xlsx/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Invalid File Type!');
    }
}

module.exports = upload;

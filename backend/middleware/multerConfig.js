const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatars");
    },

    filename: (req, file, cb) => {
        // 1. Get the userId from the request (adjust based on how your auth is set up)
        const userId = req.user ? req.user.id : (req.body.userId || "anonymous");
        
        // 2. Extract the file extension (e.g., '.jpg')
        const fileExtension = path.extname(file.originalname);
        
        // 3. Combine them: userId + timestamp + extension
        cb(
        null,
        `user-${userId}-${Date.now()}${fileExtension}`
        );
    },
});

const upload = multer({
    storage,
});

module.exports = upload;

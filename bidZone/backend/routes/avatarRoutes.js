const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig");
const User = require("../models/User");


router.put(
    "/avatar",
    authMiddleware,
    upload.single("avatar"),
    async (req, res) => {
        const user = await User.findById(req.user.id);
        user.avatar = `/uploads/avatars/${req.file.filename}`;
        await user.save();
        res.json({
            message: "Avatar updated",
            avatar: user.avatar,
        });
    }
);

module.exports = router;
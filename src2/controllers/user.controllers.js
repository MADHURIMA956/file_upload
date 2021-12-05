const express = require('express');


const User = require('../models/user.models');
const Gallery = require('../models/gallery.models');


const upload = require('../middleware/upload');
const gallery = require('../middleware/gallery.upload');

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
 
    try {
        const users = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          profile_pic: req.file.path
        });

        return res.status(201).json({users});
      } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
})


router.post('/gallery' ,gallery.any('image'), async (req, res) => {
  const filePaths = req.files.map((file) => file.path);
  try {
    const gallerys = await Gallery.create({
      gallery: filePaths,
      user_id: req.body.user_id,
    });

    return res.status(201).json({gallerys});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports = router;
const express = require('express');


const Product = require('../models/product.models');

const upload = require('../middleware/upload');
 const path = require('path');
const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
 
    try {
        const products = await Product.create({
          name: req.body.name,
          price: req.body.price,
          image_urls: req.file.path,
        });

        return res.status(201).json({products});
      } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
})

router.post('/multiple' ,upload.any('image'), async (req, res) => {
  const filePaths = req.files.map((file) => file.path);
  try {
    const products = await Product.create({
      name: req.body.name,
      price: req.body.price,
      image_urls: filePaths,
    });

    return res.status(201).json({products});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
})


module.exports = router;
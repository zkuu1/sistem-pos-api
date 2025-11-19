const productService = require('../services/product-service');
const fs = require('fs');
const cloudinary = require('../utils/cloudinaryUpload');


// ===================== ADD PRODUCT =====================
const addProduct = async (req, res, next) => {
  try {
    console.log("REQ.FILE:", req.file); // ⬅ cek dulu

    let imageUrl = null;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "dongym",
      });

      console.log("FILE DITERIMA:", req.file); // ⬅ cek detail file

      imageUrl = upload.secure_url;

      fs.unlinkSync(req.file.path);
    }

    req.body.image = imageUrl;

    const result = await productService.addProduct(req.body);

    res.status(200).json({
      status: "success",
      message: "add products successfully",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};



// ===================== UPDATE PRODUCT =====================
const updateProduct = async (req, res, next) => {
  try {
    // jika ada file baru → upload ke cloudinary
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "dongym"
      });

      req.body.image = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const result = await productService.updateProduct(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      message: "update products successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ===================== SEACRH PRODUCT =====================
const searchProduct = async (req, res, next) => {
  try {
    const result = await productService.searchProduct({ keyword: req.params.keyword });
    res.status(200).json({
      message: 'Successfully searched product',
      data: result
    });
  } catch (error) {
    next(error);
  }
};




// ===================== DELETE PRODUCT =====================
const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json({
      status: "success",
      message: "delete products successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ===================== GET ALL PRODUCT =====================
const getAllProduct = async (req, res, next) => {
    try {
        const result = await productService.getProduct(req.body);
        res.status(200).json({
        status: "success",
          message: "get all products successfully",
         data: result
    });
    } catch (error) {
        next(error)
    }
}


module.exports = {
  getAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct
};

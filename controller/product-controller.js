const productService = require('../services/product-service');
const fs = require('fs');
const cloudinary = require('../utils/cloudinaryUpload');


// ===================== ADD PRODUCT =====================
const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        return res.json({
          message: "Product created",
          imageUrl: result.secure_url,
        });
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
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

// ===================== GET PRODUCT BY ID =====================
const getProductById = async(req, res, next) => {
  try {
    const result = await productService.getProductById(req.params.id);
    res.status(200).json({
      message: 'Successfully retrieved product',
      data: result
    })
  } catch (error) {
     console.error("GetProductById Error:", error);

    if (error instanceof ResponseError) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
    
  }
}


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
  getProductById,
  updateProduct,
  deleteProduct,
  searchProduct
};

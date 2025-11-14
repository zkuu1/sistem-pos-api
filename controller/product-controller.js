const productService = require('../services/product-service');


// ===================== ADD PRODUCT =====================
const addProduct = async (req, res, next) => {
  try {
    const result = await productService.addProduct(req.body);
    res.status(200).json({
      status: "success",
      message: "add products successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};


// ===================== UPDATE PRODUCT =====================
const updateProduct = async (req, res, next) => {
  try {
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
  deleteProduct
};

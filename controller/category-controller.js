const categoryService = require('../services/category-service');


// ===================== ADD CATEGORY =====================
const addCategory = async(req,res,next) => {
    try {
        const result = await categoryService.addCategory(req.body);
        res.status(200).json({
        status: 'success',
        message: 'add categories successfully',
        data: result
    })
    } catch (error) {
        next(error)
    }    
}

// ===================== GET CATEGORY BY ID =====================
const getCategoryById = async(req,res,next) => {
    try {
        const result = await categoryService.getCategoryById(req.params.id);
        res.status(200).json({
        message: 'Successfully retrieved category',
        data: result
    })
    } catch (error) {
       
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


// ===================== SEARCH CATEGORY =====================
const searchCategory = async (req, res, next) => {
  try {
    const result = await categoryService.searchCategory({ keyword: req.params.keyword });
    res.status(200).json({
      message: 'Successfully searched category',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ===================== UPDATE CATEGORY =====================
const updateCategory = async(req, res, next) => {
    try {
        const result = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({
            status: true,
            message: 'update categories successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// ===================== DELETE CATEGORY =====================
const deleteCategory = async(req, res, next) => {
    try {
        const result = await categoryService.deleteCategory(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'delete categories sucessfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// ===================== GET ALL CATEGORY =====================
const getAllCategory = async(req, res, next) => {
    try {
        const result = await categoryService.getCategory(req.body);
        res.status(200).json({
            status: 'success',
            message: 'get all category successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addCategory,
    getCategoryById,
    deleteCategory,
    updateCategory,
    getAllCategory,
    searchCategory
}
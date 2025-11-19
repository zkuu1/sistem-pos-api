const categoryService = require('../services/category-service');

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

const updateCategory = async(req, res, next) => {
    try {
        const result = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'update categories successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

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
    deleteCategory,
    updateCategory,
    getAllCategory,
    searchCategory
}
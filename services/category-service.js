const { validate } = require('../validation/validation');
const { CategoryValidation, searchCategoryValidation } = require('../validation/category-validation')
const prisma = require('../client/prisma');
const ResponseError = require('../error/response-error');

// ===================== ADD CATEGORY =====================
const addCategory = async(request) => {
    try {
        const category = await validate(CategoryValidation, request);
        const add = await prisma.category.create({
        data: {
            name: category.name,
            description: category.description,
        }
    })
    return {
        data: add
    }
    } catch (error) {
       handleError(error);
 }
}

// ===================== SEACRH CATEGORY =====================
const searchCategory = async (request) => {
  try {
    const search = validate(searchCategoryValidation, request);

    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: search.keyword, mode: 'insensitive' } },
         
          // { id: { contains: search.keyword, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        description: true,
        products: true
        
      }
    });

    if (categories.length === 0) {
      throw new ResponseError(404, 'No product found');
    }

    return categories;

  } catch (error) {
    throw handleError(error);
  }
};





// ===================== UPDATE CATEGORY =====================
const updateCategory = async(id, request) => {
    try {
        const category = await validate(CategoryValidation, request);
        const update = await prisma.category.update({
        where: { id:Number(id) }
    })

    return {
        data: update
    }
    } catch (error) {
       handleError(error);
    }
}

// ===================== DELETE CATEGORY =====================
const deleteCategory = async(id) => {
    try {
       const deleted = await prisma.category.delete({
         where: { id: Number(id) }
         });

        return {
            data: deleted
        }
    } catch (error) {
        // Jika id tidak ditemukan di database
        if (error.code === 'P2025') {
        throw new ResponseError(404, 'Category tidak ditemukan');
    }
        handleError(error);
    }
}

// ===================== GET ALL CATEGORY =====================
const getCategory = async() => {
    try {
        const getAll = await prisma.category.findMany()
        return {
            data: getAll
        }
    } catch (error) {
         handleError(error);
    }
}


// ===================== ERROR HANDLER GLOBAL =====================
function handleError(error) {
  if (error.name === 'ValidationError') {
    throw new ResponseError(400, error.message);
  }

  if (error.code) {
    throw new ResponseError(500, `Database error: ${error.message}`);
  }

  throw new ResponseError(500, error.message || 'Terjadi kesalahan server');
}

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    searchCategory
}

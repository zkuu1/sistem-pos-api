const { validate } = require('../validation/validation');
const { ProductValidation } = require('../validation/product-validation');
const prisma = require('../client/prisma');
const ResponseError = require('../error/response-error');


// ===================== ADD PRODUCT =====================
const addProduct = async (request) => {
  try {
    const product = validate(ProductValidation, request);

    // Cek apakah categoryId valid
    const categoryExists = await prisma.category.findUnique({
      where: { id: product.categoryId }
    });

    if (!categoryExists) {
      throw new ResponseError(400, "Category ID tidak ditemukan");
    }

    const add = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId
      }
    });

    return {
      data: add
    };

  } catch (error) {
    handleError(error);
  }
};



// ===================== UPDATE PRODUCT =====================
const updateProduct = async(id, request) => {
  try {
    const product = validate(ProductValidation, request);

    const update = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        stock: product.stock
      }
    });

    return {
      data: update
    };

  } catch (error) {
    handleError(error);
  }
};


// ===================== DELETE PRODUCT =====================
const deleteProduct = async(id) => {
  try {
    
    const deleted = await prisma.product.delete({
      where: { id: Number(id) }
    });

    return {
      data: deleted
    };

  } catch (error) {

    // Jika id tidak ditemukan di database
    if (error.code === 'P2025') {
      throw new ResponseError(404, 'Product tidak ditemukan');
    }

    handleError(error);
  }
};

// ===================== GET ALL PRODUCT =====================
const getProduct = async() => {
    try {
        const getAll = await prisma.product.findMany();
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
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
};

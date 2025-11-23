const { validate } = require('../validation/validation');
const { AbsensiValidation, searchAbsensiValidation, getAbsensiByIdValidation } = require('../validation/absensi-validation');
const prisma = require('../client/prisma');
const ResponseError = require('../error/response-error');
console.log('DEBUG: ResponseError =', ResponseError);


// ===================== USER ABSENSI =====================
const userAbsensi = async (request) => {
  try {
    const user = validate(AbsensiValidation, request);

    const absensi = await prisma.absensi.create({
      data: {
        name: user.name,
        isMember: user.isMember, 
        date: user.date,
        status: user.status,
      },
    });

    return { data: absensi };
  } catch (error) {
    throw handleError(error);  
  }
};


// ===================== UPDATE ABSENSI =====================
const updateAbsensi = async(request, id) => {
  try {
    const absensi = await validate(AbsensiValidation, request);
    const update = await prisma.absensi.update({
    where: { id:Number(id) },
     data: {
      name: absensi.name,
      date: absensi.date,
      status: absensi.status
    },
  })
  return {
    data: update
  }
  } catch (error) {
    handleError(error)
  }
}

// ===================== GET ABSENSI BY ID =====================
const getAbsensiById = async (id) => {
  try {
    const request = validate(getAbsensiByIdValidation, { id });

    const absensi = await prisma.absensi.findUnique({
      where: { id: Number(request.id) },
      select: {
        name: true,
        date: true,
        status: true
      }
    });

    if (!absensi) {
      throw ResponseError(404, "Absensi not found");
    }

    return absensi;

  } catch (error) {
    handleError(error);
  }
};


// ===================== SEARCH ABSENSI =====================
const searchAbensi = async (request) => {
  try {
    const search = validate(searchAbsensiValidation, request);

    const absensi = await prisma.absensi.findMany({
      where: {
        OR: [
          { name: { contains: search.keyword, mode: 'insensitive' } },
         
          // { id: { contains: search.keyword, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        date: true,
        status: true,
        isMember: true
      }
    });

    if (absensi.length === 0) {
      throw new ResponseError(404, 'No product found');
    }

    return absensi;

  } catch (error) {
    throw handleError(error);
  }
};

// ===================== DELETE ABSENSI =====================
const deleteAbsensi = async(id) => {
  try {
    const deleted = await prisma.absensi.delete({
      where:{id:Number(id)}
    })
    return {
      data: deleted
    }
  } catch (error) {

    // Jika id tidak ditemukan di database
        if (error.code === 'P2025') {
          throw new ResponseError(404, 'Absensi tidak ditemukan');
        }

    handleError(error)
  }
}

// ===================== GET ABSENSI =====================
const getAbsensi = async(request) => {
  try {
     const get = await prisma.absensi.findMany();
     return {
        data: get
     }
  } catch (error) {
     handleError(error)
  }
}

// ===================== ERROR HANDLER GLOBAL =====================
function handleError(error) {
  if (error.name === 'ValidationError') {
    return new ResponseError(400, error.message);
  }

  if (error.code) {
    return new ResponseError(500, `Database error: ${error.message}`);
  }

  return new ResponseError(500, error.message || 'Terjadi kesalahan server');
}


module.exports = {
  userAbsensi,
  getAbsensiById,
  updateAbsensi,
  deleteAbsensi,
  getAbsensi,
  searchAbensi
};

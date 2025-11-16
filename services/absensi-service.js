const { validate } = require('../validation/validation');
const { AbsensiValidation } = require('../validation/absensi-validation');
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
    where: { id:Number(id) }
  })
  return {
    data: update
  }
  } catch (error) {
    handleError(error)
  }
}

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
  updateAbsensi,
  deleteAbsensi,
  getAbsensi
};

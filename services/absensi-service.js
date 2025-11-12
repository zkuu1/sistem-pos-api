const { validate } = require('../validation/validation');
const { AbsensiValidation } = require('../validation/absensi-validation');
const prisma = require('../client/prisma');
const ResponseError = require('../error/response-error');
console.log('DEBUG: ResponseError =', ResponseError);


const userAbsensi = async (request) => {
  try {
    const user = validate(AbsensiValidation, request);

    const absensi = await prisma.absensi.create({
      data: {
        name: user.name,
        IsMember: user.IsMember,
        date: user.date,
        status: user.status,
      },
    });

    return {
      status: 'success',
      message: 'Absensi berhasil disimpan',
      data: absensi,
    };
  } catch (error) {
    
    if (error.name === 'ValidationError') {
      throw new ResponseError(400, error.message);
    }

    // Prisma/database error
    if (error.code) {
      throw new ResponseError(500, `Database error: ${error.message}`);
    }

    // Error umum lainnya
    throw new ResponseError(500, error.message || 'Terjadi kesalahan server');
  }
};

module.exports = {
  userAbsensi,
};

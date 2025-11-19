const absensiService = require('../services/absensi-service')


// Send Data Absensi
const absensi = async(req, res, next) => {
    try {
    const result = await absensiService.userAbsensi(req.body);
    res.status(200).json({
        status: 'success',
        message: 'Successfully absensi',
        data: result})

    } catch (error) {
        next(error)
    }
}

const searchAbsensi = async (req, res, next) => {
  try {
    const result = await absensiService.searchAbensi({ keyword: req.params.keyword });
    res.status(200).json({
      message: 'Successfully searched absensi',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const updateAbsensi = async(req, res, next) => {
    try {
        const result = await absensiService.updateAbsensi(req.params.id, req.body)
        res.status(200).json({
            status: 'success',
            message: 'update absensi successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteAbsensi = async (req, res, next) => {
    try {
        const result = await absensiService.deleteAbsensi(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'delete absensi successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// Get Data Absensi
const getAllAbsensi = async(req, res) => {
    try {
        const result = await absensiService.getAbsensi(req.body);
        res.status(200).json({
        message: 'Successfully retrieved absensi',
        data: result
        });
    } catch (error) {
        console.error('Error retrieving absensi:', error);
        res.status(500).json({
        message: 'Server error while retrieving users',
        error: error.message
    });
    }
}


module.exports = {
    absensi,
    updateAbsensi,
    deleteAbsensi,
    getAllAbsensi,
    searchAbsensi
}
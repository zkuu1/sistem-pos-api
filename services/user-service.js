const { validate } = require('../validation/validation');
const { registerUserValidation, loginUserValidation, getUserValidation, searchUserValidation, updateUserValidation} = require('../validation/user-validation');
const prisma = require('../client/prisma');
const ResponseError = require('../error/response-error');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');



const registerUser = async (request) => {
  const user = validate(registerUserValidation, request);

  // Cek apakah username atau email sudah terdaftar
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        { name: user.name },
        { email: user.email },
      ],
    },
  });

  if (userExists) {
    throw new ResponseError(400, 'Username or Email already registered');
  }

  // Hash password
  user.password = await bcrypt.hash(user.password, 10);

  // Buat user baru
  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      image: user.image
    },
  });
};

const loginUser = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  // Cari user berdasarkan email
  const user = await prisma.user.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'Email or password is incorrect');
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Email or password is incorrect');
  }

  const token = uuidv4();

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { token },
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
      role: true,
      address: true,
      image: true
    },
  });

  return updatedUser;
};

const getUser = async (name) => {
  const request = validate(getUserValidation, { name });

  const user = await prisma.user.findMany({
    where: {
      name: request.name
    },
    select: {
      name: true,
    }
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
};

const updateUser = async (id, request) => {
  try {
    const update = await validate(updateUserValidation, request)

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name: update.name,
      email: update.email,
      address: update.address,
      role: update.role,
      membership: update.membership,
    },
})

  return {
    data: user
  }
  } catch (error) {
    
  }
};

const deleteUser = async (id, request) => {
  try {
    const deleted = await prisma.user.delete({
    where: { id: Number(idUser) },
  });

  return {
    data: deleted
  }

  } catch (error) {
    handleError(error)
  }
};

const searchUser = async (request) => {
  try {
    const search = validate(searchUserValidation, request);

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search.keyword, mode: 'insensitive' } },
          { email: { contains: search.keyword, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        address: true,
        image: true
      }
    });

    if (users.length === 0) {
      throw new ResponseError(404, 'No users found');
    }

    return users;

  } catch (error) {
    throw handleError(error);
  }
};



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

function searchHandleError(error) {
  throw new ResponseError(404, 'No users found');
}


module.exports = {
  registerUser,
  loginUser,
  getUser,
  searchUser,
  updateUser,
  deleteUser
};

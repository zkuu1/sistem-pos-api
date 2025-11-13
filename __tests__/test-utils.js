const prismaClient = require("../client/prisma");
const bcrypt = require("bcrypt");

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            user: "test"
        }
    })
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            user: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            user: "test"
        }
    });
}

module.exports = {
    removeTestUser,
    createTestUser,
    getTestUser
}

// export const removeAllTestContacts = async () => {
//     await prismaClient.contact.deleteMany({
//         where: {
//             user: 'test'
//         }
//     });
// }

// export const createTestContact = async () => {
//     await prismaClient.contact.create({
//         data: {
//             user: "test",
//             first_name: "test",
//             last_name: "test",
//             email: "test@pzn.com",
//             phone: "080900000"
//         }
//     })
// }

// export const createManyTestContacts = async () => {
//     for (let i = 0; i < 15; i++) {
//         await prismaClient.contact.create({
//             data: {
//                 user: `test`,
//                 first_name: `test ${i}`,
//                 last_name: `test ${i}`,
//                 email: `test${i}@pzn.com`,
//                 phone: `080900000${i}`
//             }
//         })
//     }
// }

// export const getTestContact = async () => {
//     return prismaClient.contact.findFirst({
//         where: {
//             user: 'test'
//         }
//     })
// }

// export const removeAllTestAddresses = async () => {
//     await prismaClient.address.deleteMany({
//         where: {
//             contact: {
//                 user: "test"
//             }
//         }
//     });
// }

// export const createTestAddress = async () => {
//     const contact = await getTestContact();
//     await prismaClient.address.create({
//         data: {
//             contact_id: contact.id,
//             street: "jalan test",
//             city: 'kota test',
//             province: 'provinsi test',
//             country: 'indonesia',
//             postal_code: '234234'
//         }
//     })
// }

// export const getTestAddress = async () => {
//     return prismaClient.address.findFirst({
//         where: {
//             contact: {
//                 user: "test"
//             }
//         }
//     })
// }
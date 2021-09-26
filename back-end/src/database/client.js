const { PrismaClient } = require("@prisma/client/index");

const client = new PrismaClient();

module.exports = client;
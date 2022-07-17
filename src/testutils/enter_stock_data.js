const { Pastry, PrismaClient } = require("@prisma/client");
const stock_pastries = require("./result.json");
const prisma = new PrismaClient();

stock_pastries.forEach(async ({ name, url }) => {
  await prisma.pastry.create({
    data: {
      name: name,
      picture_url: url,
    },
  });
});

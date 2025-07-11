const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function createUser(req, res) {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createUser, getAllUsers };

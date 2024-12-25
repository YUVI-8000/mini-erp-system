import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await prisma.product.findUnique({ where: { id } });
    res.status(200).json(product);
  } else if (req.method === 'PUT') {
    const { name, description, price, quantity } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { name, description, price: parseFloat(price), quantity: parseInt(quantity) },
    });
    res.status(200).json(product);
  } else if (req.method === 'DELETE') {
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  }
}

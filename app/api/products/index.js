import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const { name, description, price, quantity } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price: parseFloat(price), quantity: parseInt(quantity) },
    });
    res.status(201).json(product);
  }
  
}


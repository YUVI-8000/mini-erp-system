import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const salesOrder = await prisma.salesOrder.findUnique({
      where: { id },
      include: { salesOrderItems: true },
    });
    res.status(200).json(salesOrder);
  }
  if (req.method === 'PUT') {
    const { status } = req.body;
  
    const updatedOrder = await prisma.salesOrder.update({
      where: { id },
      data: { status },
    });
  
    res.status(200).json(updatedOrder);
  }
  
}

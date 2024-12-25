import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderDate, customerName, items, totalAmount } = req.body;

    const salesOrder = await prisma.salesOrder.create({
      data: {
        orderDate: new Date(orderDate),
        customerName,
        totalAmount: parseFloat(totalAmount),
        status: 'pending',
        salesOrderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
          })),
        },
      },
    });

    res.status(201).json(salesOrder);
  }
  if (req.method === 'GET') {
    const salesOrders = await prisma.salesOrder.findMany({
      include: { salesOrderItems: true },
    });
    res.status(200).json(salesOrders);
  }
  
}

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const salesOrders = await prisma.salesOrder.findMany();
      res.status(200).json(salesOrders);
    } catch (error) {
      console.error("Error fetching sales orders:", error);
      res.status(500).json({ error: "Failed to fetch sales orders" });
    }
  } else if (req.method === 'POST') {
    const { orderDate, customerName, totalAmount, status } = req.body;
    try {
      const newSalesOrder = await prisma.salesOrder.create({
        data: { orderDate: new Date(orderDate), customerName, totalAmount: parseFloat(totalAmount), status },
      });
      res.status(201).json(newSalesOrder);
    } catch (error) {
      console.error("Error creating sales order:", error);
      res.status(500).json({ error: "Failed to create sales order" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

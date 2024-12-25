import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const salesOrder = await prisma.salesOrder.findUnique({ where: { id } });
      if (!salesOrder) {
        return res.status(404).json({ error: "Sales order not found" });
      }
      res.status(200).json(salesOrder);
    } catch (error) {
      console.error("Error fetching sales order:", error);
      res.status(500).json({ error: "Failed to fetch sales order" });
    }
  } else if (req.method === 'PUT') {
    const { orderDate, customerName, totalAmount, status } = req.body;
    try {
      const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id },
        data: { orderDate: new Date(orderDate), customerName, totalAmount: parseFloat(totalAmount), status },
      });
      res.status(200).json(updatedSalesOrder);
    } catch (error) {
      console.error("Error updating sales order:", error);
      res.status(500).json({ error: "Failed to update sales order" });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.salesOrder.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting sales order:", error);
      res.status(500).json({ error: "Failed to delete sales order" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

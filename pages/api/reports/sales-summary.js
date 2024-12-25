import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const totalOrders = await prisma.salesOrder.count();
  const totalSales = await prisma.salesOrder.aggregate({ _sum: { totalAmount: true } });
  const topProducts = await prisma.salesOrderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true, totalPrice: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5,
  });

  const statusCount = await prisma.salesOrder.groupBy({
    by: ['status'],
    _count: { status: true },
  });

  res.status(200).json({
    totalOrders,
    totalSales: totalSales._sum.totalAmount,
    topProducts,
    statusCount,
  });
}

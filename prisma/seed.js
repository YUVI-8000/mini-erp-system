const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Products
  await prisma.product.createMany({
    data: [
      { name: "Product A", description: "Description A", price: 100.0, quantity: 10 },
      { name: "Product B", description: "Description B", price: 50.0, quantity: 20 },
    ],
  });

  // Seed Sales Orders
  const order = await prisma.salesOrder.create({
    data: {
      orderDate: new Date(),
      customerName: "John Doe",
      totalAmount: 150.0,
      status: "PENDING",
    },
  });

  // Seed Sales Order Items
  await prisma.salesOrderItem.create({
    data: {
      salesOrderId: order.id,
      productId: (await prisma.product.findFirst()).id,
      quantity: 1,
      unitPrice: 100.0,
      totalPrice: 100.0,
    },
  });
}

main()
  .then(() => console.log("Seeding completed"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

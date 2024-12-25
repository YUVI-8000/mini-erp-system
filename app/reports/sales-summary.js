import { useEffect, useState } from 'react';

export default function SalesSummaryReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetch('/api/reports/sales-summary')
      .then((res) => res.json())
      .then((data) => setReportData(data));
  }, []);

  if (!reportData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Sales Summary Report</h1>
      <div>
        <h3>Total Number of Orders: {reportData.totalOrders}</h3>
        <h3>Total Sales Amount: ${reportData.totalSales.toFixed(2)}</h3>
      </div>
      <div>
        <h2>Top 5 Selling Products</h2>
        <ul>
          {reportData.topProducts.map((product, index) => (
            <li key={index}>
              Product ID: {product.productId} | Quantity Sold: {product._sum.quantity} | Total Revenue: ${product._sum.totalPrice.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Sales by Status</h2>
        <ul>
          {reportData.statusCount.map((status, index) => (
            <li key={index}>
              Status: {status.status} | Count: {status._count.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

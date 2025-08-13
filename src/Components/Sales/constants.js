// Sales status and payment enums
export const PaymentStatus = {
  ALL: 'All',
  PAID: 'Paid',
  PARTIAL: 'Partial',
  PENDING: 'Pending'
};

export const PaymentStatusColor = {
  [PaymentStatus.PAID]: 'success',
  [PaymentStatus.PARTIAL]: 'warning',
  [PaymentStatus.PENDING]: 'error'
};

// Formatters
export const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toFixed(2)}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Mock data
export const mockSalesData = {
  summary: {
    totalSales: 4098.50,
    amountCollected: 2251.09,
    pendingPayments: 1847.41
  },
  sales: [
    {
      id: 'INV-2024-001',
      customer: 'Green Valley Farm',
      contact: '+1-555-0123',
      dateTime: '2024-01-15T10:30:00',
      totalAmount: 1251.09,
      items: [
        { name: 'Tomato Seeds - Hybrid', quantity: 15, price: 45.99, total: 689.85 },
        { name: 'NPK Fertilizer 10-10-10', quantity: 5, price: 89.50, total: 447.50 }
      ],
      subtotal: 1137.35,
      tax: 113.74,
      total: 1251.09,
      paid: 1251.09,
      remaining: 0,
      status: PaymentStatus.PAID
    },
    {
      id: 'INV-2024-002',
      customer: 'Sunny Acres Ranch',
      contact: '+1-555-0456',
      dateTime: '2024-01-14T14:15:00',
      totalAmount: 1835.63,
      items: [
        { name: 'Corn Seeds - Sweet', quantity: 25, price: 52.75, total: 1318.75 },
        { name: 'Organic Compost', quantity: 10, price: 35.00, total: 350.00 }
      ],
      subtotal: 1668.75,
      tax: 166.88,
      total: 1835.63,
      paid: 1000.00,
      remaining: 835.63,
      status: PaymentStatus.PARTIAL
    },
    {
      id: 'INV-2024-003',
      customer: 'Blue Ridge Organic',
      contact: '+1-555-0789',
      dateTime: '2024-01-13T09:45:00',
      totalAmount: 1011.78,
      items: [
        { name: 'Lettuce Seeds - Romaine', quantity: 8, price: 28.50, total: 228.00 },
        { name: 'Organic Pesticide', quantity: 3, price: 125.00, total: 375.00 },
        { name: 'Garden Tools Set', quantity: 2, price: 89.99, total: 179.98 }
      ],
      subtotal: 782.98,
      tax: 78.30,
      total: 861.28,
      paid: 0,
      remaining: 861.28,
      status: PaymentStatus.PENDING
    }
  ]
};

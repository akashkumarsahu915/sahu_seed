// Product status and category enums
export const ProductStatus = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock'
};

export const ProductCategory = {
  ALL: 'All',
  SEEDS: 'Seeds',
  FERTILIZERS: 'Fertilizers',
  PESTICIDES: 'Pesticides',
  TOOLS: 'Tools'
};

// Formatters
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const formatDate = (date) => {
  if (!date || date === 'N/A') return 'N/A';
  
  try {
    const dateObj = new Date(date);   
    if (isNaN(dateObj.getTime())) {
      console.log('Invalid date detected');
      return 'Invalid Date';
    }
    
    const formatted = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatted;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const formatStockLevel = (current) => {
  return `${current} units`;
};

export const formatMinimumStock = (minimum) => {
  return `Minimum: ${minimum} units`;
};

// Mock data
export const mockRootProps = {
  products: [
    {
      id: 'ws001',
      name: 'Premium Wheat Seeds',
      batch: 'WS001',
      category: ProductCategory.SEEDS,
      price: 45.99,
      supplier: 'AgriSeeds Co.',
      expiry: '2025-08-15',
      stockLevel: 150,
      minimumStock: 50,
      status: ProductStatus.IN_STOCK
    },
    {
      id: 'npk045',
      name: 'NPK Fertilizer 20-20-20',
      batch: 'NPK045',
      category: ProductCategory.FERTILIZERS,
      price: 89.5,
      supplier: 'GreenGrow Ltd.',
      expiry: '2024-12-31',
      stockLevel: 8,
      minimumStock: 25,
      status: ProductStatus.LOW_STOCK
    },
    {
      id: 'cs022',
      name: 'Hybrid Corn Seeds',
      batch: 'CS022',
      category: ProductCategory.SEEDS,
      price: 52.75,
      supplier: 'CornTech Solutions',
      expiry: '2025-06-20',
      stockLevel: 220,
      minimumStock: 40,
      status: ProductStatus.IN_STOCK
    },
    {
      id: 'ps032',
      name: 'Organic Pesticide Spray',
      batch: 'PS032',
      category: ProductCategory.PESTICIDES,
      price: 125,
      supplier: 'EcoPest Control',
      expiry: '2024-09-10',
      stockLevel: 0,
      minimumStock: 15,
      status: ProductStatus.OUT_OF_STOCK
    },
    {
      id: 'gs175',
      name: 'Garden Pruning Shears',
      batch: 'GS175',
      category: ProductCategory.TOOLS,
      price: 29.99,
      supplier: 'ToolMaster Inc.',
      expiry: 'N/A',
      stockLevel: 45,
      minimumStock: 10,
      status: ProductStatus.IN_STOCK
    },
    {
      id: 'lf067',
      name: 'Liquid Fertilizer Concentrate',
      batch: 'LF067',
      category: ProductCategory.FERTILIZERS,
      price: 67.25,
      supplier: 'NutriGrow Systems',
      expiry: '2025-03-15',
      stockLevel: 75,
      minimumStock: 30,
      status: ProductStatus.IN_STOCK
    }
  ],
  selectedCategory: ProductCategory.ALL
};
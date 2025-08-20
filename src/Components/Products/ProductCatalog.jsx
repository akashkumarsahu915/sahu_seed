import React, { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import ProductList from './ProductList';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal';
import { ProductCategory, ProductStatus } from './constants';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Typography, TextField, Button, Stack, Tabs, Tab } from '@mui/material';

// ==================== ProductCatalogHeader ====================
const ProductCatalogHeader = ({ searchQuery, onSearchChange, onAddProduct, onRefresh }) => {
  return (
    <Box className="mb-8">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        className="mb-6"
      >
        <Box>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Product Catalog
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Manage your seeds, fertilizers, and agricultural supplies
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onRefresh}
            className="px-4 py-2"
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlusIcon className="w-5 h-5" />}
            onClick={onAddProduct} // Opens modal
            className="px-6 py-2"
          >
            Add Product
          </Button>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search products or batch..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
          ),
        }}
        className="max-w-md"
      />
    </Box>
  );
};

// ==================== CategoryTabs ====================
const CategoryTabs = ({ selectedCategory, onCategoryChange }) => {
  const categories = Object.values(ProductCategory);
  return (
    <Box className="mb-6">
      <Tabs
        value={selectedCategory}
        onChange={(event, newValue) => onCategoryChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        className="border-b border-gray-200"
      >
        {categories.map((category) => (
          <Tab
            key={category}
            label={category}
            value={category}
            className="text-sm font-medium min-w-0 px-4"
          />
        ))}
      </Tabs>
    </Box>
  );
};

// ==================== Main ProductCatalog Component ====================
const ProductCatalog = ({ products: initialProducts, onRefresh }) => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState(ProductCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // ✅ for Add Product Modal

  // Filtered products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== ProductCategory.ALL) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.batch.toLowerCase().includes(query) ||
          p.supplier.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  // Handlers
  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleSearchChange = (query) => setSearchQuery(query);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (productId, updates) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = { ...p, ...updates };
          if (updated.stockLevel === 0) {
            updated.status = ProductStatus.OUT_OF_STOCK;
          } else if (updated.stockLevel <= updated.minimumStock) {
            updated.status = ProductStatus.LOW_STOCK;
          } else {
            updated.status = ProductStatus.IN_STOCK;
          }
          return updated;
        }
        return p;
      })
    );
    handleCloseEditModal();
  };

  

  const handleAddProductSave = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setIsAddModalOpen(false);
  };

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <ProductCatalogHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddProduct={() => setIsAddModalOpen(true)} // ✅ open AddProductModal
        onRefresh={onRefresh}
      />

      {/* Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Product List */}
      <ProductList
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        
      />

      {/* Edit Product Modal */}
      <EditProductModal
        open={editModalOpen}
        product={selectedProduct}
        onClose={handleCloseEditModal}
        onSave={handleSaveProduct}
      />

      {/* ✅ Add Product Modal Hooked Up */}
      <AddProductModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProductSave}
      />
    </Box>
  );
};

export default ProductCatalog;

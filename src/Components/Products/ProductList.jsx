import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, LinearProgress, Chip, Grid } from '@mui/material';
import { PencilIcon } from '@heroicons/react/24/outline';
import { formatPrice, formatDate, formatStockLevel, formatMinimumStock } from './constants.js';
import  {ProductStatus}  from './constants';

// Stock Status Chip Component
const StockStatusChip = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case ProductStatus.IN_STOCK:
        return 'success';
      case ProductStatus.LOW_STOCK:
        return 'warning';
      case ProductStatus.OUT_OF_STOCK:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Chip
      label={status}
      color={getStatusColor(status)}
      size="small"
      className="font-medium"
    />
  );
};

// Product Card Component
const ProductCard = ({ product, onEdit, onReorder }) => {
  const getStockProgress = () => {
    if (product.stockLevel === 0) return 0;
    return Math.min((product.stockLevel / (product.minimumStock * 2)) * 100, 100);
  };

  const getProgressColor = () => {
    const progress = getStockProgress();
    if (progress === 0) return 'error';
    if (progress < 50) return 'warning';
    return 'success';
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <Stack spacing={3}>
          {/* Header with status */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box className="flex-1">
              <Typography variant="h6" className="font-semibold text-gray-900 mb-1">
                {product.name}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Batch: {product.batch}
              </Typography>
            </Box>
            <StockStatusChip status={product.status} />
          </Stack>

          {/* Product details */}
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" className="text-gray-600">
                Category:
              </Typography>
              <Typography variant="body2" className="font-medium">
                {product.category}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" className="text-gray-600">
                Price:
              </Typography>
              <Typography variant="body2" className="font-medium text-green-600">
                {formatPrice(product.price)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" className="text-gray-600">
                Supplier:
              </Typography>
              <Typography variant="body2" className="font-medium">
                {product.supplier}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" className="text-gray-600">
                Expiry:
              </Typography>
              <Typography variant="body2" className="font-medium">
                {product.expiry === 'N/A' ? 'N/A' : formatDate(product.expiry)}
              </Typography>
            </Stack>
          </Stack>

          {/* Stock level */}
          <Box>
            <Stack direction="row" justifyContent="space-between" className="mb-2">
              <Typography variant="body2" className="text-gray-600">
                Stock Level:
              </Typography>
              <Typography variant="body2" className="font-medium">
                {formatStockLevel(product.stockLevel)}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={getStockProgress()}
              color={getProgressColor()}
              className="mb-1"
            />
            <Typography variant="caption" className="text-gray-500">
              {formatMinimumStock(product.minimumStock)}
            </Typography>
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PencilIcon className="w-4 h-4" />}
              onClick={() => onEdit(product)}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => onReorder(product.id)}
              className="flex-1"
              color="primary"
            >
              Reorder
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Product Grid Component
const ProductList = ({ products, onEditProduct, onReorderProduct }) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <ProductCard
            product={product}
            onEdit={onEditProduct}
            onReorder={onReorderProduct}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
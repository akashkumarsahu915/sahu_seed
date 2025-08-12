import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { XMarkIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ProductCategory } from './constants';

const EditProductModal = ({ open, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: '',
    category: ProductCategory.SEEDS,
    batchNumber: '',
    supplier: '',
    quantity: 0,
    minStock: 0,
    price: 0,
    expiryDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.name,
        category: product.category,
        batchNumber: product.batch,
        supplier: product.supplier,
        quantity: product.stockLevel,
        minStock: product.minimumStock,
        price: product.price,
        expiryDate: product.expiry === 'N/A' ? '' : product.expiry
      });
    }
  }, [product]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = 'Batch number is required';
    }
    
    if (!formData.supplier.trim()) {
      newErrors.supplier = 'Supplier is required';
    }
    
    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity must be non-negative';
    }
    
    if (formData.minStock < 0) {
      newErrors.minStock = 'Min stock must be non-negative';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(product.id, {
        name: formData.productName,
        category: formData.category,
        batch: formData.batchNumber,
        supplier: formData.supplier,
        stockLevel: Number(formData.quantity),
        minimumStock: Number(formData.minStock),
        price: Number(formData.price),
        expiry: formData.expiryDate || 'N/A'
      });
    }
  };

  const categories = Object.values(ProductCategory).filter(cat => cat !== ProductCategory.ALL);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'rounded-xl'
      }}
    >
      <DialogTitle className="pb-2">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" className="font-semibold">
            Edit Product
          </Typography>
          <IconButton onClick={onClose} size="small">
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent className="pt-4">
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Product Name"
              fullWidth
              value={formData.productName}
              onChange={handleChange('productName')}
              error={!!errors.productName}
              helperText={errors.productName}
            />
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={handleChange('category')}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Batch Number"
              fullWidth
              value={formData.batchNumber}
              onChange={handleChange('batchNumber')}
              error={!!errors.batchNumber}
              helperText={errors.batchNumber}
            />
            <TextField
              label="Supplier"
              fullWidth
              value={formData.supplier}
              onChange={handleChange('supplier')}
              error={!!errors.supplier}
              helperText={errors.supplier}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={handleChange('quantity')}
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
            <TextField
              label="Min Stock"
              type="number"
              fullWidth
              value={formData.minStock}
              onChange={handleChange('minStock')}
              error={!!errors.minStock}
              helperText={errors.minStock}
            />
            <TextField
              label="Price ($)"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange('price')}
              error={!!errors.price}
              helperText={errors.price}
              inputProps={{ step: 0.01 }}
            />
          </Stack>

          <TextField
            label="Expiry Date"
            type="date"
            fullWidth
            value={formData.expiryDate}
            onChange={handleChange('expiryDate')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
            }}
          />

          <Alert severity="info" className="mt-4">
            <Typography variant="body2">
              <strong>Product Information</strong><br />
              Updating stock quantities here will create a stock adjustment record. For regular stock movements, use the inventory management section.
            </Typography>
          </Alert>
        </Stack>
      </DialogContent>

      <DialogActions className="p-6 pt-4">
        <Button onClick={onClose} variant="outlined" className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
import React, { useState, useMemo } from 'react';
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  Button, 
  Checkbox, 
  FormControlLabel,
  Box,
  Divider
} from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from './constants';

const QuickSaleModal = ({ open, onClose, products = [] }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    selectedCategory: 'All Products',
    paymentMethod: 'Cash',
    amountPaid: ''
  });

  const [selectedProducts, setSelectedProducts] = useState({});

  // Mock products data for demonstration
  const mockProducts = [
    {
      id: 1,
      name: 'Tomato Seeds - Hybrid',
      price: 45.99,
      available: 150,
      category: 'Seeds'
    },
    {
      id: 2,
      name: 'NPK Fertilizer 10-10-10',
      price: 89.50,
      available: 25,
      category: 'Fertilizers'
    },
    {
      id: 3,
      name: 'Corn Seeds - Sweet',
      price: 52.75,
      available: 220,
      category: 'Seeds'
    },
    {
      id: 4,
      name: 'Organic Pesticide',
      price: 125.00,
      available: 15,
      category: 'Pesticides'
    },
    {
      id: 5,
      name: 'Garden Tools Set',
      price: 89.99,
      available: 8,
      category: 'Tools'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductSelection = (productId, checked) => {
    if (checked) {
      setSelectedProducts(prev => ({
        ...prev,
        [productId]: { quantity: 1, price: mockProducts.find(p => p.id === productId)?.price || 0 }
      }));
    } else {
      const newSelected = { ...selectedProducts };
      delete newSelected[productId];
      setSelectedProducts(newSelected);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: { ...prev[productId], quantity: parseInt(quantity) }
    }));
  };

  const filteredProducts = useMemo(() => {
    if (formData.selectedCategory === 'All Products') {
      return mockProducts;
    }
    return mockProducts.filter(product => product.category === formData.selectedCategory);
  }, [formData.selectedCategory]);

  const totalAmount = useMemo(() => {
    return Object.values(selectedProducts).reduce((total, product) => {
      return total + (product.quantity * product.price);
    }, 0);
  }, [selectedProducts]);

  const remainingAmount = Math.max(0, totalAmount - (parseFloat(formData.amountPaid) || 0));

  const handleCompleteSale = () => {
    console.log('Sale completed:', {
      customer: formData.customerName,
      phone: formData.phoneNumber,
      products: selectedProducts,
      total: totalAmount,
      paid: parseFloat(formData.amountPaid) || 0,
      remaining: remainingAmount,
      paymentMethod: formData.paymentMethod
    });
    onClose();
    // Reset form
    setFormData({
      customerName: '',
      phoneNumber: '',
      selectedCategory: 'All Products',
      paymentMethod: 'Cash',
      amountPaid: ''
    });
    setSelectedProducts({});
  };

  const handleCancel = () => {
    onClose();
    // Reset form
    setFormData({
      customerName: '',
      phoneNumber: '',
      selectedCategory: 'All Products',
      paymentMethod: 'Cash',
      amountPaid: ''
    });
    setSelectedProducts({});
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px',
            padding: 0,
            margin: '16px',
            maxHeight: 'calc(100vh - 32px)',
            overflow: 'hidden'
          }
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white rounded-xl shadow-xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Typography variant="h5" className="font-semibold text-gray-900">
              Quick Sale
            </Typography>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography variant="body2" className="text-gray-700 mb-2 font-medium">
                  Customer Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Typography variant="body2" className="text-gray-700 mb-2 font-medium">
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Product Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold text-gray-900">
                  Select Products
                </Typography>
                <div className="flex items-center gap-2">
                  <Typography variant="body2" className="text-gray-700">
                    Filter by:
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={formData.selectedCategory}
                      onChange={(e) => handleInputChange('selectedCategory', e.target.value)}
                    >
                      <MenuItem value="All Products">All Products</MenuItem>
                      <MenuItem value="Seeds">Seeds</MenuItem>
                      <MenuItem value="Fertilizers">Fertilizers</MenuItem>
                      <MenuItem value="Pesticides">Pesticides</MenuItem>
                      <MenuItem value="Tools">Tools</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              {/* Product List */}
              <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Checkbox
                          checked={!!selectedProducts[product.id]}
                          onChange={(e) => handleProductSelection(product.id, e.target.checked)}
                          color="primary"
                        />
                        <div className="flex-1">
                          <Typography variant="body1" className="font-medium text-gray-900">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {formatCurrency(product.price)} • {product.available} available • {product.category}
                          </Typography>
                        </div>
                      </div>
                      
                      {selectedProducts[product.id] && (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Typography variant="body2" className="text-gray-700">
                              Qty
                            </Typography>
                            <TextField
                              type="number"
                              size="small"
                              value={selectedProducts[product.id].quantity}
                              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                              sx={{ width: 80 }}
                              inputProps={{ min: 1, max: product.available }}
                            />
                          </div>
                          <Typography variant="body1" className="font-medium text-gray-900 min-w-[60px] text-right">
                            {formatCurrency(selectedProducts[product.id].quantity * product.price)}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography variant="body2" className="text-gray-700 mb-2 font-medium">
                  Payment Method
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.paymentMethod}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Card">Card</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="Check">Check</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <Typography variant="body2" className="text-gray-700 mb-2 font-medium">
                  Amount Paid ($)
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  value={formData.amountPaid}
                  onChange={(e) => handleInputChange('amountPaid', e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <Typography variant="body2" className="text-gray-700 mb-2 font-medium">
                  Remaining Amount ($)
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formatCurrency(remainingAmount)}
                  InputProps={{
                    readOnly: true,
                    sx: { 
                      color: remainingAmount > 0 ? '#ea580c' : '#16a34a',
                      fontWeight: 500
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                borderColor: '#d1d5db',
                color: '#374151',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: '6px',
                padding: '8px 24px',
                '&:hover': {
                  borderColor: '#9ca3af',
                  backgroundColor: '#f9fafb',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCompleteSale}
              disabled={Object.keys(selectedProducts).length === 0}
              sx={{
                backgroundColor: '#6b7280',
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: '6px',
                padding: '8px 24px',
                '&:hover': {
                  backgroundColor: '#4b5563',
                },
                '&:disabled': {
                  backgroundColor: '#d1d5db',
                  color: '#9ca3af',
                },
              }}
            >
              Complete Sale - {formatCurrency(totalAmount)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSaleModal;

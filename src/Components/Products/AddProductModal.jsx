import React, { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  Button
} from '@mui/material'
import { XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline'

const AddProductModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Seeds',
    batchNumber: '',
    supplier: '',
    quantity: '',
    minStock: '',
    price: '',
    expiryDate: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      productName: '',
      category: 'Seeds',
      batchNumber: '',
      supplier: '',
      quantity: '',
      minStock: '',
      price: '',
      expiryDate: ''
    })
    onClose()
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: 0,
          margin: '16px',
          maxHeight: 'calc(100vh - 32px)',
          overflow: 'hidden' // prevent scroll causing extra white
        }
      }}
    >
      <DialogContent 
        sx={{ 
          padding: 0,
          '&.MuiDialogContent-root': { padding: 0 }
        }}
      >
        <div className="bg-white rounded-xl shadow-xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6 w-full">
            {/* Row 1: Product Name and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <MenuItem value="Seeds">Seeds</MenuItem>
                    <MenuItem value="Fertilizers">Fertilizers</MenuItem>
                    <MenuItem value="Tools">Tools</MenuItem>
                    <MenuItem value="Equipment">Equipment</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Row 2: Batch Number and Supplier */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.batchNumber}
                  onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.supplier}
                  onChange={(e) => handleInputChange('supplier', e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Quantity, Min Stock, and Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Stock
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange('minStock', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>
            </div>

            {/* Row 4: Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="relative">
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  placeholder="dd-mm-yyyy"
                  InputProps={{
                    endAdornment: (
                      <CalendarIcon className="w-5 h-5 text-gray-400" />
                    ),
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
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#10b981',
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: '6px',
                padding: '8px 24px',
                '&:hover': {
                  backgroundColor: '#059669',
                },
              }}
            >
              Add Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductModal

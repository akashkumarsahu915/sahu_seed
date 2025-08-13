import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box
} from '@mui/material';
import { XMarkIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from './constants';

const InvoiceModal = ({ open, onClose, sale }) => {
  if (!sale) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('invoice-content');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore event handlers
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.10; // 10% tax rate
  };

  const taxAmount = calculateTax(sale.subtotal);

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
              Invoice Details
            </Typography>
            <div className="flex items-center gap-3">
              <Button
                variant="contained"
                startIcon={<PrinterIcon className="w-5 h-5" />}
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handlePrint}
              >
                Print
              </Button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div id="invoice-content" className="p-8">
            {/* Company and Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              {/* Company Information */}
              <div>
                <Typography variant="h4" className="font-bold text-green-600 mb-2">
                  Seeds & Fertilizer Shop
                </Typography>
                <Typography variant="body1" className="text-gray-700 mb-1">
                  123 Garden Street, Agriculture District
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Phone: +1-555-SEEDS (73337)
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Email: info@seedsfertilizer.com
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  License: AGR-2024-001
                </Typography>
              </div>

              {/* Invoice Header */}
              <div className="text-right">
                <Typography variant="h3" className="font-bold text-gray-900 mb-4">
                  INVOICE
                </Typography>
                <div className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <Typography variant="body1" className="text-gray-600">Invoice #:</Typography>
                    <Typography variant="body1" className="font-semibold text-gray-900">{sale.id}</Typography>
                  </div>
                  <div className="flex justify-between gap-4">
                    <Typography variant="body1" className="text-gray-600">Date:</Typography>
                    <Typography variant="body1" className="font-semibold text-gray-900">
                      {formatDate(sale.dateTime)}
                    </Typography>
                  </div>
                  <div className="flex justify-between gap-4">
                    <Typography variant="body1" className="text-gray-600">Time:</Typography>
                    <Typography variant="body1" className="font-semibold text-gray-900">
                      {new Date(sale.dateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="mb-8">
              <Typography variant="h6" className="font-semibold text-gray-900 mb-3">
                Bill To:
              </Typography>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="body1" className="font-medium text-gray-900 mb-1">
                  {sale.customer}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {sale.contact}
                </Typography>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <TableContainer component={Paper} className="shadow-sm">
                <Table>
                  <TableHead>
                    <TableRow className="bg-gray-50">
                      <TableCell className="font-semibold text-gray-900">Item</TableCell>
                      <TableCell className="font-semibold text-gray-900 text-center">Qty</TableCell>
                      <TableCell className="font-semibold text-gray-900 text-right">Unit Price</TableCell>
                      <TableCell className="font-semibold text-gray-900 text-right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sale.items.map((item, index) => (
                      <TableRow key={index} className="border-b border-gray-100">
                        <TableCell className="text-gray-900">
                          <Typography variant="body1" className="font-medium">
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell className="text-center text-gray-700">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right text-gray-700">
                          {formatCurrency(item.price)}
                        </TableCell>
                        <TableCell className="text-right text-gray-900 font-medium">
                          {formatCurrency(item.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/* Summary and Payment Status */}
            <div className="flex justify-between items-start">
              {/* Payment Status */}
              <div>
                <Typography variant="h6" className="font-semibold text-gray-900 mb-3">
                  Payment Status:
                </Typography>
                <Box
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                    sale.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : sale.status === 'Partial'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {sale.status}
                </Box>
              </div>

              {/* Summary of Charges */}
              <div className="text-right space-y-2 min-w-[200px]">
                <div className="flex justify-between gap-4">
                  <Typography variant="body1" className="text-gray-600">Subtotal:</Typography>
                  <Typography variant="body1" className="text-gray-900">{formatCurrency(sale.subtotal)}</Typography>
                </div>
                <div className="flex justify-between gap-4">
                  <Typography variant="body1" className="text-gray-600">Tax (10%):</Typography>
                  <Typography variant="body1" className="text-gray-900">{formatCurrency(taxAmount)}</Typography>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                  <Typography variant="h6" className="font-bold text-gray-900">Total:</Typography>
                  <Typography variant="h6" className="font-bold text-gray-900">{formatCurrency(sale.total)}</Typography>
                </div>
                <div className="flex justify-between gap-4">
                  <Typography variant="body1" className="text-gray-600">Amount Paid:</Typography>
                  <Typography variant="body1" className="font-medium text-green-600">{formatCurrency(sale.paid)}</Typography>
                </div>
                {sale.remaining > 0 && (
                  <div className="flex justify-between gap-4">
                    <Typography variant="body1" className="text-gray-600">Remaining:</Typography>
                    <Typography variant="body1" className="font-medium text-orange-600">{formatCurrency(sale.remaining)}</Typography>
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <Typography variant="h6" className="font-semibold text-gray-900 mb-2">
                Terms & Conditions:
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                • Payment is due within 30 days of invoice date
              </Typography>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Chip, Box, Divider } from '@mui/material';
import { DocumentTextIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatDateTime, PaymentStatusColor } from './constants';
import InvoiceModal from './InvoiceModal';

const SalesItem = ({ sale }) => {
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const getStatusColor = (status) => {
    return PaymentStatusColor[status] || 'default';
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600';
      case 'Partial':
        return 'text-orange-600';
      case 'Pending':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Header with Invoice ID and Total Amount */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-600" />
            <Typography variant="h6" className="font-semibold text-gray-900">
              {sale.id}
            </Typography>
          </div>
          <Typography variant="h5" className="font-bold text-gray-900">
            {formatCurrency(sale.totalAmount)}
          </Typography>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Typography variant="body1" className="font-medium text-gray-900">
              {sale.customer}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-gray-500" />
            <Typography variant="body2" className="text-gray-600">
              {sale.contact}
            </Typography>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <Typography variant="body2" className="text-gray-600">
            {formatDateTime(sale.dateTime)}
          </Typography>
        </div>

        {/* Items Sold */}
        <div className="mb-4">
          <Typography variant="body2" className="text-gray-600 mb-2">
            Items Sold:
          </Typography>
          <div className="space-y-1">
            {sale.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-gray-900 font-medium">
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Divider className="my-4" />

        {/* Payment Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">{formatCurrency(sale.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="text-gray-900">{formatCurrency(sale.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-900">{formatCurrency(sale.total)}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Paid:</span>
              <span className="text-green-600 font-medium">
                {formatCurrency(sale.paid)}
              </span>
            </div>
            {sale.remaining > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining:</span>
                <span className="text-orange-600 font-medium">
                  {formatCurrency(sale.remaining)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Status and Actions */}
        <div className="flex justify-between items-center">
          <Chip
            label={sale.status}
            color={getStatusColor(sale.status)}
            className={`font-medium ${getStatusTextColor(sale.status)}`}
          />
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="small"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
              onClick={() => setInvoiceModalOpen(true)}
            >
              View Invoice
            </Button>
            {sale.status === 'Partial' && (
              <Button
                variant="contained"
                size="small"
                className="bg-green-600 hover:bg-green-700"
              >
                Record Payment
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      {/* Invoice Modal */}
      <InvoiceModal
        open={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        sale={sale}
      />
    </Card>
  );
};

export default SalesItem;

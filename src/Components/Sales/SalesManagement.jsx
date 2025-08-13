import React, { useState, useMemo } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import SummaryMetrics from './SummaryMetrics';
import StatusFilter from './StatusFilter';
import SalesItem from './SalesItem';
import QuickSaleModal from './QuickSaleModal';
import { mockSalesData, PaymentStatus } from './constants';

const SalesManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState(PaymentStatus.ALL);
  const [quickSaleOpen, setQuickSaleOpen] = useState(false);

  // Filter sales based on selected status
  const filteredSales = useMemo(() => {
    if (selectedStatus === PaymentStatus.ALL) {
      return mockSalesData.sales;
    }
    return mockSalesData.sales.filter(sale => sale.status === selectedStatus);
  }, [selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleQuickSale = () => {
    setQuickSaleOpen(true);
  };

  const handleExport = () => {
    console.log('Export clicked');
    // TODO: Implement export functionality
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Typography variant="h4" className="font-bold text-gray-900 mb-2">
              Sales Management
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Track sales, invoices, and customer payments
            </Typography>
          </div>
          <div className="flex gap-3">
            <Button
              variant="contained"
              startIcon={<PlusIcon className="w-5 h-5" />}
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleQuickSale}
            >
              + Quick Sale
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowDownTrayIcon className="w-5 h-5" />}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <SummaryMetrics summary={mockSalesData.summary} />

      {/* Status Filter */}
      <StatusFilter 
        selectedStatus={selectedStatus} 
        onStatusChange={handleStatusChange} 
      />

      {/* Recent Sales */}
      <div>
        <Typography variant="h5" className="font-semibold text-gray-900 mb-4">
          Recent Sales
        </Typography>
        
        {filteredSales.length === 0 ? (
          <Box className="text-center py-12">
            <Typography variant="body1" className="text-gray-500">
              No sales found for the selected status.
            </Typography>
          </Box>
        ) : (
          <div>
            {filteredSales.map((sale) => (
              <SalesItem key={sale.id} sale={sale} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Sale Modal */}
      <QuickSaleModal 
        open={quickSaleOpen}
        onClose={() => setQuickSaleOpen(false)}
      />
    </div>
  );
};

export default SalesManagement;

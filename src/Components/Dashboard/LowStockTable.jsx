import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material';

const LowStockTable = ({ items = [] }) => {
  const defaultItems = [
    {
      product: 'Wheat Seeds Premium',
      batch: 'WS001',
      currentStock: '15 units',
      minimum: '50 units',
      category: 'Seeds'
    },
    {
      product: 'NPK Fertilizer 20-20-20',
      batch: 'NPK045',
      currentStock: '8 units',
      minimum: '25 units',
      category: 'Fertilizer'
    },
    {
      product: 'Corn Seeds Hybrid',
      batch: 'CS022',
      currentStock: '22 units',
      minimum: '40 units',
      category: 'Seeds'
    },
    {
      product: 'Organic Compost',
      batch: 'OC011',
      currentStock: '5 units',
      minimum: '20 units',
      category: 'Fertilizer'
    }
  ];

  const stockItems = items.length > 0 ? items : defaultItems;

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'seeds':
        return 'bg-green-100 text-green-800';
      case 'fertilizer':
        return 'bg-blue-100 text-blue-800';
      case 'pesticide':
        return 'bg-orange-100 text-orange-800';
      case 'tools':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Typography variant="h6" className="font-semibold text-gray-900 mb-1">
              Low Stock Alerts
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Items that need restocking
            </Typography>
          </div>
          <Button 
            variant="contained" 
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 normal-case"
          >
            Generate Purchase Orders
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold text-gray-700 border-b border-gray-200">Product</TableCell>
                <TableCell className="font-semibold text-gray-700 border-b border-gray-200">Batch</TableCell>
                <TableCell className="font-semibold text-gray-700 border-b border-gray-200">Current Stock</TableCell>
                <TableCell className="font-semibold text-gray-700 border-b border-gray-200">Minimum</TableCell>
                <TableCell className="font-semibold text-gray-700 border-b border-gray-200">Category</TableCell>
                <TableCell className="font-semibold text-gray-700 border-b border-gray-200">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockItems.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="border-b border-gray-100">
                    <Typography variant="body2" className="font-medium text-gray-900">
                      {item.product}
                    </Typography>
                  </TableCell>
                  <TableCell className="border-b border-gray-100">
                    <Typography variant="body2" className="text-gray-600">
                      {item.batch}
                    </Typography>
                  </TableCell>
                  <TableCell className="border-b border-gray-100">
                    <Typography variant="body2" className="text-red-600 font-medium">
                      {item.currentStock}
                    </Typography>
                  </TableCell>
                  <TableCell className="border-b border-gray-100">
                    <Typography variant="body2" className="text-gray-600">
                      {item.minimum}
                    </Typography>
                  </TableCell>
                  <TableCell className="border-b border-gray-100">
                    <Chip 
                      label={item.category}
                      className={`${getCategoryColor(item.category)} text-xs font-medium rounded-full`}
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="border-b border-gray-100">
                    <Button 
                      variant="text" 
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 normal-case text-sm"
                    >
                      Reorder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default LowStockTable;
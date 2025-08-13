import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CurrencyDollarIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from './constants';

const SummaryMetrics = ({ summary }) => {
  const metrics = [
    {
      title: 'Total Sales',
      value: summary.totalSales,
      icon: CurrencyDollarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Amount Collected',
      value: summary.amountCollected,
      icon: BanknotesIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Pending Payments',
      value: summary.pendingPayments,
      icon: ClockIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  {metric.title}
                </Typography>
                <Typography 
                  variant="h4" 
                  className={`font-bold ${metric.color}`}
                >
                  {formatCurrency(metric.value)}
                </Typography>
              </div>
              <Box 
                className={`p-3 rounded-lg ${metric.bgColor}`}
              >
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </Box>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryMetrics;

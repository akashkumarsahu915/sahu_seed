import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { X } from 'lucide-react';
const salesMock3Month = [
  // 84 days (12 weeks)
  4000, 3200, 5000, 2800, 3000, 6800, 3600,
  4200, 3500, 4800, 3100, 3300, 7000, 3900,
  4100, 3400, 5100, 2900, 3200, 6900, 3700,
  4300, 3600, 4900, 3200, 3400, 7100, 4000,
  4050, 3250, 5050, 2850, 3050, 6850, 3650,
  4250, 3550, 4850, 3150, 3350, 7050, 3950,
  4150, 3450, 5150, 2950, 3250, 6950, 3750,
  4350, 3650, 4950, 3250, 3450, 7150, 4050,
  4080, 3280, 5080, 2880, 3080, 6880, 3680,
  4280, 3580, 4880, 3180, 3380, 7080, 3980,
  4180, 3480, 5180, 2980, 3280, 6980, 3780,
  4380, 3680, 4980, 3280, 3480, 7180, 4080,
];

const getFilteredData = (filter) => {
  if (filter === '1week') {
    return {
      data: salesMock3Month.slice(-7),
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    };
  }
  if (filter === '1month') {
    return {
      data: salesMock3Month.slice(-30),
      labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    };
  }
  // 3month
  return {
    data: salesMock3Month,
    labels: Array.from({ length: 84 }, (_, i) => `${i + 1}`),
  };
};

const SalesChart = () => {
  const [filter, setFilter] = useState('1week');
  const { data, labels: xLabels } = getFilteredData(filter);
  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Typography variant="h6" className="font-semibold text-gray-900 mb-1">
              Sales Overview
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {filter === '1week'
                ? 'Weekly sales performance'
                : filter === '1month'
                ? 'Monthly sales performance'
                : 'Quarterly sales performance'}
            </Typography>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${filter === '1week' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setFilter('1week')}
            >
              1 week
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${filter === '1month' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setFilter('1month')}
            >
              1 month
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${filter === '3month' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setFilter('3month')}
            >
              3 month
            </button>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <Typography variant="body2" className="text-gray-600">
            Sales ($)
          </Typography>
        </div>
        <Box className="h-80">
          <LineChart
            width={600}
            height={300}
            series={[
              {
                data: data,
                area: true,
                color: '#10b981',
                curve: 'natural',
              },
            ]}
            xAxis={[{
              scaleType: 'point',
              data: xLabels,
              tickLabelStyle: {
                fontSize: 12,
                fill: '#6b7280'
              }
            }]}
            yAxis={[{
              tickLabelStyle: {
                data: data,
                fontSize: 12,
                fill: '#6b7280'
              }
            }]}
            grid={{ horizontal: true, vertical: false }} 
            slotProps={{
              area: {
                style: {
                  fill: 'rgba(16, 190, 129, 0.2)',
                }
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesChart;

import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography, Box } from '@mui/material';

const SalesChart = () => {
  const salesData = [4000, 3200, 5000, 2800, 3000, 6800, 3600];
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [filter, setFilter] = React.useState('1week');

  // Example: You may want to update salesData and xLabels based on filter in a real scenario

  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Typography variant="h6" className="font-semibold text-gray-900 mb-1">
              Sales Overview
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Weekly sales performance
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
                data: salesData,
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
                fontSize: 12,
                fill: '#6b7280'
              }
            }]}
            grid={{ horizontal: true, vertical: false }}
            sx={{
              '& .MuiAreaElement-root': {
                fill: 'url(#greenGradient)',
              },
              '& .MuiLineElement-root': {
                stroke: '#10b981',
                strokeWidth: 3,
              },
              '& .MuiChartsGrid-line': {
                stroke: '#f3f4f6',
                strokeWidth: 1,
              },
            }}
            slotProps={{
              area: {
                style: {
                  fill: 'rgba(16, 185, 129, 0.1)',
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
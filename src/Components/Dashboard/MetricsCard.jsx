import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const MetricsCard = ({ title, value, icon: Icon, trend, trendText, bgColor = 'bg-white', iconBg = 'bg-green-100', iconColor = 'text-green-600' }) => {
  return (
    <Card className={`${bgColor} shadow-sm border-0 rounded-xl`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Typography variant="body2" className="text-gray-600 text-sm mb-1">
              {title}
            </Typography>
            <Typography variant="h4" className="font-bold text-gray-900 mb-2">
              {value}
            </Typography>
            {trend && (
              <div className="flex items-center">
                <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend > 0 ? '↗' : '↘'} {trendText}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconBg}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
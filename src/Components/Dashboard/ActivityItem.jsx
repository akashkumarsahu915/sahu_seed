import React from 'react';
import { Typography, Box } from '@mui/material';

const ActivityItem = ({ type, title, subtitle, time, icon: Icon, iconColor = 'text-green-600', iconBg = 'bg-green-100' }) => {
  return (
    <div className="flex items-start space-x-3 py-3">
      <div className={`p-2 rounded-lg ${iconBg} flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <Typography variant="body2" className="font-medium text-gray-900 mb-1">
          {title}
        </Typography>
        <Typography variant="caption" className="text-gray-600">
          {subtitle}
        </Typography>
      </div>
      <Typography variant="caption" className="text-gray-500 flex-shrink-0">
        {time}
      </Typography>
    </div>
  );
};

export default ActivityItem;
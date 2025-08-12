import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { 
  ChartBarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  TruckIcon,
  ExclamationCircleIcon,
  BanknotesIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

import MetricsCard from '../Dashboard/MetricsCard.jsx';
import SalesChart from './SalesChart.jsx';
import ActivityItem from './ActivityItem.jsx';
import LowStockTable from './LowStockTable.jsx';
const AgricultureDashboard = () => {
  const recentActivities = [
    {
      type: 'purchase',
      title: 'Received 200L Liquid Fertilizer from AgriCorp',
      subtitle: '15 minutes ago',
      time: '15 min ago',
      icon: TruckIcon,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      type: 'alert',
      title: 'Low stock alert: Wheat Seeds (Batch #WS001)',
      subtitle: '1 hour ago',
      time: '1 hr ago',
      icon: ExclamationCircleIcon,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100'
    },
    {
      type: 'payment',
      title: 'Payment received from Green Valley Farm - $2450',
      subtitle: '2 hours ago',
      time: '2 hrs ago',
      icon: BanknotesIcon,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      type: 'expiry',
      title: 'Pesticide batch #PS032 expires in 5 days',
      subtitle: '3 hours ago',
      time: '3 hrs ago',
      icon: ClockIcon,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100'
    }
  ];

  return (
    <Box className="p-12 pt-2.5 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h4" className="font-bold text-gray-900 mb-2">
          Seeds & Fertilizer Inventory
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Manage your agricultural supplies efficiently
        </Typography>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Products"
          value="1,247"
          icon={ChartBarIcon}
          trend={12}
          trendText="+12% from last month"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <MetricsCard
          title="Sales Today"
          value="$8,450"
          icon={CurrencyDollarIcon}
          trend={5.2}
          trendText="+5.2% from yesterday"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <MetricsCard
          title="Low Stock Alerts"
          value="23"
          icon={ExclamationTriangleIcon}
          trend={-4}
          trendText="4 critical items"
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
        <MetricsCard
          title="Pending Payments"
          value="$12,850"
          icon={CreditCardIcon}
          trend={-8}
          trendText="8 customers"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Typography variant="h6" className="font-semibold text-gray-900 mb-4">
            Recent Activity
          </Typography>
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                type={activity.type}
                title={activity.title}
                subtitle={activity.subtitle}
                time={activity.time}
                icon={activity.icon}
                iconColor={activity.iconColor}
                iconBg={activity.iconBg}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Table */}
      <div className="mt-6">
        <LowStockTable />
      </div>
    </Box>
  );
};

export default AgricultureDashboard;
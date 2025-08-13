import React from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { PaymentStatus } from './constants';

const StatusFilter = ({ selectedStatus, onStatusChange }) => {
  const statuses = [
    PaymentStatus.ALL,
    PaymentStatus.PAID,
    PaymentStatus.PARTIAL,
    PaymentStatus.PENDING
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <Typography variant="body1" className="text-gray-700 font-medium">
          Filter by Status:
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          {statuses.map((status) => (
            <Button
              key={status}
              onClick={() => onStatusChange(status)}
              variant={selectedStatus === status ? "contained" : "outlined"}
              color={selectedStatus === status ? "success" : "inherit"}
              className={`${
                selectedStatus === status 
                  ? 'bg-green-600 text-white border-green-600' 
                  : 'text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default StatusFilter;

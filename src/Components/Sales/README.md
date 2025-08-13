# Sales Management Components

This directory contains all the components needed for the Sales Management functionality.

## File Structure

```
src/Components/Sales/
├── constants.js          # Sales constants, enums, formatters, and mock data
├── SummaryMetrics.jsx    # Summary metrics cards (Total Sales, Amount Collected, Pending)
├── StatusFilter.jsx      # Status filter buttons (All, Paid, Partial, Pending)
├── SalesItem.jsx         # Individual sales entry display component
├── QuickSaleModal.jsx    # Quick sale modal for processing transactions
├── InvoiceModal.jsx      # Printable invoice modal for viewing sale details
├── SalesManagement.jsx   # Main sales management page
├── index.js             # Component exports
└── README.md            # This file
```

## Components

### SalesManagement.jsx
Main page component that brings together all sales components. Features:
- Header with title and action buttons (+ Quick Sale, Export)
- Summary metrics display
- Status filtering
- Sales list display

### SummaryMetrics.jsx
Displays three key financial metrics:
- Total Sales (blue)
- Amount Collected (green)
- Pending Payments (orange)

### StatusFilter.jsx
Filter buttons to show sales by payment status:
- All (default)
- Paid
- Partial
- Pending

### SalesItem.jsx
Individual sales entry display with:
- Invoice ID and total amount
- Customer information and contact
- Date and time
- Items sold with quantities and prices
- Payment breakdown (subtotal, tax, total, paid, remaining)
- Status chip and action buttons

### QuickSaleModal.jsx
Modal for processing quick sales transactions with:
- Customer information input (name, phone)
- Product selection with checkboxes and quantity inputs
- Category filtering (All Products, Seeds, Fertilizers, Pesticides, Tools)
- Payment method selection (Cash, Card, Bank Transfer, Check)
- Amount paid and remaining amount calculation
- Real-time total calculation based on selected products

### InvoiceModal.jsx
Printable invoice modal displaying complete sale details:
- Company information (Seeds & Fertilizer Shop)
- Invoice header with ID, date, and time
- Customer billing information
- Items table with quantities, prices, and totals
- Payment summary (subtotal, tax, total, amount paid, remaining)
- Payment status indicator
- Terms & conditions
- Print functionality for physical copies

### constants.js
Contains:
- Payment status enums
- Currency and date formatters
- Mock sales data for demonstration

## Mock Data

The component includes realistic mock data with:
- 3 sample sales entries
- Different payment statuses (Paid, Partial, Pending)
- Various product types (seeds, fertilizers, tools)
- Realistic pricing and calculations

## Usage

```jsx
import { SalesManagement } from './Components/Sales';

// Use in your app
<SalesManagement />
```

## Features

- ✅ Responsive design with Tailwind CSS
- ✅ Material-UI components integration
- ✅ Heroicons for consistent iconography
- ✅ Status-based filtering
- ✅ Interactive UI elements
- ✅ Realistic mock data
- ✅ Clean component architecture

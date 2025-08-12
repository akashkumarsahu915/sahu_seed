import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16a34a', // Green-600
      light: '#22c55e', // Green-500
      dark: '#15803d', // Green-700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3b82f6', // Blue-500
      light: '#60a5fa', // Blue-400
      dark: '#2563eb', // Blue-600
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // Emerald-500
      light: '#34d399', // Emerald-400
      dark: '#059669', // Emerald-600
    },
    warning: {
      main: '#f59e0b', // Amber-500
      light: '#fbbf24', // Amber-400
      dark: '#d97706', // Amber-600
    },
    error: {
      main: '#ef4444', // Red-500
      light: '#f87171', // Red-400
      dark: '#dc2626', // Red-600
    },
    info: {
      main: '#3b82f6', // Blue-500
      light: '#60a5fa', // Blue-400
      dark: '#2563eb', // Blue-600
    },
    background: {
      default: '#f9fafb', // Gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // Gray-900
      secondary: '#6b7280', // Gray-500
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.3,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f3f4f6',
          padding: '12px 16px',
        },
        head: {
          fontWeight: 600,
          color: '#374151',
          backgroundColor: '#f9fafb',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
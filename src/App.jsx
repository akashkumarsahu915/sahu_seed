import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme.js';
import AgricultureDashboard from './Components/Dashboard/AgricultureDashboard.jsx';
import MainLayout from './Layout/MainLayout.jsx';

import MainProduct from './Components/Products/MainProduct.jsx';
import SalesManagement from './Components/Sales/SalesManagement.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Mainlayout />}>
              <Route index element={<AgricultureDashboard />} />
              <Route path='/products' element={<MainProduct />}></Route>
              <Route path='/sales' element={<SalesManagement />}></Route>
            </Route>


          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

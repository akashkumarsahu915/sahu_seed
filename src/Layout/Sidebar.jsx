import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Squares2X2Icon,
  ArchiveBoxIcon,
  ShoppingCartIcon,
  TruckIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ChartBarIcon,
  Bars3Icon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item based on current path
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path === '/products') return 'products';
    if (path === '/sales') return 'sales';
    return 'dashboard';
  };

  const activeItem = getActiveItem();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Squares2X2Icon, path: "/" },
    { id: "products", label: "Products", icon: ArchiveBoxIcon, path: "/products" },
    { id: "sales", label: "Sales", icon: ShoppingCartIcon, path: "/sales" },
    { id: "purchases", label: "Purchases", icon: TruckIcon },
    { id: "suppliers", label: "Suppliers", icon: BuildingOfficeIcon },
    { id: "customers", label: "Customers", icon: UsersIcon },
    { id: "reports", label: "Reports", icon: ChartBarIcon },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
    if (isMobile) setMobileOpen(false);
  };

  const renderHeader = () => (
    <Box className="flex items-center px-6 py-6 border-b border-gray-200">
      <Box className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg mr-3">
        <SunIcon className="w-6 h-6 text-white" />
      </Box>
      <Box>
        <Typography variant="h6" className="font-bold text-gray-900">
          MsSahu 
        </Typography>
        <Typography variant="caption" className="text-gray-500">
          Inventory System
        </Typography>
      </Box>
    </Box>
  );

  const renderNavigationItem = (item) => (
    <ListItem key={item.id} disablePadding className="mb-1">
      <ListItemButton
        onClick={() => handleItemClick(item)}
        className={`mx-3 rounded-lg transition-all duration-200 ${activeItem === item.id
            ? "bg-green-50 text-green-700"
            : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
          }`}
      >
        <ListItemIcon
          className={`min-w-0 mr-3 ${activeItem === item.id ? "text-green-600" : "text-gray-500"
            }`}
        >
          <item.icon className="w-5 h-5" />
        </ListItemIcon>
        <ListItemText
          primary={item.label}
        />
      </ListItemButton>
    </ListItem>
  );

  const renderUserProfile = () => (
    <Box className="border-t border-gray-200 p-4">
      <Box className="flex items-center">
        <Avatar
          src="https://i.pravatar.cc/40?img=1"
          alt="User Profile"
          className="w-10 h-10 mr-3"
        />
        <Box className="flex-1">
          <Typography variant="body2" className="font-semibold text-gray-900">
            Kamalakanta Sahu
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            Shop Owner
          </Typography>
        </Box>
      </Box>
      <Box className="mt-4 flex justify-center">
        <button
          type="button"
          className="w-full py-2 px-4 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
          onClick={() => {
            console.log("Logout clicked");
          }}
        >
          Logout
        </button>
      </Box>
    </Box>
  );

  const drawerContent = (
    <Box className="h-full flex flex-col bg-white" sx={{ width: 280 }}>
      {renderHeader()}
      <Box className="flex-1 py-4">
        <List>{navigationItems.map(renderNavigationItem)}</List>
      </Box>
      {renderUserProfile()}
    </Box>
  );

  return (
    <>
      {isMobile && !mobileOpen && (
        <Box className="lg:hidden fixed top-4 left-4 z-[1201]" sx={{ left: { xs: 16, sm: 24 } }}>
          <IconButton
            onClick={handleDrawerToggle}
            aria-label="Toggle sidebar"
            className="bg-white shadow-md text-gray-700 hover:text-green-600"
          >
            <Bars3Icon className="w-6 h-6" />
          </IconButton>
        </Box>
      )}

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
            boxShadow:
              "0 0 0 1px rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

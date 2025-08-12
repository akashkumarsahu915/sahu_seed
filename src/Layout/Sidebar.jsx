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
  TextField,
  InputAdornment,
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
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ activeItem = "dashboard", onItemClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Squares2X2Icon },
    { id: "products", label: "Products", icon: ArchiveBoxIcon },
    { id: "inventory", label: "Inventory", icon: ArchiveBoxIcon },
    { id: "sales", label: "Sales", icon: ShoppingCartIcon },
    { id: "purchases", label: "Purchases", icon: TruckIcon },
    { id: "suppliers", label: "Suppliers", icon: BuildingOfficeIcon },
    { id: "customers", label: "Customers", icon: UsersIcon },
    { id: "reports", label: "Reports", icon: ChartBarIcon },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (itemId) => {
    onItemClick?.(itemId);
    if (isMobile) setMobileOpen(false);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      console.log("Search for:", searchValue);
    }
  };

  const renderHeader = () => (
    <Box className="flex items-center px-6 py-6 border-b border-gray-200">
      <Box className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg mr-3">
        <SunIcon className="w-6 h-6 text-white" />
      </Box>
      <Box>
        <Typography variant="h6" className="font-bold text-gray-900">
          AgriStore
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
        onClick={() => handleItemClick(item.id)}
        disableRipple
        className={`mx-3 rounded-lg transition-all duration-200 ${
          activeItem === item.id
            ? "bg-green-50 text-green-700"
            : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
        }`}
      >
        <ListItemIcon
          className={`min-w-0 mr-3 ${
            activeItem === item.id ? "text-green-600" : "text-gray-500"
          }`}
        >
          <item.icon className="w-5 h-5" />
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontSize: "0.875rem",
            fontWeight: activeItem === item.id ? 600 : 500,
          }}
        />
      </ListItemButton>
    </ListItem>
  );

const renderUserProfile = () => (
    <Box className="border-t border-gray-200 p-4">
        {/* User Profile */}
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
                    // Add your logout logic here
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
        {isMobile && (
            <Box className="lg:hidden fixed top-4 left-4 z-[1201]" sx={{ left: { xs: 16, sm: 24 } }}>
                <IconButton
                    onClick={handleDrawerToggle}
                    aria-label="Toggle sidebar"
                    className="bg-white shadow-md text-gray-700 hover:text-green-600"
                >
                    {mobileOpen ? (
                        <XMarkIcon className="w-6 h-6"/>
                    ) : (
                        <Bars3Icon className="w-6 h-6" />
                    )}
                </IconButton>
            </Box>
        )}

        {/* Desktop Sidebar */}
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

        {/* Mobile Sidebar */}
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

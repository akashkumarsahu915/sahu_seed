import { FaSeedling, FaBox, FaWarehouse, FaShoppingCart, FaTruck, FaUsers, FaChartBar } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
const sidebarItems = [
  { name: "Dashboard", icon: <MdDashboard /> },
  { name: "Products", icon: <FaBox /> },
  { name: "Inventory", icon: <FaWarehouse /> },
  { name: "Sales", icon: <FaShoppingCart /> },
  { name: "Purchases", icon: <FaTruck /> },
  { name: "Suppliers", icon: <FaUsers /> },
  { name: "Customers", icon: <FaUsers /> },
  { name: "Reports", icon: <FaChartBar /> },
];

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white border-r shadow-md flex flex-col">
      {/* Logo and header */}
      <div className="flex items-center px-6 py-4 border-b">
        <FaSeedling className="text-green-600 text-3xl mr-2" />
        <div>
          <div className="text-lg font-bold">Ms Sahu</div>
          <div className="text-xs text-gray-400">Seeds & Fertilizer</div>
        </div>
      </div>

      {/* Sidebar Items */}
      <div className="mt-4 flex-1">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <div
                className={`flex items-center px-6 py-2 rounded-l-lg my-1 cursor-pointer transition hover:bg-green-50 hover:text-green-700 text-gray-700`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* User Section */}
      <div className="border-t px-6 py-4 mt-auto flex items-center">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <div className="font-semibold text-gray-800">John Smith</div>
          <div className="text-xs text-gray-400">Shop Owner</div>
        </div>
      </div>

    </div>
  );
}

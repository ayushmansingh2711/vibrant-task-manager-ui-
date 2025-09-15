
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  LayoutDashboard, 
  ListChecks, 
  FolderKanban, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, path: "/" },
    { name: "Tasks", icon: <ListChecks className="h-5 w-5" />, path: "/tasks" },
    { name: "Calendar", icon: <Calendar className="h-5 w-5" />, path: "/calendar" },
    { name: "Projects", icon: <FolderKanban className="h-5 w-5" />, path: "/projects" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`bg-sidebar h-screen transition-all duration-300 flex flex-col border-r border-border ${
        collapsed ? "w-[80px]" : "w-[250px]"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-taskify-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-xl font-bold text-taskify-purple">Taskify</h1>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 bg-taskify-purple rounded-md flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">T</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {collapsed ? 
            <ChevronRight className="h-5 w-5" /> : 
            <ChevronLeft className="h-5 w-5" />
          }
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-3 flex-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-taskify-purple text-white"
                  : "hover:bg-taskify-purple-light"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

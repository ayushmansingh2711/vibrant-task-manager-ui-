
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Plus, Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TaskDialog from "@/components/TaskDialog";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [search, setSearch] = useState("");
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // This is a simple global task handler that will be replaced by context in a real app
  const handleCreateTask = (task: {
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    tags: string[];
  }) => {
    // Create a custom event to pass the task data to the Tasks component
    const taskEvent = new CustomEvent("newtaskcreated", { 
      detail: { task } 
    });
    window.dispatchEvent(taskEvent);
    
    toast({
      title: "Task created",
      description: `"${task.title}" has been added to your tasks.`,
    });
  };

  const isTasksPage = location.pathname === "/tasks";

  return (
    <header className="bg-background h-16 border-b border-border px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-[300px] pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        <Button 
          variant="default" 
          className="flex items-center gap-2 bg-taskify-purple hover:bg-taskify-purple/90"
          onClick={() => setTaskDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Task</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-taskify-purple text-white">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Task Dialog */}
      <TaskDialog 
        open={taskDialogOpen} 
        onOpenChange={setTaskDialogOpen} 
        onTaskCreate={handleCreateTask} 
      />
    </header>
  );
};

export default Header;

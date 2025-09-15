import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, ListFilter, Plus, Tag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskDialog from "@/components/TaskDialog";
import { useToast } from "@/hooks/use-toast";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  tags: string[];
};

const Tasks = () => {
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const { toast } = useToast();

  const initialTasks: Task[] = [
    {
      id: 1,
      title: "Update homepage design",
      description: "Implement new design elements on the homepage as per client feedback",
      status: "In Progress",
      priority: "High",
      dueDate: "2025-05-08",
      tags: ["Design", "Homepage"],
    },
    {
      id: 2,
      title: "Fix navigation bug",
      description: "Navigation menu doesn't display correctly on mobile screens",
      status: "To Do",
      priority: "Medium",
      dueDate: "2025-05-10",
      tags: ["Bug", "Mobile"],
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "Document the new API endpoints for the team",
      status: "Completed",
      priority: "Low",
      dueDate: "2025-05-05",
      tags: ["Documentation", "API"],
    },
    {
      id: 4,
      title: "Create onboarding flow",
      description: "Design and implement user onboarding experience",
      status: "To Do",
      priority: "High",
      dueDate: "2025-05-15",
      tags: ["UX", "Onboarding"],
    },
    {
      id: 5,
      title: "Performance optimization",
      description: "Optimize loading times for the dashboard page",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2025-05-12",
      tags: ["Performance", "Dashboard"],
    },
    {
      id: 6,
      title: "User testing session",
      description: "Organize user testing session for the new features",
      status: "To Do",
      priority: "Medium",
      dueDate: "2025-05-18",
      tags: ["Testing", "Users"],
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Listen for task creation events from the header
  useEffect(() => {
    const handleNewTaskEvent = (event: any) => {
      const { task } = event.detail;
      addTask(task);
    };

    window.addEventListener('newtaskcreated', handleNewTaskEvent);
    
    return () => {
      window.removeEventListener('newtaskcreated', handleNewTaskEvent);
    };
  }, []);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (!filter || filter === "all") return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === "priority") {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      );
    }
    return 0;
  });

  const handleTaskStatusChange = (taskId: number, newStatus: "To Do" | "In Progress" | "Completed") => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been removed successfully."
    });
  };

  const handleCreateTask = (task: Omit<Task, "id">) => {
    addTask(task);
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">Manage and track your tasks</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <span className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                {filter === "all" ? "All Tasks" : filter || "All Tasks"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <span className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                Sort by: {sortBy === "dueDate" ? "Due Date" : "Priority"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="bg-taskify-purple hover:bg-taskify-purple/90"
          onClick={() => setTaskDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="todo">To Do</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* Task content tabs */}
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks.map((task) => (
              <Card key={task.id} className="hover-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">
                    {task.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-accent flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Select
                    value={task.status}
                    onValueChange={(value) => 
                      handleTaskStatusChange(
                        task.id, 
                        value as "To Do" | "In Progress" | "Completed"
                      )
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="todo" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks
              .filter((task) => task.status === "To Do")
              .map((task) => (
                <Card key={task.id} className="hover-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-1">
                      {task.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-accent flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Select
                      value={task.status}
                      onValueChange={(value) => 
                        handleTaskStatusChange(
                          task.id, 
                          value as "To Do" | "In Progress" | "Completed"
                        )
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            }
          </div>
        </TabsContent>

        <TabsContent value="inprogress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <Card key={task.id} className="hover-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-1">
                      {task.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-accent flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Select
                      value={task.status}
                      onValueChange={(value) => 
                        handleTaskStatusChange(
                          task.id, 
                          value as "To Do" | "In Progress" | "Completed"
                        )
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            }
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <Card key={task.id} className="hover-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-through opacity-70">{task.title}</CardTitle>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-1 opacity-70">
                      {task.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-accent flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Select
                      value={task.status}
                      onValueChange={(value) => 
                        handleTaskStatusChange(
                          task.id, 
                          value as "To Do" | "In Progress" | "Completed"
                        )
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            }
          </div>
        </TabsContent>
      </Tabs>

      {/* Add new task dialog */}
      <TaskDialog 
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        onTaskCreate={handleCreateTask}
      />
    </div>
  );
};

export default Tasks;

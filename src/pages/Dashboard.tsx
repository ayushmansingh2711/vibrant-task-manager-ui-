
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck, Clock, ListChecks, Medal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      icon: <ListChecks className="h-5 w-5 text-taskify-purple" />,
      change: "+5 from last week",
    },
    {
      title: "Completed",
      value: "16",
      icon: <CalendarCheck className="h-5 w-5 text-green-500" />,
      change: "67% completion rate",
    },
    {
      title: "Upcoming",
      value: "8",
      icon: <Clock className="h-5 w-5 text-taskify-orange" />,
      change: "Due this week",
    },
    {
      title: "Productivity",
      value: "86%",
      icon: <Medal className="h-5 w-5 text-taskify-sky-blue" />,
      change: "+12% vs last week",
    },
  ];

  const recentTasks = [
    { id: 1, title: "Presentation mockup", priority: "High", status: "In Progress", dueDate: "Today", category: "Design" },
    { id: 2, title: "Client meeting preparation", priority: "Medium", status: "To Do", dueDate: "Tomorrow", category: "Meeting" },
    { id: 3, title: "Update project documentation", priority: "Low", status: "In Progress", dueDate: "May 8", category: "Documentation" },
    { id: 4, title: "Review team submissions", priority: "Medium", status: "In Progress", dueDate: "May 10", category: "Review" },
  ];

  const pieData = [
    { name: "Completed", value: 16, color: "#9b87f5" },
    { name: "In Progress", value: 5, color: "#F97316" },
    { name: "To Do", value: 3, color: "#8E9196" },
  ];

  const barData = [
    { name: "Mon", completed: 4, pending: 2 },
    { name: "Tue", completed: 3, pending: 1 },
    { name: "Wed", completed: 5, pending: 2 },
    { name: "Thu", completed: 2, pending: 3 },
    { name: "Fri", completed: 6, pending: 1 },
    { name: "Sat", completed: 2, pending: 0 },
    { name: "Sun", completed: 1, pending: 0 },
  ];

  const priorityColors = {
    High: "text-red-500 bg-red-50",
    Medium: "text-amber-500 bg-amber-50",
    Low: "text-green-500 bg-green-50",
  };

  const statusColors = {
    "To Do": "text-slate-500 bg-slate-100",
    "In Progress": "text-blue-500 bg-blue-50",
    "Completed": "text-green-500 bg-green-50",
  };

  const categoryColors = {
    Design: "text-purple-500 bg-purple-50",
    Meeting: "text-blue-500 bg-blue-50",
    Documentation: "text-amber-500 bg-amber-50",
    Review: "text-green-500 bg-green-50",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your task overview and progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover-card">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 hover-card">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Tasks completed vs pending this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" name="Completed" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending" fill="#D3E4FD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-card">
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Status of your tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-card">
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>Your most recent tasks and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-muted-foreground text-sm">
                  <th className="pb-3 font-medium">Task</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id} className="border-b border-border">
                    <td className="py-3">
                      <div className="font-medium">{task.title}</div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[task.category as keyof typeof categoryColors]}`}>
                        {task.category}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status as keyof typeof statusColors]}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3">{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

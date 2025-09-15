
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Plus, Users } from "lucide-react";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Completed" | "On Hold";
  progress: number;
  deadline: string;
  tasks: {
    total: number;
    completed: number;
  };
  team: {
    id: number;
    name: string;
    avatar?: string;
    initials: string;
  }[];
  category: string;
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  const projects: Project[] = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesigning the company website with a modern look and improved UX",
      status: "Active",
      progress: 75,
      deadline: "2025-05-20",
      tasks: {
        total: 24,
        completed: 18,
      },
      team: [
        { id: 1, name: "Alex Johnson", initials: "AJ" },
        { id: 2, name: "Maria Garcia", initials: "MG" },
        { id: 3, name: "David Chen", initials: "DC" },
      ],
      category: "Design",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Creating a new mobile application for customer engagement",
      status: "Active",
      progress: 45,
      deadline: "2025-06-15",
      tasks: {
        total: 32,
        completed: 14,
      },
      team: [
        { id: 4, name: "Sarah Williams", initials: "SW" },
        { id: 5, name: "James Wilson", initials: "JW" },
        { id: 6, name: "Emma Brown", initials: "EB" },
        { id: 7, name: "Michael Lee", initials: "ML" },
      ],
      category: "Development",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q2 marketing campaign for product launch",
      status: "Active",
      progress: 30,
      deadline: "2025-07-01",
      tasks: {
        total: 18,
        completed: 5,
      },
      team: [
        { id: 8, name: "Emily Davis", initials: "ED" },
        { id: 9, name: "Robert Taylor", initials: "RT" },
      ],
      category: "Marketing",
    },
    {
      id: 4,
      name: "Database Migration",
      description: "Migrating data from legacy systems to new cloud infrastructure",
      status: "On Hold",
      progress: 20,
      deadline: "2025-08-10",
      tasks: {
        total: 42,
        completed: 8,
      },
      team: [
        { id: 10, name: "Thomas Moore", initials: "TM" },
        { id: 11, name: "Jessica Adams", initials: "JA" },
        { id: 12, name: "Daniel Wilson", initials: "DW" },
      ],
      category: "Development",
    },
    {
      id: 5,
      name: "User Research",
      description: "Conducting user interviews and usability testing",
      status: "Completed",
      progress: 100,
      deadline: "2025-04-30",
      tasks: {
        total: 15,
        completed: 15,
      },
      team: [
        { id: 13, name: "Olivia Martin", initials: "OM" },
        { id: 14, name: "Noah Thompson", initials: "NT" },
      ],
      category: "Research",
    },
    {
      id: 6,
      name: "Content Strategy",
      description: "Developing content strategy for social media channels",
      status: "Completed",
      progress: 100,
      deadline: "2025-04-15",
      tasks: {
        total: 20,
        completed: 20,
      },
      team: [
        { id: 15, name: "Sophia Anderson", initials: "SA" },
        { id: 16, name: "William Jackson", initials: "WJ" },
      ],
      category: "Marketing",
    },
  ];

  const getFilteredProjects = () => {
    switch (activeTab) {
      case "active":
        return projects.filter((project) => project.status === "Active");
      case "completed":
        return projects.filter((project) => project.status === "Completed");
      case "onhold":
        return projects.filter((project) => project.status === "On Hold");
      default:
        return projects;
    }
  };

  const filteredProjects = getFilteredProjects();

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design":
        return "bg-purple-100 text-purple-800";
      case "Development":
        return "bg-blue-100 text-blue-800";
      case "Marketing":
        return "bg-green-100 text-green-800";
      case "Research":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">Manage and track your project portfolio</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Tabs defaultValue="all" className="w-full sm:w-auto" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="onhold">On Hold</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button className="bg-taskify-purple hover:bg-taskify-purple/90 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {project.description}
                  </CardDescription>
                </div>
                <Badge className={getCategoryColor(project.category)}>
                  {project.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{project.progress}% complete</span>
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <Progress value={project.progress} className={getProgressColor(project.progress)} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Due: {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {project.tasks.completed}/{project.tasks.total} tasks
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member) => (
                  <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-taskify-purple text-white text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.team.length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{project.team.length}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {activeTab === "all" ? "Create a new project to get started" : "Change the filter to see more projects"}
          </p>
          <Button className="bg-taskify-purple hover:bg-taskify-purple/90 mt-4">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;

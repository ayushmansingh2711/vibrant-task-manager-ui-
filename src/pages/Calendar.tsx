
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, List, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CalendarEvent = {
  id: number;
  title: string;
  date: Date;
  priority: "Low" | "Medium" | "High";
  tags: string[];
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "day" | "week">("month");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate calendar events
  const generateEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    // Add events for the current month
    const priorities: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
    const tags = ["Design", "Meeting", "Deadline", "Planning", "Development", "Client", "Internal"];

    const getRandomTags = () => {
      const numTags = Math.floor(Math.random() * 2) + 1;
      const shuffled = [...tags].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numTags);
    };

    // Create sample events distributed throughout the month
    for (let i = 1; i <= 15; i++) {
      const day = Math.floor(Math.random() * 28) + 1;
      const eventDate = new Date(thisYear, thisMonth, day);
      
      events.push({
        id: i,
        title: `Task ${i}`,
        date: eventDate,
        priority: priorities[Math.floor(Math.random() * 3)],
        tags: getRandomTags(),
      });
    }

    return events;
  };

  const events = generateEvents();

  // Get events for the selected date
  const eventsForSelectedDate = date
    ? events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      )
    : [];

  // Get events for the selected month
  const eventsForSelectedMonth = date
    ? events.filter(
        (event) =>
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      )
    : [];

  // Function to get days with events
  const getEventDates = () => {
    return events.map((event) => new Date(event.date));
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">Manage your schedule and task deadlines</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 lg:w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={() => {
                    if (date) {
                      const newDate = new Date(date);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setDate(newDate);
                    }
                  }}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => {
                    if (date) {
                      const newDate = new Date(date);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setDate(newDate);
                    }
                  }}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  modifiers={{
                    booked: getEventDates(),
                  }}
                  modifiersStyles={{
                    booked: {
                      backgroundColor: "rgb(219 234 254)", // Light blue for dates with events
                    },
                  }}
                  className="rounded-md border"
                />
              </div>
              {date && (
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg">
                    {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {eventsForSelectedDate.length} events
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Tasks due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventsForSelectedMonth
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-accent rounded-md flex items-center justify-center">
                          <CalendarIcon className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {event.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={priorityColors[event.priority]}>
                        {event.priority}
                      </Badge>
                    </div>
                  ))}
                {eventsForSelectedMonth.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No upcoming deadlines</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/2 lg:w-2/3">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {date ? `Events for ${monthNames[date.getMonth()]} ${date.getFullYear()}` : "Events"}
                </CardTitle>
                <Tabs value={view} onValueChange={(v) => setView(v as "month" | "day" | "week")}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={view}>
                <TabsContent value="day" className="space-y-4">
                  {eventsForSelectedDate.length > 0 ? (
                    eventsForSelectedDate.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border rounded-md hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge className={priorityColors[event.priority]}>
                            {event.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-accent flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <List className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No events for this day</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select a different day or add a new event
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="week">
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-medium text-sm py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2 h-[600px]">
                    {Array.from({ length: 7 }, (_, i) => {
                      const dayDate = new Date(date || new Date());
                      // Get the current day of the week (0-6, where 0 is Sunday)
                      const currentDayOfWeek = dayDate.getDay();
                      // Calculate how many days to go back to get to Sunday
                      const daysToSunday = currentDayOfWeek;
                      // Set the date to the Sunday of the current week
                      dayDate.setDate(dayDate.getDate() - daysToSunday + i);
                      
                      // Find events for this day
                      const dayEvents = events.filter(
                        (event) =>
                          event.date.getDate() === dayDate.getDate() &&
                          event.date.getMonth() === dayDate.getMonth() &&
                          event.date.getFullYear() === dayDate.getFullYear()
                      );
                      
                      return (
                        <div 
                          key={i} 
                          className={`border rounded-md overflow-auto ${
                            dayDate.getMonth() === (date?.getMonth() || new Date().getMonth())
                              ? "bg-card"
                              : "bg-muted/30 text-muted-foreground"
                          }`}
                        >
                          <div className="sticky top-0 bg-inherit p-1 text-center border-b">
                            {dayDate.getDate()}
                          </div>
                          <div className="p-1 space-y-1">
                            {dayEvents.map((event) => (
                              <div 
                                key={event.id}
                                className="text-xs p-1 rounded bg-primary/10 truncate cursor-pointer hover:bg-primary/20"
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="month">
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-medium text-sm py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2 h-[600px]">
                    {Array.from({ length: 35 }, (_, i) => {
                      const monthDate = new Date(date || new Date());
                      monthDate.setDate(1); // Go to the first day of the month
                      
                      // Calculate the day of the week for the first day (0-6)
                      const firstDayOfMonth = monthDate.getDay();
                      
                      // Calculate the day to display 
                      monthDate.setDate(i - firstDayOfMonth + 1);
                      
                      // Find events for this day
                      const dayEvents = events.filter(
                        (event) =>
                          event.date.getDate() === monthDate.getDate() &&
                          event.date.getMonth() === monthDate.getMonth() &&
                          event.date.getFullYear() === monthDate.getFullYear()
                      );
                      
                      // Check if the date belongs to the current month
                      const isCurrentMonth = monthDate.getMonth() === (date?.getMonth() || new Date().getMonth());
                      
                      return (
                        <div 
                          key={i} 
                          className={`border rounded-md overflow-auto ${
                            isCurrentMonth
                              ? "bg-card"
                              : "bg-muted/30 text-muted-foreground"
                          }`}
                        >
                          <div className="sticky top-0 bg-inherit p-1 text-center border-b">
                            {monthDate.getDate()}
                          </div>
                          <div className="p-1 space-y-1">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div 
                                key={event.id}
                                className="text-xs p-1 rounded bg-primary/10 truncate cursor-pointer hover:bg-primary/20"
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-center text-muted-foreground">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;


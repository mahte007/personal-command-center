import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { TodayTasks } from "@/features/tasks/components/today-tasks";
import { RecentNotes } from "@/features/notes/components/recent-notes";

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Good evening"
          description="Here’s what’s happening today."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today</CardTitle>
              <CardDescription>
                Tasks that need your attention
              </CardDescription>
            </CardHeader>

            <CardContent>
              <TodayTasks />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>
                Your next scheduled events
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                No upcoming events.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Notes</CardTitle>
              <CardDescription>
                Recently edited notes
              </CardDescription>
              <CardContent>
                <RecentNotes />
              </CardContent>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Nothing has happened yet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
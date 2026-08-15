import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { TasksView } from "@/features/tasks/components/tasks-view";

export default function TasksPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Tasks"
          description="Manage everything you need to get done."
        />
        <TasksView />
      </div>
    </PageContainer>
  );
}

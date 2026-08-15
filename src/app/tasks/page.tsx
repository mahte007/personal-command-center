import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export default function TasksPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Tasks"
        description="Manage everything you need to get done."
      />
    </PageContainer>
  );
}
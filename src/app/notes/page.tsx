import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { NotesView } from "@/features/notes/components/notes-view";

export default function NotesPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Notes"
          description="Capture an organize your thoughts"
        />

        <NotesView />
      </div>
    </PageContainer>
  );
}

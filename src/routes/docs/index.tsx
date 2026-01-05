import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/Layout/DocsLayout";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

export const Route = createFileRoute("/docs/")({
  loader: async () => {
    const docs = await getAllDocs();
    const content = await getDocBySlug("index");
    return { docs, content };
  },
  component: DocsIndex,
});

function DocsIndex() {
  const { docs, content } = Route.useLoaderData();

  if (!content) {
    return (
      <DocsLayout docs={docs} currentSlug="index">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground">Documentation</h1>
          <p className="text-muted-foreground mt-2">
            Select a topic from the sidebar to get started.
          </p>
        </div>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout docs={docs} currentSlug="index">
      <MarkdownRenderer content={content.content} />
    </DocsLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/Layout/DocsLayout";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { getAllDocs, getDocBySlug } from "@/lib/docs";
import { NotFound } from "@/components/NotFound";

export const Route = createFileRoute("/docs/$slug")({
  loader: async ({ params }) => {
    const docs = await getAllDocs();
    const content = await getDocBySlug(params.slug);
    return { docs, content, slug: params.slug };
  },
  notFoundComponent: NotFound,
  component: DocsPage,
});

function DocsPage() {
  const { docs, content, slug } = Route.useLoaderData();

  if (!content) {
    return <NotFound />;
  }

  return (
    <DocsLayout docs={docs} currentSlug={slug}>
      <MarkdownRenderer content={content.content} />
    </DocsLayout>
  );
}

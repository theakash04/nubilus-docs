import matter from "gray-matter";

// Import all markdown files from content/docs
const docsModules = import.meta.glob("/src/content/docs/*.md", {
  query: "?raw",
  import: "default",
});

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
}

export interface DocContent extends DocMeta {
  content: string;
}

// Get list of all docs with metadata
export async function getAllDocs(): Promise<DocMeta[]> {
  const docs: DocMeta[] = [];

  for (const path of Object.keys(docsModules)) {
    const rawContent = (await docsModules[path]()) as string;
    const { data } = matter(rawContent);

    // Extract slug from path: /src/content/docs/installation.md -> installation
    const slug = path.replace("/src/content/docs/", "").replace(".md", "");

    docs.push({
      slug,
      title: data.title || slug,
      description: data.description || "",
      order: data.order ?? 99,
    });
  }

  return docs.sort((a, b) => a.order - b.order);
}

// Get a single doc by slug
export async function getDocBySlug(slug: string): Promise<DocContent | null> {
  const path = `/src/content/docs/${slug}.md`;

  if (!docsModules[path]) {
    return null;
  }

  const rawContent = (await docsModules[path]()) as string;
  const { data, content } = matter(rawContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    order: data.order ?? 99,
    content,
  };
}

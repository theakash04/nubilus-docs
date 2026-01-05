import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MermaidDiagram } from "./MermaidDiagram";

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-foreground mb-6 mt-2">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-foreground mb-4 mt-10 pb-2 border-b border-border">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-foreground mb-2 mt-6">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground leading-7 mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-2"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-1 mb-4 text-muted-foreground [&_ul]:mt-1 [&_ul]:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-1 mb-4 text-muted-foreground [&_ol]:mt-1 [&_ol]:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7 pl-1">{children}</li>,
  code: ({ className, children }) => {
    // Check if this is a code block (has language-* class) or inline code
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const isCodeBlock = !!match;

    if (!isCodeBlock) {
      // Inline code
      return (
        <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground">
          {children}
        </code>
      );
    }

    // Mermaid diagrams
    if (language === "mermaid") {
      return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
    }

    // Code block with syntax highlighting
    return (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  pre: ({ children }) => (
    <div className="mb-4 overflow-hidden rounded-lg border border-border">
      {children}
    </div>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground mb-4">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse border border-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-border px-4 py-2 text-left text-sm font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-2 text-sm text-muted-foreground">
      {children}
    </td>
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      className="rounded-lg border border-border my-4 max-w-2xl h-auto"
    />
  ),
};

// Remove content wrapped in <!-- coming-soon --> ... <!-- /coming-soon --> comments
const filterComingSoon = (content: string): string => {
  return content.replace(
    /<!--\s*coming-soon\s*-->[\s\S]*?<!--\s*\/coming-soon\s*-->/gi,
    ""
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const filteredContent = filterComingSoon(content);
  
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {filteredContent}
      </ReactMarkdown>
    </div>
  );
};

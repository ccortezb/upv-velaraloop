import React from "react";

function inline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={i++} className="font-semibold text-[var(--text-primary)]">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <code
          key={i++}
          className="rounded bg-[var(--bg-base)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--brand-primary)]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    last = m.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let code: string[] | null = null;
  let key = 0;

  const flushList = () => {
    if (!list) return;
    const items = list.items.map((it, idx) => (
      <li key={idx} className="ml-1">
        {inline(it)}
      </li>
    ));
    blocks.push(
      list.ordered ? (
        <ol key={key++} className="list-decimal space-y-1 pl-5 text-[var(--text-secondary)]">
          {items}
        </ol>
      ) : (
        <ul key={key++} className="list-disc space-y-1 pl-5 text-[var(--text-secondary)]">
          {items}
        </ul>
      )
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("```")) {
      if (code === null) {
        code = [];
      } else {
        blocks.push(
          <pre
            key={key++}
            className="overflow-x-auto rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-3 text-xs"
          >
            <code className="font-mono text-[var(--text-secondary)]">{code.join("\n")}</code>
          </pre>
        );
        code = null;
      }
      continue;
    }
    if (code !== null) {
      code.push(raw);
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h4 key={key++} className="mt-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
          {inline(line.slice(4))}
        </h4>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h3 key={key++} className="mt-4 text-[var(--text-primary)]">
          {inline(line.slice(3))}
        </h3>
      );
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      blocks.push(
        <h2 key={key++} className="mt-4 text-[var(--text-primary)]">
          {inline(line.slice(2))}
        </h2>
      );
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.*)/);
    if (ol) {
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ol[1]);
      continue;
    }
    if (line.startsWith("- ")) {
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(line.slice(2));
      continue;
    }

    if (line.trim() === "") {
      flushList();
      continue;
    }

    flushList();
    blocks.push(
      <p key={key++} className="text-[var(--text-secondary)]">
        {inline(line)}
      </p>
    );
  }

  flushList();
  if (code !== null) {
    blocks.push(
      <pre
        key={key++}
        className="overflow-x-auto rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-3 text-xs"
      >
        <code className="font-mono text-[var(--text-secondary)]">{code.join("\n")}</code>
      </pre>
    );
  }

  return <div className="space-y-3 leading-relaxed">{blocks}</div>;
}

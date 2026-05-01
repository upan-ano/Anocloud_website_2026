import Link from "next/link";

export default function EditorHomePage() {
  return (
    <div className="glass rounded-[32px] p-8 text-foreground shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <h1 className="text-3xl font-semibold">Creator Workspace</h1>
      <p className="mt-3 text-text-body">Start a new article or edit an existing insight.</p>
      <Link href="/cms/editor/123" className="mt-6 inline-flex rounded-3xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/15">
        Open sample editor
      </Link>
    </div>
  );
}

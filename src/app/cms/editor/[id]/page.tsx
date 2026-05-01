type EditorParams = {
  params: {
    id: string;
  };
};

export default function EditorDetailPage({ params }: EditorParams) {
  return (
    <div className="glass rounded-[32px] p-8 text-foreground shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <h1 className="text-3xl font-semibold">Editing insight: {params.id}</h1>
      <p className="mt-3 text-text-body">This view will become your structured content editor with GenAI guidance and schema validation.</p>
    </div>
  );
}

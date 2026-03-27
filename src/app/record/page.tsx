// src/app/record/page.tsx
export default function RecordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50">
      <h1 className="text-2xl font-semibold mb-6">LectureFlow — Recording</h1>
      <button
        className="rounded-full w-24 h-24 bg-red-500 hover:bg-red-600 active:scale-95 transition transform shadow-lg"
        onClick={() => {
          alert("Recording logic goes here");
        }}
      />
      <p className="mt-4 text-sm text-slate-300">
        This is a placeholder. Next step: wire up real recording.
      </p>
    </main>
  );
}

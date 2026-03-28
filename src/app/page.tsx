// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50">
      <h1 className="text-4xl font-semibold mb-4">LectureFlow</h1>
      <p className="text-slate-300 mb-6 text-center px-4">
        A mobile-first web app for recording lectures, live transcription, AI notes, and GoodNotes exports.
      </p>
      <Link
        href="/record"
        className="rounded-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 px-6 py-3 font-medium shadow-lg"
      >
        Start Recording
      </Link>
    </main>
  );
}

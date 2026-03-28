// src/app/record/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type RecordingState = "idle" | "recording" | "stopped";

export default function RecordPage() {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  async function startRecording() {
    try {
      setError(null);
      setAudioUrl(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecordingState("recording");
    } catch (err) {
      console.error(err);
      setError("Could not start recording. Check microphone permissions in your browser.");
      setRecordingState("idle");
    }
  }

  function stopRecording() {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    setRecordingState("stopped");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-semibold text-center">LectureFlow</h1>
        <p className="text-center text-slate-300">
          One-tap recording for your lectures. This is your MVP recording screen.
        </p>

        <div className="flex justify-center">
          {recordingState !== "recording" ? (
            <button
              onClick={startRecording}
              className="h-24 w-24 rounded-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 transition shadow-lg flex items-center justify-center text-lg font-semibold"
            >
              Record
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="h-24 w-24 rounded-full bg-red-500 hover:bg-red-400 active:bg-red-600 transition shadow-lg flex items-center justify-center text-lg font-semibold"
            >
              Stop
            </button>
          )}
        </div>

        <div className="text-center text-sm text-slate-400">
          Status:{" "}
          {recordingState === "idle" && "Idle"}
          {recordingState === "recording" && "Recording…"}
          {recordingState === "stopped" && "Recorded"}
        </div>

        {error && (
          <div className="rounded-md bg-red-500/10 border border-red-500/40 px-3 py-2 text-sm text-red-100">
            {error}
          </div>
        )}

        {audioUrl && (
          <div className="space-y-2">
            <p className="text-sm text-slate-200">Preview your recording:</p>
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )}

        <div className="mt-4 space-y-2">
          <p className="text-sm text-slate-400">
            Next steps (not wired yet, just placeholders):
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              disabled
              className="flex-1 rounded-md bg-slate-800/80 text-slate-400 px-3 py-2 text-sm border border-slate-700 cursor-not-allowed"
            >
              Generate Notes (coming soon)
            </button>
            <button
              disabled
              className="flex-1 rounded-md bg-slate-800/80 text-slate-400 px-3 py-2 text-sm border border-slate-700 cursor-not-allowed"
            >
              Export to GoodNotes PDF (coming soon)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

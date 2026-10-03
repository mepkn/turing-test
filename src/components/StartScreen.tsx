export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <p className="mb-3 text-lg font-semibold uppercase tracking-widest text-indigo-600">Turing Test · 1950</p>
      <h1 className="mb-6 text-5xl font-extrabold leading-tight text-slate-900 sm:text-6xl">Can you spot the AI?</h1>
      <p className="mb-10 max-w-xl text-xl text-slate-700">
        Each question has two answers. One was written by a student. One was written by AI. Find the AI.
      </p>
      <button
        onClick={onStart}
        autoFocus
        className="rounded-2xl bg-indigo-600 px-14 py-5 text-2xl font-bold text-white shadow-lg transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
      >
        Start
      </button>
      <p className="mt-6 text-base text-slate-500">Tip: press A or B to choose, Enter for next.</p>
    </div>
  )
}

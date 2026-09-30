import { useEffect } from 'react'
import confetti from 'canvas-confetti'

function verdict(score, total) {
  const pct = score / total
  if (pct <= 3 / 8) return 'The AI fooled you!'
  if (pct <= 5 / 8) return "That's close to guessing. Turing would say the AI passed."
  return 'Sharp eyes!'
}

export default function ResultScreen({ rounds, results, onRestart }) {
  const total = rounds.length
  const score = results.filter((r) => r.correct).length
  const wrong = rounds.map((r, i) => ({ ...r, result: results[i] })).filter((r) => !r.result.correct)

  useEffect(() => {
    confetti({ particleCount: score >= total * 0.75 ? 160 : 70, spread: 80, origin: { y: 0.4 } })
  }, [score, total])

  return (
    <div className="space-y-10 py-6">
      <section className="text-center">
        <h1 className="mb-3 text-4xl font-extrabold sm:text-5xl">
          You found the AI in {score} of {total} rounds
        </h1>
        <p className="text-2xl font-semibold text-indigo-700">{verdict(score, total)}</p>
      </section>

      {wrong.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">Rounds you missed</h2>
          <div className="space-y-5">
            {wrong.map((r) => (
              <div key={r.question.id} className="rounded-2xl border-2 border-slate-200 bg-white p-5">
                <p className="mb-3 text-xl font-semibold">{r.question.question}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {r.options.map((o, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border-2 p-4 ${r.result.choice === i ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-slate-50'}`}
                    >
                      <span className="mb-1 block text-base font-bold">
                        {i === 0 ? 'A' : 'B'} · {o.isAI ? '🤖 AI' : '🧑 Human'}
                        {r.result.choice === i && ' · Your pick ❌'}
                      </span>
                      <span className="text-lg">{o.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-lg text-slate-600">💡 {r.question.clue}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="text-center">
        <button
          onClick={onRestart}
          autoFocus
          className="rounded-2xl bg-indigo-600 px-12 py-4 text-2xl font-bold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
        >
          Play again
        </button>
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { bigButton } from '@/lib/styles'
import type { Result, Round } from '../types.ts'

function verdict(score: number, total: number): string {
  const pct = score / total
  if (pct <= 3 / 8) return 'The AI fooled you!'
  if (pct <= 5 / 8) return "That's close to guessing. Turing would say the AI passed."
  return 'Sharp eyes!'
}

type Props = { rounds: Round[]; results: Result[]; onRestart: () => void }

export default function ResultScreen({ rounds, results, onRestart }: Props) {
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
        <p className="text-2xl font-semibold text-primary">{verdict(score, total)}</p>
      </section>

      {wrong.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">Rounds you missed</h2>
          <div className="space-y-5">
            {wrong.map((r) => (
              <Card key={r.question.id} className="gap-0 rounded-2xl p-5 text-base">
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
                <p className="mt-3 text-lg text-muted-foreground">💡 {r.question.clue}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <div className="text-center">
        <Button onClick={onRestart} autoFocus className={`px-12 ${bigButton}`}>
          Play again
        </Button>
      </div>
    </div>
  )
}

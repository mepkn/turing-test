import { Button } from '@/components/ui/button'
import { bigButton } from '@/lib/styles'

export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <p className="mb-3 text-lg font-semibold uppercase tracking-widest text-primary">Turing Test · 1950</p>
      <h1 className="mb-6 text-5xl font-extrabold leading-tight text-foreground sm:text-6xl">Can you spot the AI?</h1>
      <p className="mb-10 max-w-xl text-xl text-muted-foreground">
        Each question has two answers. One was written by a student. One was written by AI. Find the AI.
      </p>
      <Button onClick={onStart} autoFocus className={`px-14 py-5 ${bigButton}`}>
        Start
      </Button>
      <p className="mt-6 text-base text-muted-foreground">Tip: press A or B to choose, Enter for next.</p>
    </div>
  )
}

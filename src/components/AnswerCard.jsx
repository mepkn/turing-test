import { motion } from 'framer-motion'

// Both faces render identical text styles so formatting never gives a clue.
export default function AnswerCard({ letter, text, isAI, revealed, picked, onPick, disabled }) {
  const face =
    'absolute inset-0 flex flex-col rounded-3xl border-4 p-6 sm:p-8 [backface-visibility:hidden]'
  // Colour reflects whether the student's pick was right, not Human vs AI.
  const backColor = !picked
    ? 'border-slate-300 bg-white'
    : isAI
      ? 'border-emerald-500 bg-emerald-50'
      : 'border-rose-500 bg-rose-50'

  return (
    <button
      type="button"
      onClick={onPick}
      disabled={disabled}
      aria-label={`Answer ${letter}`}
      className="group relative block min-h-[220px] w-full text-left [perspective:1200px] focus:outline-none sm:min-h-[260px]"
    >
      <motion.div
        className="relative h-full min-h-[220px] w-full [transform-style:preserve-3d] sm:min-h-[260px]"
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front */}
        <div
          className={`${face} border-slate-200 bg-white shadow-md transition group-hover:border-indigo-400 group-focus-visible:border-indigo-500`}
        >
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
            {letter}
          </span>
          <p className="text-2xl leading-snug text-slate-900">{text}</p>
        </div>
        {/* Back */}
        <div className={`${face} ${backColor} shadow-md [transform:rotateY(180deg)]`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
              {letter}
            </span>
            <span
              className={`rounded-full px-4 py-1 text-xl font-bold text-white ${isAI ? 'bg-indigo-600' : 'bg-slate-600'}`}
            >
              {isAI ? '🤖 AI' : '🧑 Human'}
            </span>
            {picked && (
              <span className={`ml-auto text-lg font-semibold ${isAI ? 'text-emerald-700' : 'text-rose-700'}`}>
                Your pick {isAI ? '✅' : '❌'}
              </span>
            )}
          </div>
          <p className="text-2xl leading-snug text-slate-900">{text}</p>
        </div>
      </motion.div>
    </button>
  )
}

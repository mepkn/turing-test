import { useCallback, useEffect, useReducer } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import questions from './data/turing.json'
import { pick, shuffle } from './utils/shuffle.js'
import StartScreen from './components/StartScreen.jsx'
import AnswerCard from './components/AnswerCard.jsx'
import ResultScreen from './components/ResultScreen.jsx'

const NUM_ROUNDS = 8

function buildRounds() {
  const eliza = questions.find((q) => q.type === 'eliza')
  const regular = shuffle(questions.filter((q) => q.type !== 'eliza'))
  const chosen = eliza ? [...regular.slice(0, NUM_ROUNDS - 1), eliza] : regular.slice(0, NUM_ROUNDS)
  return chosen.map((q) => ({
    question: q,
    options: shuffle([
      { text: pick(q.human), isAI: false },
      { text: pick(q.ai), isAI: true },
    ]),
  }))
}

const initialState = { phase: 'start', rounds: [], index: 0, results: [], picked: null }

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...initialState, phase: 'playing', rounds: buildRounds() }
    case 'pick': {
      if (state.phase !== 'playing') return state
      const correct = state.rounds[state.index].options[action.choice].isAI
      return {
        ...state,
        phase: 'revealed',
        picked: action.choice,
        results: [...state.results, { choice: action.choice, correct }],
      }
    }
    case 'next':
      if (state.phase !== 'revealed') return state
      if (state.index + 1 >= state.rounds.length) return { ...state, phase: 'finished' }
      return { ...state, phase: 'playing', index: state.index + 1, picked: null }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { phase, rounds, index, picked, results } = state
  const round = rounds[index]

  const onKey = useCallback(
    (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      if (phase === 'playing' && (k === 'a' || k === 'b')) dispatch({ type: 'pick', choice: k === 'a' ? 0 : 1 })
      else if (phase === 'revealed' && k === 'enter') {
        e.preventDefault()
        dispatch({ type: 'next' })
      }
    },
    [phase],
  )

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  const revealed = phase === 'revealed'
  const lastResult = results[results.length - 1]
  const isBonus = round?.question.type === 'eliza'

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
      {phase === 'start' && <StartScreen onStart={() => dispatch({ type: 'start' })} />}

      {(phase === 'playing' || revealed) && round && (
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="text-lg font-semibold text-slate-500">
                Round {index + 1} of {rounds.length}
              </span>
              {isBonus && (
                <span className="rounded-full bg-amber-100 px-4 py-1 text-lg font-bold text-amber-800">
                  Bonus round: AI from 1966
                </span>
              )}
            </div>
            <h2 className="mb-6 text-[28px] font-bold leading-tight sm:text-4xl">{round.question.question}</h2>

            <p className="mb-3 text-xl font-semibold text-slate-800">
              {revealed ? '' : 'Tap the answer you think is AI:'}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {round.options.map((o, i) => (
                <AnswerCard
                  key={i}
                  letter={i === 0 ? 'A' : 'B'}
                  text={o.text}
                  isAI={o.isAI}
                  revealed={revealed}
                  picked={picked === i}
                  disabled={revealed}
                  onPick={() => dispatch({ type: 'pick', choice: i })}
                />
              ))}
            </div>

            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 rounded-2xl border-2 border-slate-200 bg-white p-6"
              >
                <p className="mb-2 text-3xl font-bold">
                  {lastResult.correct ? '✅ Correct! You found the AI.' : '❌ Wrong — that one was human.'}
                </p>
                <p className="mb-5 text-xl text-slate-700">💡 {round.question.clue}</p>
                <button
                  autoFocus
                  onClick={() => dispatch({ type: 'next' })}
                  className="rounded-2xl bg-indigo-600 px-10 py-4 text-2xl font-bold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
                >
                  {index + 1 >= rounds.length ? 'See results' : 'Next'} →
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {phase === 'finished' && (
        <ResultScreen rounds={rounds} results={results} onRestart={() => dispatch({ type: 'start' })} />
      )}
    </main>
  )
}

export type Question = {
  id: string
  question: string
  type: 'personal' | 'opinion' | 'trick' | 'eliza'
  human: string[]
  ai: string[]
  clue: string
}

export type Option = { text: string; isAI: boolean }
export type Round = { question: Question; options: Option[] }
export type Result = { choice: number; correct: boolean }

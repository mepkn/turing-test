import { describe, expect, it } from 'vitest'
import questions from '../data/turing.json'
import type { Question } from '../types'
import { pick, shuffle } from './shuffle'

describe('shuffle', () => {
  it('returns a new array with the same items', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8]
    const out = shuffle(input)
    expect(out).not.toBe(input)
    expect([...out].sort()).toEqual(input)
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  it('handles empty and single-item arrays', () => {
    expect(shuffle([])).toEqual([])
    expect(shuffle(['a'])).toEqual(['a'])
  })
})

describe('pick', () => {
  it('returns an item from the array', () => {
    const items = ['a', 'b', 'c']
    for (let i = 0; i < 20; i++) expect(items).toContain(pick(items))
  })
})

describe('question data', () => {
  const data = questions as Question[]

  it('has unique ids', () => {
    expect(new Set(data.map((q) => q.id)).size).toBe(data.length)
  })

  it('gives every question a known type, a clue and both kinds of answer', () => {
    for (const q of data) {
      expect(['personal', 'opinion', 'trick', 'eliza']).toContain(q.type)
      expect(q.question.trim()).not.toBe('')
      expect(q.clue.trim()).not.toBe('')
      expect(q.human.length, q.id).toBeGreaterThan(0)
      expect(q.ai.length, q.id).toBeGreaterThan(0)
    }
  })
})

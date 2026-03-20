import { describe, it, expect } from 'vitest'
import { parseColors } from '../src/utils'

describe('parseColors', () => {
  it('should parse multiple colors correctly', () => {
    const input = `White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)`
    
    const result = parseColors(input)
    
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ label: 'White', value: 'hsl(0, 0%, 100%)' })
    expect(result[1]).toEqual({ label: 'Stone 100', value: 'hsl(30, 54%, 90%)' })
  })

  it('should skip empty lines', () => {
    const input = `White: hsl(0, 0%, 100%)

Stone 100: hsl(30, 54%, 90%)`
    
    const result = parseColors(input)
    
    expect(result).toHaveLength(2)
  })

  it('should skip lines without colon', () => {
    const input = `White: hsl(0, 0%, 100%)
Invalid line without colon
Stone 100: hsl(30, 54%, 90%)`
    
    const result = parseColors(input)
    
    expect(result).toHaveLength(2)
  })

  it('should handle extra whitespace', () => {
    const input = `  White  :  hsl(0, 0%, 100%)  `
    
    const result = parseColors(input)
    
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({ label: 'White', value: 'hsl(0, 0%, 100%)' })
  })

  it('should return empty array for empty input', () => {
    const result = parseColors('')
    expect(result).toHaveLength(0)
  })

  it('should handle the default colors from App', () => {
    const input = `White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)
Stone 150: hsl(30, 18%, 87%)
Stone 600: hsl(30, 10%, 34%)
Stone 900: hsl(24, 5%, 18%)
Brown 800: hsl(14, 45%, 36%)
Rose 800: hsl(332, 51%, 32%)
Rose 50: hsl(330, 100%, 98%)`
    
    const result = parseColors(input)
    
    expect(result).toHaveLength(8)
    expect(result[0]).toEqual({ label: 'White', value: 'hsl(0, 0%, 100%)' })
    expect(result[7]).toEqual({ label: 'Rose 50', value: 'hsl(330, 100%, 98%)' })
  })
})
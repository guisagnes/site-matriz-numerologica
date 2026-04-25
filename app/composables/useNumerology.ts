import type { NumerologyFormData, NumerologyResult } from '~/types/numerology'

/**
 * Tabela Pitagórica — mapeia cada letra a um número de 1 a 9.
 */
const PYTHAGOREAN_TABLE: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

/**
 * Remove acentos de uma string para normalizar a busca na tabela pitagórica.
 */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

/**
 * Reduz um número a um dígito (1-9), respeitando números mestres (11, 22, 33).
 */
function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0)
  }
  return num
}

/**
 * Calcula a soma das letras de um nome usando a tabela pitagórica.
 * @param filter 'all' = todas as letras, 'vowels' = só vogais, 'consonants' = só consoantes
 */
function sumLetters(name: string, filter: 'all' | 'vowels' | 'consonants' = 'all'): number {
  const normalized = normalize(name)
  let total = 0

  for (const char of normalized) {
    if (!PYTHAGOREAN_TABLE[char]) continue

    const isVowel = VOWELS.has(char)

    if (filter === 'all') {
      total += PYTHAGOREAN_TABLE[char]
    } else if (filter === 'vowels' && isVowel) {
      total += PYTHAGOREAN_TABLE[char]
    } else if (filter === 'consonants' && !isVowel) {
      total += PYTHAGOREAN_TABLE[char]
    }
  }

  return total
}

/**
 * Calcula o Caminho de Vida (Life Path) a partir de DD/MM/AAAA.
 */
function calculateLifePath(birthdate: string): number {
  const [day, month, year] = birthdate.split('/').map(Number)

  const dayReduced = reduceToSingleDigit(day)
  const monthReduced = reduceToSingleDigit(month)
  const yearReduced = reduceToSingleDigit(year)

  return reduceToSingleDigit(dayReduced + monthReduced + yearReduced)
}

/**
 * Calcula o Número de Nascimento (apenas o dia reduzido).
 */
function calculateBirthNumber(birthdate: string): number {
  const day = parseInt(birthdate.split('/')[0], 10)
  return reduceToSingleDigit(day)
}

export function useNumerology() {
  /**
   * Gera o mapa numerológico completo a partir dos dados do formulário.
   */
  const calculate = (formData: NumerologyFormData): NumerologyResult => {
    const { name, birthdate, gender } = formData

    const soulNumber = reduceToSingleDigit(sumLetters(name, 'vowels'))
    const personalityNumber = reduceToSingleDigit(sumLetters(name, 'consonants'))
    const expressionNumber = reduceToSingleDigit(sumLetters(name, 'all'))
    const destinyNumber = reduceToSingleDigit(sumLetters(name, 'all'))
    const lifePath = calculateLifePath(birthdate)
    const birthNumber = calculateBirthNumber(birthdate)

    return {
      soulNumber,
      destinyNumber,
      personalityNumber,
      expressionNumber,
      birthNumber,
      lifePath,
      fullName: name,
      birthdate,
      gender: gender as 'M' | 'F',
    }
  }

  /**
   * Valida se uma data no formato DD/MM/AAAA é real.
   */
  const isValidDate = (dateStr: string): boolean => {
    if (dateStr.length !== 10) return false

    const [dayStr, monthStr, yearStr] = dateStr.split('/')
    const day = parseInt(dayStr, 10)
    const month = parseInt(monthStr, 10)
    const year = parseInt(yearStr, 10)

    if (month < 1 || month > 12) return false
    if (year < 1900 || year > new Date().getFullYear()) return false

    const daysInMonth = new Date(year, month, 0).getDate()
    if (day < 1 || day > daysInMonth) return false

    return true
  }

  return {
    calculate,
    isValidDate,
  }
}

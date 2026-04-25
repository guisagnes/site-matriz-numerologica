export interface NumerologyFormData {
  name: string
  birthdate: string
  gender: 'M' | 'F' | ''
}

export interface NumerologyResult {
  soulNumber: number
  destinyNumber: number
  personalityNumber: number
  expressionNumber: number
  birthNumber: number
  lifePath: number
  fullName: string
  birthdate: string
  gender: 'M' | 'F'
}

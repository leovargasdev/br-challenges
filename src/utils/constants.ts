// **** CACHE PAGE **** //
export const CACHE_PAGE = 60 * 60 * 3 // 3 horas
export const SMALL_CACHE_PAGE = 60 * 10 // 10 minutos

// **** DATE **** //
export const SHORT_DATE = 'MMM dd, yyyy'
export const FULL_DATE = "dd' de 'MMMM' de 'yyyy"

export const LEVELS = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil'
}

export const LEVELS_OPTIONS = [
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Médio' },
  { value: 'hard', label: 'Difícil' }
]

export const DEFAULT_SOLUTION = {
  repository_url: '',
  linkedin_url: '',
  url: '',
  level: ''
}

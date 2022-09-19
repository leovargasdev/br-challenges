import { Solution } from 'types'
import { getFullDate } from './date'
import { SHORT_DATE } from 'utils/constants'

const getUpdatedAtSolution = (value: string): string => {
  const date = new Date(value).toISOString()
  return getFullDate(date, SHORT_DATE)
}

export const formattedSolution = (solution: Solution): Solution => ({
  ...solution,
  _id: solution._id.toString(),
  updatedAt: getUpdatedAtSolution(solution.updatedAt)
})

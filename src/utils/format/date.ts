import ptBR from 'date-fns/locale/pt-BR'
import { format, formatDistanceStrict } from 'date-fns'

const dateFnsOptions = {
  locale: ptBR
}

export const getFullDate = (value: string, formatString: string): string => {
  const date = new Date(value)

  return format(date, formatString, dateFnsOptions)
}

export const getDaysRemaining = (value: string): string => {
  const today = new Date()
  const dateTest = new Date(value)

  const result = formatDistanceStrict(today, dateTest, {
    unit: 'day',
    ...dateFnsOptions
  })

  if (result === '0 dias') {
    const hours = 24 - new Date().getHours()

    return hours + ' horas'
  }

  return result
}

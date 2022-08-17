import { useFormContext } from 'react-hook-form'
import { BsExclamationCircleFill } from 'react-icons/bs'

import styles from './styles.module.scss'

interface ErrorMessageProps {
  name: string
}

export const ErrorMessage = ({ name }: ErrorMessageProps) => {
  // eslint-disable-next-line prettier/prettier
  const { formState: { errors } } = useFormContext()

  const errorText = errors[name]?.message
  const isError = typeof errorText === 'string'

  if (!isError) {
    return <></>
  }

  return (
    <span role="alert" className={styles.error}>
      <BsExclamationCircleFill />
      {errorText}
    </span>
  )
}

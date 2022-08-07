import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { HiExclamationCircle } from 'react-icons/hi'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

export const Input = ({ name, label, ...rest }: InputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error: any = errors[name]?.message || ''
  const isError = !!error

  console.log(errors[name])

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className={isError ? styles.error : ''}
        aria-invalid={isError}
        {...rest}
        {...register(name)}
      />
      {isError && (
        <span role="alert">
          <HiExclamationCircle />
          {error}
        </span>
      )}
    </div>
  )
}

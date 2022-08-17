import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { ErrorMessage } from 'components/Form'

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

  const error = errors[name]?.message
  const isError = typeof error === 'string'

  return (
    <fieldset className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className={isError ? styles.error : ''}
        aria-invalid={isError}
        {...rest}
        {...register(name)}
      />

      <ErrorMessage name={name} />
    </fieldset>
  )
}

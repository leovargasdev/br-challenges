import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

export interface RadioOption {
  name: string
  value: string
  label: string
}

export const Radio = ({ name, value, label }: RadioOption) => {
  const { register } = useFormContext()

  return (
    <div className={styles.radio}>
      <input type="radio" id={value} value={value} {...register(name)} />
      <label htmlFor={value}>{label}</label>
    </div>
  )
}

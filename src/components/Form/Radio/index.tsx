import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

export interface RadioOption {
  name: string
  value: string
  label: string
  onClick: (value: string) => void
  isChecked: boolean
}

export const Radio = ({
  name,
  value,
  label,
  onClick,
  isChecked
}: RadioOption) => {
  const { register } = useFormContext()

  return (
    <div className={styles.radio} aria-checked={isChecked}>
      <input
        type="radio"
        id={value}
        value={value}
        {...register(name)}
        onClick={() => onClick(value)}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  )
}

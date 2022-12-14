import { Radio, RadioOption, ErrorMessage } from 'components/Form'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface RadioGroupProps {
  name: string
  label: string
  options: Omit<RadioOption, 'name' | 'isChecked' | 'onClick'>[]
}

export const RadioGroup = ({ name, label, options }: RadioGroupProps) => {
  const { getValues } = useFormContext()

  const [checked, serChecked] = useState<string>(getValues(name) || '')

  const handleCheckedRadio = (value: string): void => {
    serChecked(value)
  }

  return (
    <fieldset className={styles.container}>
      <label className={styles.label}>{label}</label>

      <div className={styles.radios}>
        {options.map(option => (
          <Radio
            {...option}
            key={option.value}
            name={name}
            isChecked={checked === option.value}
            onClick={handleCheckedRadio}
          />
        ))}
      </div>

      <ErrorMessage name={name} />
    </fieldset>
  )
}

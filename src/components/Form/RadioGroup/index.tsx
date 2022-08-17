import { useFormContext } from 'react-hook-form'
import { Root as RadioGroupRadix } from '@radix-ui/react-radio-group'

import { Radio, RadioOption } from 'components/Form'

import styles from './styles.module.scss'
import { useEffect } from 'react'

interface RadioGroupProps {
  name: string
  label: string
  defaultValue?: string
  options: RadioOption[]
}

export const RadioGroup = ({
  name,
  label,
  options,
  defaultValue = ''
}: RadioGroupProps) => {
  const { setValue } = useFormContext()

  const onChange = (value: string): void => {
    setValue(name, value)
  }

  useEffect(() => {
    setValue(name, defaultValue)
  }, [])

  return (
    <RadioGroupRadix
      className={styles.container}
      onValueChange={onChange}
      defaultValue={defaultValue}
    >
      <label className={styles.label}>{label}</label>

      <div className={styles.radios}>
        {options.map(option => (
          <Radio {...option} key={option.value} />
        ))}
      </div>
    </RadioGroupRadix>
  )
}

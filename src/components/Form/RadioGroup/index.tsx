import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import { Radio, RadioOption } from 'components/Form'

import styles from './styles.module.scss'

interface RadioGroupProps {
  label: string
  options: RadioOption[]
}

export const RadioGroup = ({ label, options }: RadioGroupProps) => (
  <RadioGroupRadix.Root className={styles.container}>
    <label className={styles.label}>{label}</label>

    <div className={styles.radios}>
      {options.map(option => (
        <Radio {...option} key={option.value} />
      ))}
    </div>
  </RadioGroupRadix.Root>
)

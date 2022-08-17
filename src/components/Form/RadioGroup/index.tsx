import { Radio, RadioOption } from 'components/Form'

import styles from './styles.module.scss'

interface RadioGroupProps {
  name: string
  label: string
  options: Omit<RadioOption, 'name'>[]
}

export const RadioGroup = ({ name, label, options }: RadioGroupProps) => (
  <fieldset className={styles.container}>
    <label className={styles.label}>{label}</label>

    <div className={styles.radios}>
      {options.map(option => (
        <Radio key={option.value} name={name} {...option} />
      ))}
    </div>
  </fieldset>
)

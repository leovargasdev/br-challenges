import { Item, Indicator } from '@radix-ui/react-radio-group'

import styles from './styles.module.scss'

export interface RadioOption {
  value: string
  label: string
}

export const Radio = ({ value, label }: RadioOption) => (
  <div className={styles.radio}>
    <Item className={styles.radio__button} value={value}>
      <Indicator className={styles.radio__indicator} />
    </Item>
    <label>{label}</label>
  </div>
)

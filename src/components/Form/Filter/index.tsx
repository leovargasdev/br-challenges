import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

import styles from './styles.module.scss'

interface OptionProps {
  value: string
  label: string
}

interface FilterProps {
  label: string
  selecteds: string[]
  options: OptionProps[]
  onFilter: (optionId: string) => void
}

export const Filter = ({
  label,
  options,
  onFilter,
  selecteds
}: FilterProps) => {
  const [active, setActive] = useState<boolean>(false)

  const handleFilterOption = (optionId: string) => {
    onFilter(optionId)
    setActive(false)
  }

  return (
    <div className={styles.container}>
      <label
        className={active ? styles.active : ''}
        onClick={() => setActive(state => !state)}
      >
        {label}
        <FaChevronDown />
      </label>
      <ul className={`${styles.options} ${active ? styles.active : ''}`}>
        {options.map(option => (
          <li
            key={option.value}
            onClick={() => handleFilterOption(option.value)}
            className={selecteds.includes(option.value) ? styles.selected : ''}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

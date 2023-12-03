import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { IconChevronRight } from 'components/SVG'

import styles from './styles.module.scss'

interface Question {
  id: string
  name: string
  description: string[]
}
interface AccordionProps {
  questions: Question[]
}

export const Accordion = ({ questions }: AccordionProps) => (
  <AccordionPrimitive.Root
    type="single"
    collapsible
    className={styles.accordion}
  >
    {questions.map(question => (
      <AccordionPrimitive.Item
        value={question.id}
        key={question.id}
        className={styles.accordion__item}
      >
        <AccordionPrimitive.Trigger className={styles.accordion__trigger}>
          {question.name}
          <IconChevronRight />
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className={styles.accordion__content}>
          {question.description.map((text, index) => (
            <p key={`${question.id}-description-${index}`}>{text}</p>
          ))}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
)

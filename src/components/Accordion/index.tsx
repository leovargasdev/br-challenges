import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { IconChevronRight } from 'components/SVG'

import styles from './styles.module.scss'

export const Accordion = () => (
  <AccordionPrimitive.Root type="single" collapsible>
    {[1, 2, 3, 4, 5, 6].map(item => (
      <AccordionPrimitive.Item value={`item-${item}`} key={item}>
        <AccordionPrimitive.Trigger className={styles.trigger}>
          Is it accessible?
          <IconChevronRight />
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className={styles.content}>
          <div className="AccordionPrimitiveContentText">
            Yes. It adheres to the WAI-ARIA design pattern.
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
)

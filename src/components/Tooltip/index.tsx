import {
  Provider,
  Root,
  Trigger,
  Portal,
  Content,
  TooltipArrow
} from '@radix-ui/react-tooltip'

import styles from './styles.module.scss'

interface TooltipProps {
  icon: React.ReactNode
  children: React.ReactNode
}

export const Tooltip = ({ icon, children }: TooltipProps) => (
  <Provider>
    <Root delayDuration={100}>
      <Trigger className={styles.trigger__button}>{icon}</Trigger>

      <Portal>
        <Content className={styles.content} sideOffset={5}>
          {children}
          <TooltipArrow fill="#44475a" />
        </Content>
      </Portal>
    </Root>
  </Provider>
)

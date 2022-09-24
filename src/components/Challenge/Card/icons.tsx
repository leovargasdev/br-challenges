import { MdHowToVote } from 'react-icons/md'
import { ImTrophy, ImBullhorn, ImTicket } from 'react-icons/im'

import type { TypeStatusChallenge } from 'types'

type IconStatus = Record<TypeStatusChallenge, React.ReactNode>

const icons: IconStatus = {
  finished: <ImTrophy />,
  closed: <ImBullhorn />,
  submitted: <ImTicket />,
  active: '',
  voting: <MdHowToVote />
}

export default icons

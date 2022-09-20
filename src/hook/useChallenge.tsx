import React, { createContext, useContext } from 'react'

import { Challenge } from 'types'

type ChallengeContextData = Challenge

const ChallengeContext = createContext({} as ChallengeContextData)

interface ProviderProps {
  challenge: Challenge
  children: React.ReactNode
}

export const ChallengeProvider = ({ challenge, children }: ProviderProps) => {
  return (
    <ChallengeContext.Provider value={challenge}>
      {children}
    </ChallengeContext.Provider>
  )
}

export const useChallenge = () => {
  const context = useContext(ChallengeContext)

  return context
}

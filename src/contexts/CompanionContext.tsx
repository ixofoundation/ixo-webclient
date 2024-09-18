import { useDisclosure } from '@mantine/hooks'
import React, { createContext, useContext, ReactNode, useState } from 'react'

type Tabs = 'user' | 'entity'

interface CompanionContextType {
  activeTab: Tabs
  setActiveTab: (tab: Tabs) => void
  isCompanionOpen: boolean
  openCompanion: () => void
  closeCompanion: () => void
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleCompanion: () => void
  toggleChat: () => void
}

const CompanionContext = createContext<CompanionContextType | undefined>(undefined)

export const CompanionProvider = ({ children }: { children: ReactNode }) => {
  const [isCompanionOpen, { open: openCompanion, close: closeCompanion, toggle: toggleCompanion }] =
    useDisclosure(false)
  const [isChatOpen, { open: openChat, close: closeChat, toggle: toggleChat }] = useDisclosure(false)
  const [activeTab, setActiveTab] = useState<Tabs>('user')

  return (
    <CompanionContext.Provider
      value={{
        isCompanionOpen,
        isChatOpen,
        openCompanion,
        closeCompanion,
        openChat,
        closeChat,
        toggleChat,
        toggleCompanion,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </CompanionContext.Provider>
  )
}

export const useCompanionContext = () => {
  const context = useContext(CompanionContext)
  if (!context) {
    throw new Error('useCompanionContext must be used within a CompanionProvider')
  }
  return context
}

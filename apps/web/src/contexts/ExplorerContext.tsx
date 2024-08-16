import React, { createContext, useContext, ReactNode, useState } from 'react'

interface ExplorerContextType {
  searchString: string
  setSearchString: React.Dispatch<React.SetStateAction<any>>
  entities: any[]
  setEntities: React.Dispatch<React.SetStateAction<any[]>>
}

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined)

export const ExplorerProvider = ({ children }: { children: ReactNode }) => {
  const [searchString, setSearchString] = useState<string>('')
  const [entities, setEntities] = useState<any[]>([])

  return (
    <ExplorerContext.Provider value={{ searchString, setSearchString, entities, setEntities }}>
      {children}
    </ExplorerContext.Provider>
  )
}

export const useExplorerContext = () => {
  const context = useContext(ExplorerContext)
  if (!context) {
    throw new Error('useExplorerContext must be used within a ExplorerProvider')
  }
  return context
}

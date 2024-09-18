import React, { createContext, useContext, ReactNode, useState } from 'react'

interface RequestsContextType {
  searchString: string
  setSearchString: React.Dispatch<React.SetStateAction<any>>
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined)


export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const [searchString, setSearchString] = useState<string>("");

  return (
    <RequestsContext.Provider
      value={{ searchString, setSearchString }}
    >
      {children}
    </RequestsContext.Provider>
  )
}

export const useRequestsContext = () => {
  const context = useContext(RequestsContext)
  if (!context) {
    throw new Error('useRequestsContext must be used within a RequestsProvider')
  }
  return context
}

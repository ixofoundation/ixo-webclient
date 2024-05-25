import React, { createContext, useContext, ReactNode, useState } from 'react'

interface KeyValueViewerContextType {
  keyValue: any
  setKeyValue: React.Dispatch<React.SetStateAction<any>>
}

const KeyValueViewerContext = createContext<KeyValueViewerContextType | undefined>(undefined)

export const KeyValueViewerProvider = ({ children }: { children: ReactNode }) => {
  const [keyValue, setKeyValue] = useState<any>(null);

  return (
    <KeyValueViewerContext.Provider
      value={{ keyValue, setKeyValue }}
    >
      {children}
    </KeyValueViewerContext.Provider>
  )
}

export const useKeyValueViewerContext = () => {
  const context = useContext(KeyValueViewerContext)
  if (!context) {
    throw new Error('useKeyValueViewerContext must be used within a KeyValueProvider')
  }
  return context
}

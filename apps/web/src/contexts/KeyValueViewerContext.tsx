import React, { createContext, useContext, ReactNode, useState } from 'react'

interface KeyValueViewerContextType {
  keyValue: any
  setKeyValue: React.Dispatch<React.SetStateAction<any>>
  goBackToPrevKeyValue: () => void
}

const KeyValueViewerContext = createContext<KeyValueViewerContextType | undefined>(undefined)

export const KeyValueViewerProvider = ({ children }: { children: ReactNode }) => {
  const [keyValue, setCurrentKeyValue] = useState<any>(null);
  const [prevKeyValue, setPrevKeyValue] = useState<any>(null);

  const setKeyValue = (value: any) => {
    setPrevKeyValue(keyValue);
    setCurrentKeyValue(value);
  }

  const goBackToPrevKeyValue = () => {
    setCurrentKeyValue(prevKeyValue);
  }

  return (
    <KeyValueViewerContext.Provider
      value={{ keyValue, setKeyValue, goBackToPrevKeyValue }}
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

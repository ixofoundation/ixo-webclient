// import { fileStorage } from '@ixo-webclient/utils'
import React, { createContext, useContext, ReactNode, useState } from 'react'

export type KeyValueProps = {
  type: 'resource' | 'service' | 'claim' | 'entity'
  data: any
}
interface KeyValueViewerContextType {
  keyValue: KeyValueProps | null
  setKeyValue: React.Dispatch<React.SetStateAction<any>>
  resetKeyValue: () => void
  selectedId: string | null
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}

const KeyValueViewerContext = createContext<KeyValueViewerContextType | undefined>(undefined)

export const KeyValueViewerProvider = ({ children }: { children: ReactNode }) => {
  const [keyValue, setCurrentKeyValue] = useState<KeyValueProps | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // const getServiceEndpointToUrl = (serviceEndpoint: string) => {
  //   if(serviceEndpoint.includes('ipfs')){
  //     return fileStorage.ipfs.generateEndpoint(serviceEndpoint.split(":")[1])
  //   }
  //   return serviceEndpoint
  // }

  const setKeyValue = (value: any) => {
    setCurrentKeyValue(value)
  }

  const resetKeyValue = () => {
    setCurrentKeyValue(null)
  }

  return (
    <KeyValueViewerContext.Provider value={{ keyValue, setKeyValue, resetKeyValue, selectedId, setSelectedId }}>
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

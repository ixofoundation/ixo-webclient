import { fileStorage } from '@ixo-webclient/utils'
import React, { createContext, useContext, ReactNode, useState } from 'react'

interface KeyValueViewerContextType {
  keyValue: any
  setKeyValue: React.Dispatch<React.SetStateAction<any>>
  goBackToPrevKeyValue: () => void
  getKeyValue: () => any
}

const KeyValueViewerContext = createContext<KeyValueViewerContextType | undefined>(undefined)

export const KeyValueViewerProvider = ({ children }: { children: ReactNode }) => {
  const [keyValue, setCurrentKeyValue] = useState<any[]>([]);

  const getServiceEndpointToUrl = (serviceEndpoint: string) => {
    if(serviceEndpoint.includes('ipfs')){
      return fileStorage.ipfs.generateEndpoint(serviceEndpoint.split(":")[1])
    }
    return serviceEndpoint
  }

  const setKeyValue = (value: any) => {
    const passedValue = {...value};
    if(value?.mediaType){
      if(value.mediaType === 'application/pdf' && value?.serviceEndpoint.length > 0){
        passedValue.file = getServiceEndpointToUrl(value?.serviceEndpoint)
      }
    }
    const newKeyValues = [...keyValue, passedValue]
    setCurrentKeyValue(newKeyValues); 
  }

  const goBackToPrevKeyValue = () => {
    const newKeyValues = keyValue.slice(0, keyValue.length - 1)
    setCurrentKeyValue(newKeyValues)
  }

  const getKeyValue = () => {
    return keyValue[keyValue.length - 1]
  }

  return (
    <KeyValueViewerContext.Provider
      value={{ keyValue, setKeyValue, goBackToPrevKeyValue, getKeyValue }}
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

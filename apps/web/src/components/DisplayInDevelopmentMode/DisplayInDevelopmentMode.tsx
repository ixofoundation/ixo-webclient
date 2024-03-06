import { isDevelopment } from 'constants/common'
import { ReactNode } from 'react'

const DisplayInDevelopmentMode = ({ children }: { children: ReactNode }) => {
  if (isDevelopment) {
    return children
  }

  return null
}

export default DisplayInDevelopmentMode

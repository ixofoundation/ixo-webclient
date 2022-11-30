import { useEffect } from 'react'

export const useImportScript = (resourceUrl: string): any => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = resourceUrl
    script.async = true
    document.body.appendChild(script)
    return (): any => {
      document.body.removeChild(script)
    }
  }, [resourceUrl])
}

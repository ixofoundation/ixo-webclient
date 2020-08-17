import { useEffect } from 'react';

export const ImportScript = (resourceUrl): any => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    return (): any => {
      document.body.removeChild(script);
    };
  }, [resourceUrl]);
};

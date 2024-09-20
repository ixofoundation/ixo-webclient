import React from 'react'

export const Component = React.lazy(() => import('./Requests'))
export const CreateComponent = React.lazy(() => import('./CreateRequests'))

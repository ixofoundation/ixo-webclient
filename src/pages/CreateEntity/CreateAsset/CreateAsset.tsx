import React from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { Routes } from './routes'

const CreateAsset: React.FC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}): JSX.Element => {
  const defaultPath = Object.values(Routes).find((route) => route.default)?.path

  return (
    <>
      {Object.values(Routes).map((route) => (
        <Route
          key={route.path}
          exact
          path={`${match.path}${route.path}`}
          component={route.component}
        />
      ))}
      <Route exact path={`${match.path}`}>
        {defaultPath && <Redirect to={`${match.path}${defaultPath}`} />}
      </Route>
    </>
  )
}

export default CreateAsset

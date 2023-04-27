import React, { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ErrorPage } from 'pages'
import { Layout } from 'components'
import { routes, paths, routeType } from '../constants'

const renderRoutes: (_routes: routeType[]) => JSX.Element[] = (_routes) => {
  return _routes.map((route: routeType) => {
    const { path, component: Component } = route
    return (
      <Route
        key={path}
        path={path}
        element={
          <Layout>
            <Component />
          </Layout>
        }
      />
    )
  })
}

const Navigation: FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={paths.MAIN} />} />
      {renderRoutes(routes)}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default Navigation
import React from 'react'
import { routes } from './routes'
import { pathType } from './pathType'

export type routeType = {
  path: pathType
  component: React.ElementType
}

export { routes }

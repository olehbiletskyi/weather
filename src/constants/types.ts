import React from 'react'
import { paths } from './paths'

type pathType = `${paths}`

type routeType = {
  path: pathType,
  component: React.ElementType
}



export { routeType, pathType }
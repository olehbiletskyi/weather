import { DetailPage, MainPage } from '../pages'
import { paths } from './paths'

const routes = [
  { path: paths.MAIN, component: MainPage },
  { path: paths.DETAIL, component: DetailPage },
]

export { routes }

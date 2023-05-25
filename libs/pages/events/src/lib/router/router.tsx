import { EVENTS_GENERAL_URL, Route } from '@qovery/shared/routes'
import PageGeneralFeature from '../feature/page-general-feature/page-general-feature'

export const ROUTER_EVENTS: Route[] = [
  {
    path: EVENTS_GENERAL_URL,
    component: <PageGeneralFeature />,
  },
]
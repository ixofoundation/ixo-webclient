import { SelectCreationProcess, SetupMetadata } from './pages'

interface TRoute {
  path: string
  component: React.FC
  default?: boolean
}

export const Routes: { [Key in string]: TRoute } = {
  SelectCreationProcess: {
    path: '/select-process',
    component: SelectCreationProcess,
    default: true,
  },
  SetupMetadata: {
    path: '/setup-metadata',
    component: SetupMetadata,
  },
}

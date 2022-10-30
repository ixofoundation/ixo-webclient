import { SelectCreationProcess, SetupMetadata, SetupProperties } from './pages'

interface TRoute {
  path: string
  component: React.FC<any>
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
  SetupProperties: {
    path: '/setup-properties',
    component: SetupProperties,
  },
}

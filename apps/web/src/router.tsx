import { AppConnected } from 'components/App/App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  SelectCreationProcess,
  SetupMetadata,
  SetupGroups,
  SetupProperties,
  Review,
  SelectType,
  SetupInstrument,
  SetupDataCollection
} from 'pages/CreateEntity/EntityPages'

import * as CreateEntity from 'pages/CreateEntity/CreateEntity.route'
import * as Explore from 'pages/EntitiesExplorer/EntitiesExplorer.route'

import { Routes } from 'routes'

const router = createBrowserRouter([
  {
    path: '*',
    element: <AppConnected/>,
    children: [
      {
        path: 'explore',
        element: <Explore.Component />,
      },
      {
        path: '*',
        Component: Routes,
      },
      {
        path: 'create/entity/:entityType',
        Component: CreateEntity.Component,
        loader: CreateEntity.loader,
        action: CreateEntity.action,
        children: [
          {
            path: 'process',
            element: <SelectCreationProcess />,
          },
          {
            path: 'profile',
            element: <SetupMetadata />,
          },
          {
            path: 'groups',
            element: <SetupGroups />,
          },
          {
            path: 'settings',
            element: <SetupProperties />,
          },
          {
            path: 'review',
            element: <Review />,
          },
          {
            path: 'type',
            element: <SelectType />,
          },
          {
            path: 'instrument',
            element: <SetupInstrument />
          },
          {
            path: 'collection',
            element: <SetupDataCollection/>
          },
        ],
      },
    ],
  },
])


export default function Router() {
  return <RouterProvider router={router} />
}

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
  SetupDataCollection,
} from 'pages/CreateEntity/EntityPages'

import * as CreateEntity from 'pages/CreateEntity/CreateEntity.route'
import * as CurrentEntity from 'pages/CurrentEntity/CurrentEntity.route'
import * as Explore from 'pages/EntitiesExplorer/EntitiesExplorer.route'
import * as EntityExchange from 'pages/EntityExchange/EntityExchange.route'
import * as MyAccount from 'pages/MyAccount/MyAccount.route'

import { Routes } from 'routes'

const router = createBrowserRouter([
  {
    path: '*',
    element: <AppConnected />,
    children: [
      {
        path: '*',
        Component: Routes,
      },
      {
        path: 'explore',
        element: <Explore.Component />,
      },
      {
        path: 'exchange',
        Component: EntityExchange.Component,
      },
      {
        path: 'myaccount/*',
        Component: MyAccount.Component,
      },
      {
        path: 'entity',
        children: [
          {
            path: ':entityId/*',
            Component: CurrentEntity.Component,
          },
          {
            path: 'create/:entityType',
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
                element: <SetupInstrument />,
              },
              {
                path: 'collection',
                element: <SetupDataCollection />,
              },
            ],
          },
        ],
      },
      // {
      //   path: 'create/entity/:entityType',

      // },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}

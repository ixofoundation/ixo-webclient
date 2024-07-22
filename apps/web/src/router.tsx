import { AppConnected } from 'components/App/App'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  Routes as ReactRouterRoutes,
  Outlet,
} from 'react-router-dom'
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

// Pages
import * as CreateEntity from 'pages/CreateEntity/CreateEntity.route'
import * as CurrentEntity from 'pages/CurrentEntity/CurrentEntity.route'
import * as EntityOverview from 'pages/CurrentEntity/Overview/Overview.route'
import * as EntityDashboard from 'pages/CurrentEntity/Dashboard/Dashboard.route'
import * as Explore from 'pages/EntitiesExplorer/EntitiesExplorer.route'
import * as EntityExchange from 'pages/EntityExchange/EntityExchange.route'
import * as MyAccount from 'pages/MyAccount/MyAccount.route'
import * as ProposalOverview from 'pages/CurrentEntity/Proposal/ProposalOverview.route'

// Layouts
import * as EntityOverviewLayout from 'components/Layout/EntityOverviewLayout/EntityOverviewLayout.route'
import * as EntityDashboardLayout from 'components/Layout/EntityDashboardLayout/EntityDashboardLayout.route'

import { Routes } from 'routes'
import { Flex } from '@mantine/core'
import SetupProposalInfo from 'pages/CurrentEntity/Dashboard/DAODashboard/Governance/CreateProposal/SetupProposalInfo'
import { SetupTargetGroup } from 'pages/CreateEntity/EntityPages/SetupTargetGroup'
import SetupProposalPageContent from 'pages/CreateEntity/EntityPages/SetupProposalPageContent/SetupPageContent'
import { SetupActions } from 'pages/CurrentEntity/Dashboard/DAODashboard/Governance/CreateProposal/SetupProposalActions'
import { ReviewProposal } from 'pages/CurrentEntity/Dashboard/DAODashboard/Governance/CreateProposal/ReviewProposal'
import { Suspense } from 'react'
import { Spinner } from 'components/Spinner/Spinner'

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <Suspense fallback={<Spinner info='Connecting to the Internet of Impacts' />}>
        <AppConnected />
      </Suspense>
    ),
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
        path: 'exchange/*',
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
            element: <Outlet/>,
            children: [
              {
                path: 'overview/*',
                Component: EntityOverviewLayout.Component,
                children: [
                  {
                    path: "*",
                    Component: EntityOverview.Component,
                  },
                  {
                    path: "proposal/:deedId",
                    Component: ProposalOverview.Component,
                  },
                  {
                    path: ":tab",
                    Component: EntityOverview.Component,
                  }
                ]
              },
              {
                path: 'dashboard/*',
                Component: EntityDashboardLayout.Component,
                children: [
                  {
                    path: '*',
                    Component: EntityDashboard.Component,
                  },
                ],
              },
              {
                path: '*',
                Component: CurrentEntity.Component,
              },
            ],
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
              {
                path: ':entityId/:coreAddress/*',
                element: (
                  <Flex>
                    <ReactRouterRoutes>
                      <Route index element={<Navigate to='info' />} />
                    </ReactRouterRoutes>
                    <Outlet />
                  </Flex>
                ),
                children: [
                  {
                    path: 'info',
                    element: <SetupProposalInfo />,
                  },
                  {
                    path: 'select',
                    element: <SetupTargetGroup />,
                  },
                  {
                    path: 'page',
                    element: <SetupProposalPageContent />,
                  },
                  {
                    path: 'property',
                    element: <SetupProperties />,
                  },
                  {
                    path: 'action',
                    element: <SetupActions />,
                  },
                  {
                    path: 'review',
                    element: <ReviewProposal />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // {
      //   path: 'create/entity/:entityType',

      // },CurrentEntity.Component
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}

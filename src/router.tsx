import { AppConnected } from 'components/CoreEntry/App'
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
  SelectAssetType,
  AddAssetToCollection,
} from 'screens/CreateEntity/EntityPages'

// Pages
import * as CreateEntity from 'screens/CreateEntity/CreateEntity.route'
import * as CurrentEntity from 'screens/CurrentEntity/CurrentEntity.route'
import * as EntityOverview from 'screens/CurrentEntity/Overview/Overview.route'
import * as EntityDashboard from 'screens/CurrentEntity/Dashboard/Dashboard.route'
import * as Explore from 'screens/EntitiesExplorer/EntitiesExplorer.route'
import * as EntityExchange from 'screens/EntityExchange/EntityExchange.route'
import * as MyAccount from 'screens/MyAccount/MyAccount.route'
import * as ProposalOverview from 'screens/CurrentEntity/Proposal/ProposalOverview.route'
import * as Requests from 'screens/Requests/Requests.route'
import * as OverviewTabs from 'screens/CurrentEntity/Overview/OverviewTabs/OverviewTabs.route'
import * as SelectedTabItem from 'screens/CurrentEntity/Overview/OverviewTabs/SelectedTabItem/SelectedTabItem.route'
import * as SelectProtocol from 'screens/CreateFlow/SelectProtocol/SelectProtocol.route'
import * as Overview from 'screens/CreateFlow/Overview/Overview.route'
import * as OverviewTab from 'screens/CreateFlow/OverviewTab/OverviewTab.route'
import * as ExploreNew from 'screens/ExploreNew/ExploreNew.route'
import * as Search from 'screens/ExploreNew/Search.route'

// Layouts
import * as EntityOverviewLayout from 'components/Layout/EntityOverviewLayout/EntityOverviewLayout.route'
import * as EntityDashboardLayout from 'components/Layout/EntityDashboardLayout/EntityDashboardLayout.route'
import * as ExploreLayout from 'components/Layout/ExploreLayout/ExploreLayout.route'
import * as SelectProtocolLayout from 'components/Layout/SelectProtocolLayout/SelectProtocolLayout.route'
import * as CreateFlowLayout from 'components/Layout/CreateFlowLayout/CreateFlowLayout.route'

import { Routes } from 'routes'
import { Flex } from '@mantine/core'
import SetupProposalInfo from 'screens/CurrentEntity/Dashboard/DAODashboard/Governance/CreateProposal/SetupProposalInfo'
import { SetupTargetGroup } from 'screens/CreateEntity/EntityPages/SetupTargetGroup'
import SetupProposalPageContent from 'screens/CreateEntity/EntityPages/SetupProposalPageContent/SetupPageContent'
import { SetupActions } from 'screens/CurrentEntity/Dashboard/DAODashboard/Governance/CreateProposal/SetupProposalActions'
import { ReviewProposal } from 'screens/CurrentEntity/Dashboard/DAODashboard/Governance/CreateProposal/ReviewProposal'
import { Suspense } from 'react'
import { Spinner } from 'components/Spinner/Spinner'

const router = createBrowserRouter([
  {
    path: '*',
    element: <AppConnected />,
    children: [
      {
        path: 'browse',
        Component: ExploreLayout.Component,
        children: [
          {
            index: true,
            Component: ExploreNew.Component,
          },
          {
            path: 'search',
            Component: Search.Component,
          },
        ],
      },
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
            element: <Outlet />,
            children: [
              {
                path: 'overview/*',
                Component: EntityOverviewLayout.Component,
                children: [
                  {
                    path: '*',
                    Component: EntityOverview.Component,
                    children: [
                      {
                        path: ':tab',
                        Component: OverviewTabs.Component,
                      },
                      {
                        path: ':tab/:id',
                        Component: SelectedTabItem.Component,
                      },
                    ],
                  },
                  {
                    path: 'proposal/:deedId',
                    Component: ProposalOverview.Component,
                  },
                ],
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
            path: 'select-or-create',
            Component: SelectProtocolLayout.Component,
            children: [
              {
                index: true,
                Component: SelectProtocol.Component,
              },
            ],
          },
          {
            path: 'create-new',
            Component: CreateFlowLayout.Component,
            children: [
              {
                path: ':protocolId',
                Component: Overview.Component,
                children: [
                  {
                    path: ':tab',
                    Component: OverviewTab.Component,
                  },
                ],
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
                path: 'asset-type',
                element: <SelectAssetType />,
              },
              {
                path: 'add-asset-to-collection',
                element: <AddAssetToCollection />,
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
      {
        path: 'requests',
        Component: ExploreLayout.Component,
        children: [
          {
            index: true,
            Component: Requests.Component,
          },
          {
            path: 'create',
            Component: Requests.CreateComponent,
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

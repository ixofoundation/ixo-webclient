/* eslint-disable max-len */

import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import EntitiesExplorer from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container'
import EntitiesImpact from 'modules/Entities/EntitiesExplorer/EntitiesImpact/EntitiesImpact.container'
import CreateEntity from 'modules/Entities/CreateEntity/CreateEntity.container'
import EntitiesSelect from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container.select'
import EntityImpactOverview from 'modules/Entities/SelectedEntity/EntityImpact/Overview/Overview.container'
import EntityAgents from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.container'
import ProjectAgents from 'components/project/agents/ProjectAgents'
import EntityClaims from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/EntityClaims.container'
import { ProjectForm } from 'pages/json'
import { RegisterConnected } from 'pages/register/RegisterContainer'
import { NotFound } from 'public/NotFound'
import { Spinner } from 'common/components/Spinner'
import { UnderConstruction } from 'public/UnderConstruction'
import SubmitEntityClaim from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.container'
import EntityOverview from 'modules/Entities/SelectedEntity/EntityOverview/EntityOverview.container'
import { Overview as BondOverview } from 'pages/bond/overview'
import { Accounts as BondAccounts } from 'pages/bond/accounts'
import BondExchange from 'pages/bond/exchange'
import BondOrders from 'pages/bond/orders'
import { Accounts as InvestmentAccounts} from 'pages/investment/accounts'
import InvestmentPayments from 'pages/investment/payments'


const routes = [
  ['/',                              EntitiesExplorer,  {exact: true}],
  ['/json',                          ProjectForm,       {exact: true}],
  ['/spinner',                       Spinner,           {exact: true}],
  ['/register',                      RegisterConnected, {exact: true}],
  ['/entities/select',               EntitiesSelect],
  ['/:entityType/new',               CreateEntity],
  ['/impact',                        EntitiesImpact,    {exact: true}],
  ['/projects/:projectDID/overview', EntityOverview],

  ['/projects/:projectDID/detail',                   EntityImpactOverview, {exact: true}],
  ['/projects/:projectDID/detail/service-providers', EntityAgents,         {exact: true}],
  ['/projects/:projectDID/detail/evaluators',        EntityAgents,         {exact: true}],
  ['/projects/:projectDID/detail/investors',         EntityAgents,         {exact: true}],
  ['/projects/:projectDID/detail/agents',            ProjectAgents,        {exact: true}],
  ['/projects/:projectDID/detail/claims',            EntityClaims,         {exact: true}],

  ['/projects/:projectDID/overview/claims/new_claim/:claimTemplateDid', SubmitEntityClaim],

  ['/projects/:projectDID/bonds/:bondDID',           BondOverview],
  ['/projects/:projectDID/bonds/:bondDID/overview',  BondOverview],
  ['/projects/:projectDID/bonds/:bondDID/assistant', BondOverview],
  ['/projects/:projectDID/bonds/:bondDID/accounts',  BondAccounts],
  ['/projects/:projectDID/bonds/:bondDID/exchange',  BondExchange],
  ['/projects/:projectDID/bonds/:bondDID/orders',    BondOrders],

  ['/investment/:projectDID/funds/accounts', InvestmentAccounts],
  ['/investment/:projectDID/funds/payments', InvestmentPayments],

  ['/todo', UnderConstruction, {exact: true}],
  ['*',     NotFound],
]


export default () =>
  <Switch children={routes.map(([path, component, opts]) =>
      <Route {...{path, component, ...opts}} />
  )} />

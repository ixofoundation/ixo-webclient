import { useEffect } from 'react'
import { ActionFunctionArgs, LoaderFunctionArgs, Outlet, useLoaderData, useParams } from 'react-router-dom'

import CreateEntityLayout from './CreateEntityLayout/CreateEntityLayout'
import { Step, resetEntityMultiStepCreation, selectCurrentStep, setSteps } from 'redux/entityMultiStepCreation/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateEntityState } from 'hooks/createEntity'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { getEntityTypeFromURLParam } from 'utils/entities'

type EntityLoaderData = {
  steps: Step[]
}

const stepMap = new Map<string, string[]>([
  ['dao', ['process', 'profile', 'groups', 'settings', 'review']],
  ['protocol', ["type"]],
  ['protocol-claim', ['process', 'profile', 'collection', 'settings', 'review']],
  ['protocol-deed', ['process', 'profile', 'collection', 'settings', 'review']],
  ['deed-request', ['process', 'profile', 'settings', 'review']],
  ['oracle', ['process', 'profile', 'settings', 'review']],
  ['project', ['process', 'profile', 'settings', 'review']],
  ['investment', ['process', 'profile', 'instrument', 'settings', 'review']],
  ['asset', ['process', 'profile', 'settings', 'review', 'create-token']],
])

const buildEntitySteps = (entity: string, order: string[]): { title: string; steps: Step[] } => {
  // Define the original steps
  const steps: Step[] = [
    {
      title: 'Start with an Entity',
      path: 'process',
      number: 0,
    },
    {
      title: 'Select Type of Protocol',
      path: 'type',
      number: 0,
    },
    {
      title: 'Verifiable Claim creation',
      path: 'collection',
      number: 0,
    },
    {
      title: 'Profile',
      path: 'profile',
      number: 0,
    },
    {
      title: 'Add Groups',
      path: 'groups',
      number: 0,
    },
    {
      title: `Configure the ${entity} Settings`,
      path: 'settings',
      number: 0,
    },
    {
      title: `Create Investment Instrument/s`,
      path: 'instrument',
      number: 0,
    },
    {
      title: 'Review and Sign to Commit',
      path: 'review',
      number: 0,
    },
    {
      title: 'Proposal Info',
      path: 'proposal_info',
      number: 0,
    },
    {
      title: 'Proposal Page',
      path: 'proposal_page',
      number: 0,
    },
  ]

  // Sort the steps based on the order array
  const sortedSteps: Step[] = order
    .map((stepName, index) => {
      const foundStep = steps.find((step) => step.path === stepName)
      return foundStep ? { ...foundStep, number: index + 1, path: `/entity/create/${entity}/${foundStep.path}` } : null
    })
    .filter((step) => step !== null) as Step[] // Cast to Step[] after filtering out null entries

  return {
    title: `Create ${entity}`,
    steps: sortedSteps,
  }
}

export const loader = async ({ params }: LoaderFunctionArgs): Promise<EntityLoaderData> => {
  const entityType = params.entityType
  const entityMeta: { title: string; steps: Step[] } = {
    title: '',
    steps: [],
  }

  if (entityType && stepMap.has(entityType)) {
    const stepBuilder = buildEntitySteps(entityType, stepMap.get(entityType) ?? [])

    entityMeta.title = stepBuilder.title
    entityMeta.steps = stepBuilder.steps
  }

  return {
    ...entityMeta,
  }
}

export const action = async (args: ActionFunctionArgs) => {
  return null
}

const CreateEntity = (): JSX.Element => {
  const { navigateToNextStep } = useCreateEntityStepState()
  const { entityType = "" } = useParams()
  const currentStep = useSelector(selectCurrentStep)
  const dispatch = useDispatch()
  const data = useLoaderData() as EntityLoaderData
  const { updateEntityType, entityType: stateEntityType } = useCreateEntityState()
  const loaderData = useLoaderData() as any

  const shouldUpdateEntityType = getEntityTypeFromURLParam(entityType) !== stateEntityType

  useEffect(() => {
    dispatch(setSteps(data.steps))

    if (entityType && shouldUpdateEntityType) {
      updateEntityType(getEntityTypeFromURLParam(entityType))
      navigateToNextStep(data.steps[0])
    }

    return () => {
      dispatch(resetEntityMultiStepCreation())
    }
  }, [entityType, dispatch, data.steps, navigateToNextStep, stateEntityType, updateEntityType, shouldUpdateEntityType])

  return (
    <CreateEntityLayout title={loaderData.title} subtitle={currentStep.title} breadCrumbs={[]}>
      <Outlet />
    </CreateEntityLayout>
  )
}

export default CreateEntity

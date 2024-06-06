import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  TEntityPageModel,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
} from 'types/entities'
import {
  addAssetInstancesAction,
  gotoStepAction,
  removeAssetInstancesAction,
  updateAccordedRightAction,
  updateAssetInstanceAction,
  updateBreadCrumbsAction,
  updateClaimAction,
  updateAdministratorAction,
  updateCreatorAction,
  updateDAOControllerAction,
  updateDAOGroupsAction,
  updateDDOTagsAction,
  updateProposalAction,
  updateEntityTypeAction,
  updateLinkedEntityAction,
  updateLinkedResourceAction,
  updateLocalisationAction,
  updateProfileAction,
  updatePageAction,
  updateServiceAction,
  updateSubtitleAction,
  updateTitleAction,
  clearEntityAction,
  updateClaimQuestionsAction,
  updateStartEndDateAction,
  updateQuestionJSONAction,
} from 'redux/createEntityAsAction/createEntityAsAction.actions'
import {
  selectCreateEntityAccordedRight,
  selectCreateEntityAdministrator,
  selectCreateEntityAssetInstances,
  selectCreateEntityBreadCrumbs,
  selectCreateEntityClaim,
  selectCreateEntityCreator,
  selectCreateEntityDAOController,
  selectCreateEntityDAOGroups,
  selectCreateEntityDDOTags,
  selectCreateEntityProposal,
  selectCreateEntityLinkedEntity,
  selectCreateEntityLinkedResource,
  selectCreateEntityLocalisation,
  selectCreateEntityProfile,
  selectCreateEntityPage,
  selectCreateEntityService,
  selectCreateEntityStepNo,
  selectCreateEntitySubtitle,
  selectCreateEntityTitle,
  selectCreateEntityType,
  selectCreateEntityClaimQuestions,
  selectCreateEntityStartDate,
  selectCreateEntityEndDate,
  selectCreateEntityHeadlineClaim,
  selectCreateEntityQuestionJSON,
} from 'redux/createEntityAsAction/createEntityAsAction.selectors'
import { TCreateEntityModel } from 'redux/createEntityAsAction/createEntityAsAction.types'
import {
  AccordedRight,
  LinkedEntity,
  LinkedResource,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { ELocalisation, TQuestion } from 'types/protocol'

export interface TCreateEntityStateHookRes {
    entityType: string
    stepNo: number
    breadCrumbs: { text: string; link?: string }[]
    title: string
    subtitle: string
    profile: TEntityMetadataModel
    creator: TEntityCreatorModel
    administrator: TEntityAdministratorModel
    ddoTags: TEntityDDOTagModel[]
    page: TEntityPageModel
    service: TEntityServiceModel[]
    claim: { [id: string]: TEntityClaimModel }
    headlineMetricClaim: TEntityClaimModel | undefined
    linkedResource: { [id: string]: LinkedResource }
    accordedRight: { [key: string]: AccordedRight }
    linkedEntity: { [key: string]: LinkedEntity }
    assetInstances: TCreateEntityModel[]
    localisation: ELocalisation
    startDate: string
    endDate: string
    daoGroups: { [id: string]: TDAOGroupModel }
    daoController: string
    proposal: TProposalModel
    claimQuestions: { [id: string]: TQuestion }
    questionJSON: any
    validateRequiredProperties: boolean
    updateEntityType: (entityType: string) => void
    clearEntity: () => void
    gotoStepByNo: (no: number) => void
    updateBreadCrumbs: (breadCrumbs: { text: string; link?: string }[]) => void
    updateTitle: (title: string) => void
    updateSubtitle: (subtitle: string) => void
    updateProfile: (profile: TEntityMetadataModel) => void
    updateCreator: (creator: TEntityCreatorModel) => void
    updateAdministrator: (administrator: TEntityAdministratorModel) => void
    updateDDOTags: (ddoTags: TEntityDDOTagModel[]) => void
    updatePage: (page: TEntityPageModel) => void
    updateService: (service: TEntityServiceModel[]) => void
    updateClaim: (claim: { [id: string]: TEntityClaimModel }) => void
    updateLinkedResource: (linkedResource: { [id: string]: LinkedResource }) => void
    updateAccordedRight: (accordedRight: { [id: string]: AccordedRight }) => void
    updateLinkedEntity: (linkedEntity: { [id: string]: LinkedEntity }) => void
    updateStartEndDate: ({ startDate, endDate }: { startDate: string; endDate: string }) => void
    addAssetInstances: (instances: TCreateEntityModel[]) => void
    updateAssetInstance: (id: number, instance: TCreateEntityModel) => void
    removeAssetInstances: () => void
    updateLocalisation: (localisation: ELocalisation) => void
    updateDAOGroups: (daoGroups: { [id: string]: TDAOGroupModel }) => void
    updateDAOController: (controller: string) => void
    updateProposal: (proposal: TProposalModel) => void
    updateClaimQuestions: (claimQuestions: { [id: string]: TQuestion }) => void
    updateQuestionJSON: (claimQuestionJSON: any) => void
  }

export function useCreateEntityStateAsActionState(): TCreateEntityStateHookRes {
    const dispatch = useAppDispatch()
  
    const entityType: string = useAppSelector(selectCreateEntityType)
    const stepNo: number = useAppSelector(selectCreateEntityStepNo)
    const breadCrumbs: { text: string; link?: string }[] = useAppSelector(selectCreateEntityBreadCrumbs)
    const title: string = useAppSelector(selectCreateEntityTitle)
    const subtitle: string = useAppSelector(selectCreateEntitySubtitle)
  
    const profile: TEntityMetadataModel = useAppSelector(selectCreateEntityProfile)
    const creator: TEntityCreatorModel = useAppSelector(selectCreateEntityCreator)
    const administrator: TEntityAdministratorModel = useAppSelector(selectCreateEntityAdministrator)
    const ddoTags: TEntityDDOTagModel[] = useAppSelector(selectCreateEntityDDOTags)
    const page: TEntityPageModel = useAppSelector(selectCreateEntityPage)
    const service: TEntityServiceModel[] = useAppSelector(selectCreateEntityService)
    const claim: { [id: string]: TEntityClaimModel } = useAppSelector(selectCreateEntityClaim)
    const headlineMetricClaim: TEntityClaimModel | undefined = useAppSelector(selectCreateEntityHeadlineClaim)
    const linkedResource: { [id: string]: LinkedResource } = useAppSelector(selectCreateEntityLinkedResource)
    const accordedRight: { [key: string]: AccordedRight } = useAppSelector(selectCreateEntityAccordedRight)
    const linkedEntity: { [key: string]: LinkedEntity } = useAppSelector(selectCreateEntityLinkedEntity)
    const assetInstances: TCreateEntityModel[] = useAppSelector(selectCreateEntityAssetInstances)
    const localisation: ELocalisation = useAppSelector(selectCreateEntityLocalisation)
    const startDate: string = useAppSelector(selectCreateEntityStartDate)
    const endDate: string = useAppSelector(selectCreateEntityEndDate)
    // for DAO
    const daoGroups: { [id: string]: TDAOGroupModel } = useAppSelector(selectCreateEntityDAOGroups)
    const daoController: string = useAppSelector(selectCreateEntityDAOController)
    // for Proposal
    const proposal: TProposalModel = useAppSelector(selectCreateEntityProposal)
    // for Claim
    const claimQuestions: { [id: string]: TQuestion } = useAppSelector(selectCreateEntityClaimQuestions)
    const questionJSON: any = useAppSelector(selectCreateEntityQuestionJSON)
    const validateRequiredProperties = useMemo(() => {
      return !!creator && !!administrator && Object.keys(page ?? {}).length > 0 && service?.length > 0
    }, [creator, administrator, page, service])
  
    const updateEntityType = (entityType: string): void => {
      dispatch(updateEntityTypeAction(entityType))
    }
    const clearEntity = (): void => {
      dispatch(clearEntityAction())
    }
    const gotoStepByNo = useCallback(
      (no: number): void => {
        dispatch(gotoStepAction(no))
      },
      // eslint-disable-next-line
      [],
    )
    const updateBreadCrumbs = (breadCrumbs: { text: string; link?: string }[]): void => {
      dispatch(updateBreadCrumbsAction(breadCrumbs))
    }
    const updateTitle = (title: string): void => {
      dispatch(updateTitleAction(title))
    }
    const updateSubtitle = (subtitle: string): void => {
      dispatch(updateSubtitleAction(subtitle))
    }
  
    const updateProfile = (profile: TEntityMetadataModel): void => {
      dispatch(updateProfileAction(profile))
    }
    const updateCreator = (creator: TEntityCreatorModel): void => {
      dispatch(updateCreatorAction(creator))
    }
    const updateAdministrator = (administrator: TEntityAdministratorModel): void => {
      dispatch(updateAdministratorAction(administrator))
    }
    const updateDDOTags = (ddoTags: TEntityDDOTagModel[]): void => {
      dispatch(updateDDOTagsAction(ddoTags))
    }
    const updatePage = (page: TEntityPageModel): void => {
      dispatch(updatePageAction(page))
    }
    const updateService = (service: TEntityServiceModel[]): void => {
      dispatch(updateServiceAction(service))
    }
    const updateClaim = (claim: { [id: string]: TEntityClaimModel }): void => {
      dispatch(updateClaimAction(claim))
    }
    const updateLinkedResource = (linkedResource: { [id: string]: LinkedResource }): void => {
      dispatch(updateLinkedResourceAction(linkedResource))
    }
    const updateAccordedRight = (accordedRight: { [id: string]: AccordedRight }): void => {
      dispatch(updateAccordedRightAction(accordedRight))
    }
    const updateLinkedEntity = (linkedEntity: { [id: string]: LinkedEntity }): void => {
      dispatch(updateLinkedEntityAction(linkedEntity))
    }
    const updateStartEndDate = ({ startDate, endDate }: { startDate: string; endDate: string }): void => {
      dispatch(updateStartEndDateAction(startDate, endDate))
    }
    const addAssetInstances = (instances: TCreateEntityModel[]): void => {
      dispatch(addAssetInstancesAction(instances))
    }
    const updateAssetInstance = (id: number, instance: TCreateEntityModel): void => {
      dispatch(updateAssetInstanceAction(id, instance))
    }
    const removeAssetInstances = (): void => {
      dispatch(removeAssetInstancesAction())
    }
    const updateLocalisation = (localisation: ELocalisation): void => {
      dispatch(updateLocalisationAction(localisation))
    }
    const updateDAOGroups = (daoGroups: { [id: string]: TDAOGroupModel }): void => {
      dispatch(updateDAOGroupsAction(daoGroups))
    }
    const updateDAOController = (controller: string): void => {
      dispatch(updateDAOControllerAction(controller))
    }
    const updateProposal = useCallback(
      (proposal: TProposalModel): void => {
        dispatch(updateProposalAction(proposal))
      },
      [dispatch],
    )
    const updateClaimQuestions = (claimQuestions: { [id: string]: TQuestion }): void => {
      dispatch(updateClaimQuestionsAction(claimQuestions))
    }
    const updateQuestionJSON = (claimQuestionJSON: any): void => {
      dispatch(updateQuestionJSONAction(claimQuestionJSON))
    }
  
    return {
      entityType,
      stepNo,
      breadCrumbs,
      title,
      subtitle,
      profile,
      creator,
      administrator,
      ddoTags,
      page,
      service,
      claim,
      headlineMetricClaim,
      linkedResource,
      accordedRight,
      linkedEntity,
      assetInstances,
      localisation,
      startDate,
      endDate,
      daoGroups,
      daoController,
      proposal,
      claimQuestions,
      questionJSON,
      validateRequiredProperties,
      updateEntityType,
      clearEntity,
      gotoStepByNo,
      updateBreadCrumbs,
      updateTitle,
      updateSubtitle,
      updateProfile,
      updateCreator,
      updateAdministrator,
      updateDDOTags,
      updatePage,
      updateService,
      updateClaim,
      updateLinkedResource,
      updateAccordedRight,
      updateLinkedEntity,
      updateStartEndDate,
      addAssetInstances,
      updateAssetInstance,
      removeAssetInstances,
      updateLocalisation,
      updateDAOGroups,
      updateDAOController,
      updateProposal,
      updateClaimQuestions,
      updateQuestionJSON,
    }
  }
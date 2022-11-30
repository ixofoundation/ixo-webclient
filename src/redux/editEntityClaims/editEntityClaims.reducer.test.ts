// @ts-nocheck
import { v4 } from 'uuid'
import * as SUT from './editEntityClaims.reducer'
import {
  AddEntityClaimAction,
  EditEntityClaimsActions,
  RemoveEntityClaimAction,
  UpdateEntityClaimTemplateAction,
  AddEntityClaimAgentRoleAction,
  RemoveEntityClaimAgentRoleAction,
  UpdateEntityClaimAgentRoleAction,
  AddEntityClaimEvaluationAction,
  RemoveEntityClaimEvaluationAction,
  UpdateEntityClaimEvaluationAction,
  AddEntityClaimApprovalCriterionAction,
  RemoveEntityClaimApprovalCriterionAction,
  UpdateEntityClaimApprovalCriterionAction,
  AddEntityClaimEnrichmentAction,
  RemoveEntityClaimEnrichmentAction,
  UpdateEntityClaimEnrichmentAction,
  ValidatedAction,
  ValidationErrorAction,
} from './editEntityClaims.types'
import { EditEntityActions, NewEntityAction, EditEntitySuccessAction } from '../editEntity/editEntity.types'
import { EntityType } from '../../modules/Entities/types'
jest.mock('uuid')

const initialState = SUT.initialState

describe('EditEntityClaims Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('EntityClaim Actions', () => {
    it('should add a new entityClaim section', () => {
      const id = 'someId'

      const idForTemplate = 'someIdForTemplate'
      v4.mockImplementationOnce(() => idForTemplate)

      // given ... we have an action of type EditEntityClaimsActions.AddEntityClaim
      const action: AddEntityClaimAction = {
        type: EditEntityClaimsActions.AddEntityClaim,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          ...initialState.entityClaims,
          [id]: {
            id: action.payload.id,
            template: {
              id: 'someIdForTemplate',
              entityClaimId: action.payload.id,
              templateId: undefined,
              title: undefined,
              description: undefined,
              isPrivate: false,
              minTargetClaims: undefined,
              maxTargetClaims: undefined,
              submissionStartDate: undefined,
              submissionEndDate: undefined,
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })

    it('should remove an entityClaim section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityClaimsActions.RemoveEntityClaim
      const action: RemoveEntityClaimAction = {
        type: EditEntityClaimsActions.RemoveEntityClaim,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [id]: {
              id,
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: undefined,
                title: undefined,
                description: undefined,
                isPrivate: true,
                minTargetClaims: undefined,
                maxTargetClaims: undefined,
                goal: undefined,
                submissionStartDate: undefined,
                submissionEndDate: undefined,
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: undefined,
                title: undefined,
                description: undefined,
                isPrivate: false,
                minTargetClaims: undefined,
                maxTargetClaims: undefined,
                goal: undefined,
                submissionStartDate: undefined,
                submissionEndDate: undefined,
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: undefined,
              title: undefined,
              description: undefined,
              isPrivate: false,
              minTargetClaims: undefined,
              maxTargetClaims: undefined,
              submissionStartDate: undefined,
              submissionEndDate: undefined,
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })
  })

  describe('EntityClaimTemplate Actions', () => {
    it('should update the template', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'
      const templateId = 'someTemplateId'
      const title = 'someTitle'
      const description = 'someDescription'
      const isPrivate = true
      const minTargetClaims = 10
      const maxTargetClaims = 20
      const goal = 'someGoal'
      const submissionStartDate = 'someSubmissionStartDate'
      const submissionEndDate = 'someSubmisionEndDate'

      // given .. we have an action of type EditEntitySettingsActions.UpdatePrivacy
      const action: UpdateEntityClaimTemplateAction = {
        type: EditEntityClaimsActions.UpdateEntityClaimTemplate,
        payload: {
          id,
          entityClaimId,
          templateId,
          title,
          description,
          isPrivate,
          minTargetClaims,
          maxTargetClaims,
          goal,
          submissionStartDate,
          submissionEndDate,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someOldTemplateId',
                title: 'someOldTitle',
                description: 'someOldDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someOldGoal',
                submissionStartDate: 'someOldSubmissionStartDate',
                submissionEndDate: 'someOldSubmissionEndDate',
              },
              agentRoles: {
                ['existingAgentRoleId']: {
                  id: 'existingAgentRoldId',
                  entityClaimId: 'someEntityClaimId',
                  role: 'someRole',
                  credential: 'someCredential',
                  autoApprove: true,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {
                ['anotherExistingAgentRoleId']: {
                  id: 'anotherExistingAgentRoldId',
                  entityClaimId: 'anotherid',
                  role: 'someOtherRole',
                  credential: 'someOtherCredential',
                  autoApprove: true,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id,
              entityClaimId,
              templateId,
              title,
              description,
              isPrivate,
              minTargetClaims,
              maxTargetClaims,
              goal,
              submissionStartDate,
              submissionEndDate,
            },
            agentRoles: {
              ['existingAgentRoleId']: {
                id: 'existingAgentRoldId',
                entityClaimId: 'someEntityClaimId',
                role: 'someRole',
                credential: 'someCredential',
                autoApprove: true,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',

              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {
              ['anotherExistingAgentRoleId']: {
                id: 'anotherExistingAgentRoldId',
                entityClaimId: 'anotherid',
                role: 'someOtherRole',
                credential: 'someOtherCredential',
                autoApprove: true,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })
  })

  describe('EntityClaimAgentRole Actions', () => {
    it('should add a new agent role to an entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.AddEntityClaimAgentRole
      const action: AddEntityClaimAgentRoleAction = {
        type: EditEntityClaimsActions.AddEntityClaimAgentRole,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {
                ['existingAgentRoleId']: {
                  id: 'existingAgentRoldId',
                  entityClaimId,
                  role: 'someRole',
                  credential: 'someCredential',
                  autoApprove: true,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {
                ['anotherExistingAgentRoleId']: {
                  id: 'anotherExistingAgentRoldId',
                  entityClaimId: 'anotherid',
                  role: 'someOtherRole',
                  credential: 'someOtherCredential',
                  autoApprove: true,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {
              ['existingAgentRoleId']: {
                id: 'existingAgentRoldId',
                entityClaimId,
                role: 'someRole',
                credential: 'someCredential',
                autoApprove: true,
              },
              [id]: {
                id,
                entityClaimId,
                role: undefined,
                credential: undefined,
                autoApprove: false,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {
              ['anotherExistingAgentRoleId']: {
                id: 'anotherExistingAgentRoldId',
                entityClaimId: 'anotherid',
                role: 'someOtherRole',
                credential: 'someOtherCredential',
                autoApprove: true,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })

    it('should remove agent role from the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.RemoveEntityClaimAgentRole
      const action: RemoveEntityClaimAgentRoleAction = {
        type: EditEntityClaimsActions.RemoveEntityClaimAgentRole,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {
                ['existingAgentRoleId']: {
                  id: 'existingAgentRoldId',
                  entityClaimId,
                  role: 'someRole',
                  credential: 'someCredential',
                  autoApprove: true,
                },
                [id]: {
                  id,
                  entityClaimId,
                  role: 'someRoleThatWillBeRemoved',
                  credential: 'someCredentialThatWillBeRemoved',
                  autoApprove: true,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {
                ['anotherExistingAgentRoleId']: {
                  id: 'anotherExistingAgentRoldId',
                  entityClaimId: 'anotherid',
                  role: 'someOtherRole',
                  credential: 'someOtherCredential',
                  autoApprove: true,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {
              ['existingAgentRoleId']: {
                id: 'existingAgentRoldId',
                entityClaimId,
                role: 'someRole',
                credential: 'someCredential',
                autoApprove: true,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {
              ['anotherExistingAgentRoleId']: {
                id: 'anotherExistingAgentRoldId',
                entityClaimId: 'anotherid',
                role: 'someOtherRole',
                credential: 'someOtherCredential',
                autoApprove: true,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })

    it('should update the agent role in the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'
      const role = 'someNewRole'
      const autoApprove = true
      const credential = 'someNewCredential'

      // given .. we have an action of type EditEntityClaimsActions.UpdateEntityClaimAgentRole
      const action: UpdateEntityClaimAgentRoleAction = {
        type: EditEntityClaimsActions.UpdateEntityClaimAgentRole,
        payload: {
          entityClaimId,
          id,
          role,
          autoApprove,
          credential,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {
                ['existingAgentRoleId']: {
                  id: 'existingAgentRoldId',
                  entityClaimId,
                  role: 'someRole',
                  credential: 'someCredential',
                  autoApprove: true,
                },
                [id]: {
                  id,
                  entityClaimId,
                  role: 'someOldRoleNameThatWillBeUpdated',
                  credential: 'someOldCredentialThatWillBeUpdated',
                  autoApprove: false,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {
                ['anotherExistingAgentRoleId']: {
                  id: 'anotherExistingAgentRoldId',
                  entityClaimId: 'anotherid',
                  role: 'someOtherRole',
                  credential: 'someOtherCredential',
                  autoApprove: true,
                },
              },
              evaluations: {},
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {
              ['existingAgentRoleId']: {
                id: 'existingAgentRoldId',
                entityClaimId,
                role: 'someRole',
                credential: 'someCredential',
                autoApprove: true,
              },
              [id]: {
                id,
                entityClaimId,
                role,
                credential,
                autoApprove,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {
              ['anotherExistingAgentRoleId']: {
                id: 'anotherExistingAgentRoldId',
                entityClaimId: 'anotherid',
                role: 'someOtherRole',
                credential: 'someOtherCredential',
                autoApprove: true,
              },
            },
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })
  })

  describe('EntityClaimEvaluation Actions', () => {
    it('should add an evaluation to an entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.AddEntityClaimEvaluation
      const action: AddEntityClaimEvaluationAction = {
        type: EditEntityClaimsActions.AddEntityClaimEvaluation,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {
                ['someExistingEvaluationId']: {
                  id: 'someExistingEvaluationId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                  evaluationMethodology: 'someEvaluationMethodology',
                },
              },
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {
                ['someOtherEvaluationId']: {
                  id: 'someOtherEvaluationId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                  evaluationMethodology: 'someEvaluationMethodology',
                },
              },
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {
              ['someExistingEvaluationId']: {
                id: 'someExistingEvaluationId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                evaluationMethodology: 'someEvaluationMethodology',
              },
              [id]: {
                id,
                entityClaimId,
                context: undefined,
                contextLink: undefined,
                evaluationAttributes: undefined,
                evaluationMethodology: undefined,
              },
            },
            approvalCriteria: {},
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {
              ['someOtherEvaluationId']: {
                id: 'someOtherEvaluationId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                evaluationMethodology: 'someEvaluationMethodology',
              },
            },
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })

    it('should remove evaluation from the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.RemoveEntityClaimEvaluation
      const action: RemoveEntityClaimEvaluationAction = {
        type: EditEntityClaimsActions.RemoveEntityClaimEvaluation,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {
                ['someExistingEvaluationId']: {
                  id: 'someExistingEvaluationId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                  evaluationMethodology: 'someEvaluationMethodology',
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeRemoved',
                  contextLink: 'someContextLinkThatWillBeRemoved',
                  evaluationAttributes: ['someAttributeThatWillBeRemoved', 'anotherAttributeThatWillBeRemoved'],
                  evaluationMethodology: 'someEvaluationMethodologyThatWillBeRemoved',
                },
              },
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {
                ['someOtherEvaluationId']: {
                  id: 'someOtherEvaluationId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                  evaluationMethodology: 'someEvaluationMethodology',
                },
              },
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {
              ['someExistingEvaluationId']: {
                id: 'someExistingEvaluationId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                evaluationMethodology: 'someEvaluationMethodology',
              },
            },
            approvalCriteria: {},
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {
              ['someOtherEvaluationId']: {
                id: 'someOtherEvaluationId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                evaluationMethodology: 'someEvaluationMethodology',
              },
            },
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })

    it('should update the evaluation in the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'
      const context = 'someContext'
      const contextLink = 'someContextLink'
      const evaluationAttributes = ['someEvaluationAttribute']
      const evaluationMethodology = 'someEvaluationMethodology'

      // given .. we have an action of type EditEntityClaimsActions.UpdateEntityClaimEvaluation
      const action: UpdateEntityClaimEvaluationAction = {
        type: EditEntityClaimsActions.UpdateEntityClaimEvaluation,
        payload: {
          entityClaimId,
          id,
          context,
          contextLink,
          evaluationAttributes,
          evaluationMethodology,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {
                ['someExistingEvaluationId']: {
                  id: 'someExistingEvaluationId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                  evaluationMethodology: 'someEvaluationMethodology',
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeUpdated',
                  contextLink: 'someContextLinkThatWillBeUpdated',
                  evaluationAttributes: ['someAttributeThatWillBeUpdated', 'anotherAttributeThatWillBeUpdated'],
                  evaluationMethodology: 'someEvaluationMethodologyThatWillBeUpdated',
                },
              },
              approvalCriteria: {},
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {
                ['someOtherEvaluationId']: {
                  id: 'someOtherEvaluationId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                  evaluationMethodology: 'someEvaluationMethodology',
                },
              },
              approvalCriteria: {},
              enrichments: {},
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {
              ['someExistingEvaluationId']: {
                id: 'someExistingEvaluationId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                evaluationMethodology: 'someEvaluationMethodology',
              },
              [id]: {
                id,
                entityClaimId,
                context,
                contextLink,
                evaluationAttributes,
                evaluationMethodology,
              },
            },
            approvalCriteria: {},
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {
              ['someOtherEvaluationId']: {
                id: 'someOtherEvaluationId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                evaluationAttributes: ['someAttribute', 'anotherAttribute'],
                evaluationMethodology: 'someEvaluationMethodology',
              },
            },
            approvalCriteria: {},
            enrichments: {},
          },
        },
      })
    })
  })

  describe('EntityClaimApprovalCriterion Actions', () => {
    it('should add an approval criterion to an entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.AddEntityClaimApprovalCriterion
      const action: AddEntityClaimApprovalCriterionAction = {
        type: EditEntityClaimsActions.AddEntityClaimApprovalCriterion,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {
                ['someExistingApprovalCriterionId']: {
                  id: 'someExistingApprovalCriterionId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  approvalAttributes: [
                    { condition: 'someCondition1', attribute: 'someAttribute' },
                    {
                      condition: 'someCondition2',
                      attribute: 'anotherAttribute',
                    },
                  ],
                },
              },
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {
                ['someOtherApprovalCriterionId']: {
                  id: 'someOtherApprovalCriterionId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  approvalAttributes: [
                    { condition: 'someCondition1', attribute: 'someAttribute' },
                    {
                      condition: 'someCondition2',
                      attribute: 'anotherAttribute',
                    },
                  ],
                },
              },
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {
              ['someExistingApprovalCriterionId']: {
                id: 'someExistingApprovalCriterionId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                approvalAttributes: [
                  { condition: 'someCondition1', attribute: 'someAttribute' },
                  {
                    condition: 'someCondition2',
                    attribute: 'anotherAttribute',
                  },
                ],
              },
              [id]: {
                id,
                entityClaimId,
                context: undefined,
                contextLink: undefined,
                approvalAttributes: undefined,
              },
            },
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {
              ['someOtherApprovalCriterionId']: {
                id: 'someOtherApprovalCriterionId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                approvalAttributes: [
                  { condition: 'someCondition1', attribute: 'someAttribute' },
                  {
                    condition: 'someCondition2',
                    attribute: 'anotherAttribute',
                  },
                ],
              },
            },
            enrichments: {},
          },
        },
      })
    })

    it('should remove approval criterion from the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.RemoveEntityClaimApprovalCriterion
      const action: RemoveEntityClaimApprovalCriterionAction = {
        type: EditEntityClaimsActions.RemoveEntityClaimApprovalCriterion,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {
                ['someExistingApprovalCriterionId']: {
                  id: 'someExistingApprovalCriterionId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  approvalAttributes: [
                    { condition: 'someCondition1', attribute: 'someAttribute' },
                    {
                      condition: 'someCondition2',
                      attribute: 'anotherAttribute',
                    },
                  ],
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeRemoved',
                  contextLink: 'someContextLinkThatWillBeRemoved',
                  approvalAttributes: [
                    {
                      condition: 'someCondition1ThatWillBeRemoved',
                      attribute: 'someAttributeThatWillBeRemoved',
                    },
                    {
                      condition: 'someCondition2ThatWillBeRemoved',
                      attribute: 'anotherAttributeThatWillBeRemoved',
                    },
                  ],
                },
              },
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {
                ['someOtherApprovalCriterionId']: {
                  id: 'someOtherApprovalCriterionId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  approvalAttributes: [
                    { condition: 'someCondition1', attribute: 'someAttribute' },
                    {
                      condition: 'someCondition2',
                      attribute: 'anotherAttribute',
                    },
                  ],
                },
              },
              enrichments: {},
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {
              ['someExistingApprovalCriterionId']: {
                id: 'someExistingApprovalCriterionId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                approvalAttributes: [
                  { condition: 'someCondition1', attribute: 'someAttribute' },
                  {
                    condition: 'someCondition2',
                    attribute: 'anotherAttribute',
                  },
                ],
              },
            },
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {
              ['someOtherApprovalCriterionId']: {
                id: 'someOtherApprovalCriterionId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                approvalAttributes: [
                  { condition: 'someCondition1', attribute: 'someAttribute' },
                  {
                    condition: 'someCondition2',
                    attribute: 'anotherAttribute',
                  },
                ],
              },
            },
            enrichments: {},
          },
        },
      })
    })

    it('should update the approval criterion in the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'
      const context = 'someContext'
      const contextLink = 'someContextLink'
      const approvalAttributes = [{ condition: 'someCondition', attribute: 'someApprovalAttribute' }]

      // given .. we have an action of type EditEntityClaimsActions.UpdateEntityClaimApprovalCriterion
      const action: UpdateEntityClaimApprovalCriterionAction = {
        type: EditEntityClaimsActions.UpdateEntityClaimApprovalCriterion,
        payload: {
          entityClaimId,
          id,
          context,
          contextLink,
          approvalAttributes,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {
                ['someExistingApprovalCriterionId']: {
                  id: 'someExistingApprovalCriterionId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  approvalAttributes: [
                    { condition: 'someCondition1', attribute: 'someAttribute' },
                    {
                      condition: 'someCondition2',
                      attribute: 'anotherAttribute',
                    },
                  ],
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeUpdated',
                  contextLink: 'someContextLinkThatWillBeUpdated',
                  approvalAttributes: [
                    {
                      condition: 'someConditionThatWillBeUpdated',
                      attribute: 'someApprovalAttributeThatWillBeUpdated',
                    },
                  ],
                },
              },
              enrichments: {},
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {
                ['someOtherApprovalCriterionId']: {
                  id: 'someOtherApprovalCriterionId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  approvalAttributes: [
                    { condition: 'someCondition1', attribute: 'someAttribute' },
                    {
                      condition: 'someCondition2',
                      attribute: 'anotherAttribute',
                    },
                  ],
                },
              },
              enrichments: {},
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {
              ['someExistingApprovalCriterionId']: {
                id: 'someExistingApprovalCriterionId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                approvalAttributes: [
                  { condition: 'someCondition1', attribute: 'someAttribute' },
                  {
                    condition: 'someCondition2',
                    attribute: 'anotherAttribute',
                  },
                ],
              },
              [id]: {
                id,
                entityClaimId,
                context,
                contextLink,
                approvalAttributes,
              },
            },
            enrichments: {},
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {
              ['someOtherApprovalCriterionId']: {
                id: 'someOtherApprovalCriterionId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                approvalAttributes: [
                  { condition: 'someCondition1', attribute: 'someAttribute' },
                  {
                    condition: 'someCondition2',
                    attribute: 'anotherAttribute',
                  },
                ],
              },
            },
            enrichments: {},
          },
        },
      })
    })
  })

  describe('EntityClaimEnrichment Actions', () => {
    it('should add an enrichment to an entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.AddEntityClaimEnrichment
      const action: AddEntityClaimEnrichmentAction = {
        type: EditEntityClaimsActions.AddEntityClaimEnrichment,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {
                ['someExistingEnrichmentId']: {
                  id: 'someExistingEnrichmentId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  resources: [
                    { productId: 'someProductId1', resource: 'someAttribute' },
                    {
                      productId: 'someProductId2',
                      resource: 'anotherAttribute',
                    },
                  ],
                },
              },
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {
                ['someOtherEnrichmentId']: {
                  id: 'someOtherEnrichmentId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  resources: [
                    { productId: 'someProductId1', resource: 'someAttribute' },
                    {
                      productId: 'someProductId2',
                      resource: 'anotherAttribute',
                    },
                  ],
                },
              },
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {
              ['someExistingEnrichmentId']: {
                id: 'someExistingEnrichmentId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                resources: [
                  { productId: 'someProductId1', resource: 'someAttribute' },
                  { productId: 'someProductId2', resource: 'anotherAttribute' },
                ],
              },
              [id]: {
                id,
                entityClaimId,
                context: undefined,
                contextLink: undefined,
                resources: undefined,
              },
            },
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {
              ['someOtherEnrichmentId']: {
                id: 'someOtherEnrichmentId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                resources: [
                  { productId: 'someProductId1', resource: 'someAttribute' },
                  { productId: 'someProductId2', resource: 'anotherAttribute' },
                ],
              },
            },
          },
        },
      })
    })

    it('should remove enrichment from the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type EditEntityClaimsActions.RemoveEntityClaimEnrichment
      const action: RemoveEntityClaimEnrichmentAction = {
        type: EditEntityClaimsActions.RemoveEntityClaimEnrichment,
        payload: {
          entityClaimId,
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {
                ['someExistingEnrichmentId']: {
                  id: 'someExistingEnrichmentId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  resources: [
                    { productId: 'someProductId1', resource: 'someAttribute' },
                    {
                      productId: 'someProductId2',
                      resource: 'anotherAttribute',
                    },
                  ],
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeRemoved',
                  contextLink: 'someContextLinkThatWillBeRemoved',
                  resources: [
                    {
                      productId: 'someProductId1ThatWillBeRemoved',
                      resource: 'someAttributeThatWillBeRemoved',
                    },
                    {
                      productId: 'someProductId2ThatWillBeRemoved',
                      resource: 'anotherAttributeThatWillBeRemoved',
                    },
                  ],
                },
              },
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {
                ['someOtherEnrichmentId']: {
                  id: 'someOtherEnrichmentId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  resources: [
                    { productId: 'someProductId1', resource: 'someAttribute' },
                    {
                      productId: 'someProductId2',
                      resource: 'anotherAttribute',
                    },
                  ],
                },
              },
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {
              ['someExistingEnrichmentId']: {
                id: 'someExistingEnrichmentId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                resources: [
                  { productId: 'someProductId1', resource: 'someAttribute' },
                  { productId: 'someProductId2', resource: 'anotherAttribute' },
                ],
              },
            },
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {
              ['someOtherEnrichmentId']: {
                id: 'someOtherEnrichmentId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                resources: [
                  { productId: 'someProductId1', resource: 'someAttribute' },
                  { productId: 'someProductId2', resource: 'anotherAttribute' },
                ],
              },
            },
          },
        },
      })
    })

    it('should update the enrichment in the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'
      const context = 'someContext'
      const contextLink = 'someContextLink'
      const resources = [
        { productId: 'someProductId1', resource: 'someAttribute' },
        { productId: 'someProductId2', resource: 'anotherAttribute' },
      ]

      // given .. we have an action of type EditEntityClaimsActions.UpdateEntityClaimEnrichment
      const action: UpdateEntityClaimEnrichmentAction = {
        type: EditEntityClaimsActions.UpdateEntityClaimEnrichment,
        payload: {
          entityClaimId,
          id,
          context,
          contextLink,
          resources,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {
            [entityClaimId]: {
              id: entityClaimId,
              template: {
                id: 'someIdForTemplate',
                entityClaimId,
                templateId: 'someTemplateId',
                title: 'someTitle',
                description: 'someDescription',
                isPrivate: false,
                minTargetClaims: 1,
                maxTargetClaims: 2,
                goal: 'someGoal',
                submissionStartDate: 'someSubmissionStartDate',
                submissionEndDate: 'someSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {
                ['someExistingEnrichmentId']: {
                  id: 'someExistingEnrichmentId',
                  entityClaimId,
                  context: 'someExistingContext',
                  contextLink: 'someExistingContextLink',
                  resources: [
                    { productId: 'someProductId1', resource: 'someAttribute' },
                    {
                      productId: 'someProductId2',
                      resource: 'anotherAttribute',
                    },
                  ],
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeUpdated',
                  contextLink: 'someContextLinkThatWillBeUpdated',
                  resources: [
                    {
                      productId: 'someProductIdThatWillBeRemoved',
                      resource: 'someAttributeThatWillBeUpdated',
                    },
                    {
                      productId: 'anotherProductIdThatWillBeRemoved',
                      resource: 'anotherAttributeThatWillBeUpdated',
                    },
                  ],
                },
              },
            },
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: 'someOtherTemplateId',
                title: 'someOtherTitle',
                description: 'someOtherDescription',
                isPrivate: false,
                minTargetClaims: 10,
                maxTargetClaims: 20,
                goal: 'someOtherGoal',
                submissionStartDate: 'someOtherSubmissionStartDate',
                submissionEndDate: 'someOtherSubmissionEndDate',
              },
              agentRoles: {},
              evaluations: {},
              approvalCriteria: {},
              enrichments: {
                ['someOtherEnrichmentId']: {
                  id: 'someOtherEnrichmentId',
                  entityClaimId: 'anotherid',
                  context: 'someOtherContext',
                  contextLink: 'someOtherContextLink',
                  resources: [
                    { productId: 'someProductId1', resource: 'someAttribute' },
                    {
                      productId: 'someProductId2',
                      resource: 'anotherAttribute',
                    },
                  ],
                },
              },
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        entityClaims: {
          [entityClaimId]: {
            id: entityClaimId,
            template: {
              id: 'someIdForTemplate',
              entityClaimId,
              templateId: 'someTemplateId',
              title: 'someTitle',
              description: 'someDescription',
              isPrivate: false,
              minTargetClaims: 1,
              maxTargetClaims: 2,
              goal: 'someGoal',
              submissionStartDate: 'someSubmissionStartDate',
              submissionEndDate: 'someSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {
              ['someExistingEnrichmentId']: {
                id: 'someExistingEnrichmentId',
                entityClaimId,
                context: 'someExistingContext',
                contextLink: 'someExistingContextLink',
                resources: [
                  { productId: 'someProductId1', resource: 'someAttribute' },
                  { productId: 'someProductId2', resource: 'anotherAttribute' },
                ],
              },
              [id]: {
                id,
                entityClaimId,
                context,
                contextLink,
                resources,
              },
            },
          },
          ['anotherid']: {
            id: 'anotherid',
            template: {
              id: 'someIdForTemplate',
              entityClaimId: 'anotherid',
              templateId: 'someOtherTemplateId',
              title: 'someOtherTitle',
              description: 'someOtherDescription',
              isPrivate: false,
              minTargetClaims: 10,
              maxTargetClaims: 20,
              goal: 'someOtherGoal',
              submissionStartDate: 'someOtherSubmissionStartDate',
              submissionEndDate: 'someOtherSubmissionEndDate',
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {
              ['someOtherEnrichmentId']: {
                id: 'someOtherEnrichmentId',
                entityClaimId: 'anotherid',
                context: 'someOtherContext',
                contextLink: 'someOtherContextLink',
                resources: [
                  { productId: 'someProductId1', resource: 'someAttribute' },
                  { productId: 'someProductId2', resource: 'anotherAttribute' },
                ],
              },
            },
          },
        },
      })
    })
  })

  describe('validation', () => {
    it('should set validated to true and clear any errors', () => {
      const identifier = 'someBodySectionId'
      const errors = ['error1', 'error2']
      // given ... we have an action of type EditEntityClaimsActions.Validated
      const action: ValidatedAction = {
        type: EditEntityClaimsActions.Validated,
        payload: {
          identifier,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          validation: {
            [identifier]: {
              identifier,
              validated: false,
              errors,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      })
    })
  })

  it('should set validated to false and add any errors', () => {
    const identifier = 'someBodySectionId'
    const errors = ['error1', 'error2']
    // given ... we have an action of type EditEntityClaimsActions.ValidationError
    const action: ValidationErrorAction = {
      type: EditEntityClaimsActions.ValidationError,
      payload: {
        errors,
        identifier,
      },
    }

    // when ... we run the reducer with this action
    const result = SUT.reducer(
      {
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      },
      action,
    )

    // then ... the state should be set as expected
    expect(result).toEqual({
      ...initialState,
      validation: {
        [identifier]: {
          identifier,
          validated: false,
          errors,
        },
      },
    })
  })

  describe('NewEntity Actions', () => {
    it('should return initial state if a new entity action type is received', () => {
      // given ... we have an action of type EditEntityActions.NewEntity
      const action: NewEntityAction = {
        type: EditEntityActions.NewEntity,
        payload: {
          entityType: EntityType.Dao,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {},
          validation: {
            ['someId']: {
              validated: true,
              errors: ['someError'],
              identifier: 'someIdentifier',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })

  describe('EditEntitySuccess Actions', () => {
    it('should return initial state if a EditEntitySuccess type is received', () => {
      // given ... we have an action of type EditEntityActions.EditEntitySuccess
      const action: EditEntitySuccessAction = {
        type: EditEntityActions.EditEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          entityClaims: {},
          validation: {
            ['someId']: {
              validated: true,
              errors: ['someError'],
              identifier: 'someIdentifier',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})

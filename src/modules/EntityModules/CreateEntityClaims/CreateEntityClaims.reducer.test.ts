import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './CreateEntityClaims.reducer'
import {
  AddEntityClaimAction,
  CreateEntityClaimsActions,
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
} from './types'
import { CreateEntityActions, NewEntityAction } from '../CreateEntity/types'
import { EntityType } from '../Entities/types'

const initialState = SUT.initialState

describe('CreateEntityClaims Reducer', () => {
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

      const idForTempalte = 'someIdForTemplate'
      v4.mockImplementationOnce(() => idForTempalte)

      // given ... we have an action of type CreateEntityClaimsActions.AddEntityClaim
      const action: AddEntityClaimAction = {
        type: CreateEntityClaimsActions.AddEntityClaim,
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
          [id]: {
            id: action.payload.id,
            template: {
              id: 'someIdForTemplate',
              entityClaimId: action.payload.id,
              templateId: undefined,
              title: undefined,
              description: undefined,
              isPrivate: undefined,
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

      // given ... we have an action of type CreateEntityClaimsActions.RemoveEntityClaim
      const action: RemoveEntityClaimAction = {
        type: CreateEntityClaimsActions.RemoveEntityClaim,
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
                isPrivate: undefined,
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
            ['anotherid']: {
              id: 'anotherid',
              template: {
                id: 'someIdForTemplate',
                entityClaimId: 'anotherid',
                templateId: undefined,
                title: undefined,
                description: undefined,
                isPrivate: undefined,
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
              isPrivate: undefined,
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
      const submissionStartDate = 'someSubmissionStartDate'
      const submissionEndDate = 'someSubmisionEndDate'

      // given .. we have an action of type CreateEntitySettingsActions.UpdatePrivacy
      const action: UpdateEntityClaimTemplateAction = {
        type: CreateEntityClaimsActions.UpdateEntityClaimTemplate,
        payload: {
          id,
          entityClaimId,
          templateId,
          title,
          description,
          isPrivate,
          minTargetClaims,
          maxTargetClaims,
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

      // given ... we have an action of type CreateEntityClaimsActions.AddEntityClaimAgentRole
      const action: AddEntityClaimAgentRoleAction = {
        type: CreateEntityClaimsActions.AddEntityClaimAgentRole,
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
                autoApprove: undefined,
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

      // given ... we have an action of type CreateEntityClaimsActions.RemoveEntityClaimAgentRole
      const action: RemoveEntityClaimAgentRoleAction = {
        type: CreateEntityClaimsActions.RemoveEntityClaimAgentRole,
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

      // given .. we have an action of type CreateEntityClaimsActions.UpdateEntityClaimAgentRole
      const action: UpdateEntityClaimAgentRoleAction = {
        type: CreateEntityClaimsActions.UpdateEntityClaimAgentRole,
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

      // given ... we have an action of type CreateEntityClaimsActions.AddEntityClaimEvaluation
      const action: AddEntityClaimEvaluationAction = {
        type: CreateEntityClaimsActions.AddEntityClaimEvaluation,
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

      // given ... we have an action of type CreateEntityClaimsActions.RemoveEntityClaimEvaluation
      const action: RemoveEntityClaimEvaluationAction = {
        type: CreateEntityClaimsActions.RemoveEntityClaimEvaluation,
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
                  evaluationAttributes: [
                    'someAttributeThatWillBeRemoved',
                    'anotherAttributeThatWillBeRemoved',
                  ],
                  evaluationMethodology:
                    'someEvaluationMethodologyThatWillBeRemoved',
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

      // given .. we have an action of type CreateEntityClaimsActions.UpdateEntityClaimEvaluation
      const action: UpdateEntityClaimEvaluationAction = {
        type: CreateEntityClaimsActions.UpdateEntityClaimEvaluation,
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
                  evaluationAttributes: [
                    'someAttributeThatWillBeUpdated',
                    'anotherAttributeThatWillBeUpdated',
                  ],
                  evaluationMethodology:
                    'someEvaluationMethodologyThatWillBeUpdated',
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

      // given ... we have an action of type CreateEntityClaimsActions.AddEntityClaimApprovalCriterion
      const action: AddEntityClaimApprovalCriterionAction = {
        type: CreateEntityClaimsActions.AddEntityClaimApprovalCriterion,
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
                  approvalAttributes: ['someAttribute', 'anotherAttribute'],
                  approvalCondition: 'someApprovalCondition',
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
                  approvalAttributes: ['someAttribute', 'anotherAttribute'],
                  approvalCondition: 'someOtherApprovalCondition',
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
                approvalAttributes: ['someAttribute', 'anotherAttribute'],
                approvalCondition: 'someApprovalCondition',
              },
              [id]: {
                id,
                entityClaimId,
                context: undefined,
                contextLink: undefined,
                approvalAttributes: undefined,
                approvalCondition: undefined,
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
                approvalAttributes: ['someAttribute', 'anotherAttribute'],
                approvalCondition: 'someOtherApprovalCondition',
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

      // given ... we have an action of type CreateEntityClaimsActions.RemoveEntityClaimApprovalCriterion
      const action: RemoveEntityClaimApprovalCriterionAction = {
        type: CreateEntityClaimsActions.RemoveEntityClaimApprovalCriterion,
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
                  approvalAttributes: ['someAttribute', 'anotherAttribute'],
                  approvalCondition: 'someApprovalCondition',
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeRemoved',
                  contextLink: 'someContextLinkThatWillBeRemoved',
                  approvalAttributes: [
                    'someAttributeThatWillBeRemoved',
                    'anotherAttributeThatWillBeRemoved',
                  ],
                  approvalCondition: 'someApprovalConditionThatWillBeRemoved',
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
                  approvalAttributes: ['someAttribute', 'anotherAttribute'],
                  approvalCondition: 'someOtherApprovalCondition',
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
                approvalAttributes: ['someAttribute', 'anotherAttribute'],
                approvalCondition: 'someApprovalCondition',
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
                approvalAttributes: ['someAttribute', 'anotherAttribute'],
                approvalCondition: 'someOtherApprovalCondition',
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
      const approvalAttributes = ['someApprovalAttribute']
      const approvalCondition = 'someApprovalCondition'

      // given .. we have an action of type CreateEntityClaimsActions.UpdateEntityClaimApprovalCriterion
      const action: UpdateEntityClaimApprovalCriterionAction = {
        type: CreateEntityClaimsActions.UpdateEntityClaimApprovalCriterion,
        payload: {
          entityClaimId,
          id,
          context,
          contextLink,
          approvalAttributes,
          approvalCondition,
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
                  approvalAttributes: ['someAttribute', 'anotherAttribute'],
                  approvalCondition: 'someApprovalCondition',
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeUpdated',
                  contextLink: 'someContextLinkThatWillBeUpdated',
                  approvalAttributes: [
                    'someAttributeThatWillBeUpdated',
                    'anotherAttributeThatWillBeUpdated',
                  ],
                  approvalCondition: 'someApprovalConditionThatWillBeUpdated',
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
                  approvalAttributes: ['someAttribute', 'anotherAttribute'],
                  approvalCondition: 'someApprovalCriterionMethodology',
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
                approvalAttributes: ['someAttribute', 'anotherAttribute'],
                approvalCondition: 'someApprovalCondition',
              },
              [id]: {
                id,
                entityClaimId,
                context,
                contextLink,
                approvalAttributes,
                approvalCondition,
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
                approvalAttributes: ['someAttribute', 'anotherAttribute'],
                approvalCondition: 'someApprovalCriterionMethodology',
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

      // given ... we have an action of type CreateEntityClaimsActions.AddEntityClaimEnrichment
      const action: AddEntityClaimEnrichmentAction = {
        type: CreateEntityClaimsActions.AddEntityClaimEnrichment,
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
                  resources: ['someAttribute', 'anotherAttribute'],
                  productId: 'someProductId',
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
                  resources: ['someAttribute', 'anotherAttribute'],
                  productId: 'someOtherProductId',
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
                resources: ['someAttribute', 'anotherAttribute'],
                productId: 'someProductId',
              },
              [id]: {
                id,
                entityClaimId,
                context: undefined,
                contextLink: undefined,
                resources: undefined,
                productId: undefined,
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
                resources: ['someAttribute', 'anotherAttribute'],
                productId: 'someOtherProductId',
              },
            },
          },
        },
      })
    })

    it('should remove enrichment from the entity claim section', () => {
      const id = 'someId'
      const entityClaimId = 'someEntityClaimId'

      // given ... we have an action of type CreateEntityClaimsActions.RemoveEntityClaimEnrichment
      const action: RemoveEntityClaimEnrichmentAction = {
        type: CreateEntityClaimsActions.RemoveEntityClaimEnrichment,
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
                  resources: ['someAttribute', 'anotherAttribute'],
                  productId: 'someProductId',
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeRemoved',
                  contextLink: 'someContextLinkThatWillBeRemoved',
                  resources: [
                    'someAttributeThatWillBeRemoved',
                    'anotherAttributeThatWillBeRemoved',
                  ],
                  productId: 'someProductIdThatWillBeRemoved',
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
                  resources: ['someAttribute', 'anotherAttribute'],
                  productId: 'someOtheProductId',
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
                resources: ['someAttribute', 'anotherAttribute'],
                productId: 'someProductId',
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
                resources: ['someAttribute', 'anotherAttribute'],
                productId: 'someOtheProductId',
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
      const resources = ['someAttribute']
      const productId = 'someProductId'

      // given .. we have an action of type CreateEntityClaimsActions.UpdateEntityClaimEnrichment
      const action: UpdateEntityClaimEnrichmentAction = {
        type: CreateEntityClaimsActions.UpdateEntityClaimEnrichment,
        payload: {
          entityClaimId,
          id,
          context,
          contextLink,
          resources,
          productId,
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
                  resources: ['someAttribute', 'anotherAttribute'],
                  productId: 'someProductId',
                },
                [id]: {
                  id,
                  entityClaimId,
                  context: 'someContextThatWillBeUpdated',
                  contextLink: 'someContextLinkThatWillBeUpdated',
                  resources: [
                    'someAttributeThatWillBeUpdated',
                    'anotherAttributeThatWillBeUpdated',
                  ],
                  productId: 'someProductIdThatWillBeUpdated',
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
                  resources: ['someAttribute', 'anotherAttribute'],
                  productId: 'someProductId',
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
                resources: ['someAttribute', 'anotherAttribute'],
                productId: 'someProductId',
              },
              [id]: {
                id,
                entityClaimId,
                context,
                contextLink,
                resources,
                productId,
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
                resources: ['someAttribute', 'anotherAttribute'],
                productId: 'someProductId',
              },
            },
          },
        },
      })
    })
  })

  describe('NewEntity Actions', () => {
    it('should return initial state if a new entity action type is received', () => {
      // given ... we have an action of type CreateEntityActions.NewEntity
      const action: NewEntityAction = {
        type: CreateEntityActions.NewEntity,
        payload: {
          entityType: EntityType.Cell,
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
})

import * as SUT from './EditEntityClaims.selectors'
import { EditEntityClaimsState } from './types'

let state: any

beforeEach(() => {
  state = {
    editEntityClaims: {
      entityClaims: {
        ['00000000-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
          id: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
          template: {
            id: '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
            entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
            templateId: 'someTemplateId',
            title: 'someTitle',
            description: 'someDescription',
            isPrivate: true,
            minTargetClaims: 21,
            maxTargetClaims: 35,
            goal: 'someGoal',
            submissionStartDate: 'someStartDate',
            submissionEndDate: 'someEndDate',
          },
          agentRoles: {
            ['00000002-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someRole',
              credential: 'someCredential',
              autoApprove: true,
            },
            ['00000003-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someOtherRole',
              credential: 'someOtherCredential',
              autoApprove: false,
            },
          },
          evaluations: {
            ['00000004-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEvaluationContext',
              contextLink: 'someEvaluationContextLink',
              evaluationAttributes: ['someEvaluationAttributes'],
              evaluationMethodology: 'someEvaluationMethodology',
            },
            ['00000005-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEvaluationContext',
              contextLink: 'someOtherEvaluationContextLink',
              evaluationAttributes: [
                'someOtherEvaluationAttribute1s',
                'someOtherEvaluationAttributes2',
              ],
              evaluationMethodology: 'someOtherEvaluationMethodology',
            },
          },
          approvalCriteria: {
            ['00000006-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someApprovalContext',
              contextLink: 'someApprovalContextLink',
              approvalAttributes: [
                {
                  condition: 'someCondition1',
                  attribute: 'someApprovalAttribute1',
                },
                {
                  condition: 'someCondition2',
                  attribute: 'someApprovalAttribute2',
                },
              ],
            },
            ['00000007-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherApprovalContext',
              contextLink: 'someOtherApprovalContextLink',
              approvalAttributes: [
                { condition: 'someCondition', attribute: 'someAttribute' },
                { condition: 'someCondition', attribute: 'someAttribute' },
              ],
            },
          },
          enrichments: {
            ['00000008-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEnrichmentContext',
              contextLink: 'someEnrichmentContextLink',
              resources: [
                { productId: 'someProductId1', resource: 'someOtherResource1' },
                { productId: 'someProductId1', resource: 'someOtherResource1' },
              ],
            },
            ['00000009-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEnrichmentContext',
              contextLink: 'someOtherEnrichmentContextLink',
              resources: [
                { productId: 'someProductId1', resource: 'someOtherResource1' },
                { productId: 'someProductId1', resource: 'someOtherResource1' },
              ],
            },
          },
        },
        ['10000000-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
          id: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
          template: {
            id: '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
            entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
            templateId: 'someTemplateIdClaim2',
            title: 'someTitleClaim2',
            description: 'someDescriptionClaim2',
            isPrivate: true,
            minTargetClaims: 22,
            maxTargetClaims: 34,
            goal: 'someGoal2',
            submissionStartDate: 'someStartDateClaim2',
            submissionEndDate: 'someEndDateClaim2',
          },
          agentRoles: {
            ['10000002-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someRoleClaim2',
              credential: 'someCredentialClaim2',
              autoApprove: false,
            },
            ['10000003-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someOtherRoleClaim2',
              credential: 'someOtherCredentialClaim2',
              autoApprove: true,
            },
          },
          evaluations: {
            ['10000004-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEvaluationContextClaim2',
              contextLink: 'someEvaluationContextLinkClaim2',
              evaluationAttributes: ['someEvaluationAttributesClaim2'],
              evaluationMethodology: 'someEvaluationMethodologyClaim2',
            },
            ['10000005-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEvaluationContextClaim2',
              contextLink: 'someOtherEvaluationContextLinkClaim2',
              evaluationAttributes: [
                'someOtherEvaluationAttribute1sClaim2',
                'someOtherEvaluationAttributes2Claim2',
              ],
              evaluationMethodology: 'someOtherEvaluationMethodologyClaim2',
            },
          },
          approvalCriteria: {
            ['10000006-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someApprovalContextClaim2',
              contextLink: 'someApprovalContextLinkClaim2',
              approvalAttributes: [
                {
                  condition: 'someCondition2',
                  attribute: 'someApprovalAttribute2',
                },
                {
                  condition: 'someCondition22',
                  attribute: 'someApprovalAttribute22',
                },
              ],
            },
            ['10000007-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherApprovalContextClaim2',
              contextLink: 'someOtherApprovalContextLinkClaim2',
              approvalAttributes: [
                {
                  condition: 'someCondition22',
                  attribute: 'someApprovalAttribute22',
                },
                {
                  condition: 'someCondition22',
                  attribute: 'someApprovalAttribute22',
                },
              ],
            },
          },
          enrichments: {
            ['10000008-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEnrichmentContextClaim2',
              contextLink: 'someEnrichmentContextLinkClaim2',
              resources: [
                { productId: 'someProductId', resource: 'someResource' },
                { productId: 'someProductId', resource: 'someResource' },
              ],
            },
            ['10000009-3b7d-4bad-9abc-2b0d7b3dcb6d']: {
              id: '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEnrichmentContexClaim2t',
              contextLink: 'someOtherEnrichmentContextLinkClaim2',
              resources: [
                { productId: 'someProductId', resource: 'someResource' },
                { productId: 'someProductId', resource: 'someResource' },
              ],
            },
          },
        },
      },
      validation: {
        '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
      },
    } as EditEntityClaimsState,
  }
})

describe('EditEntityClaims Selectors', () => {
  describe('selectEntityClaimsState', () => {
    it('should return the editEntityClaims property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectEntityClaimsState(state)

      // then ... should return result as expected
      expect(result).toEqual(state.editEntityClaims)
    })
  })

  describe('selectEntityClaims', () => {
    it('should return the entityClaims property', () => {
      // when ... we call the selector
      const result = SUT.selectEntityClaims(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
          template: {
            id: '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
            entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
            templateId: 'someTemplateId',
            title: 'someTitle',
            description: 'someDescription',
            isPrivate: true,
            minTargetClaims: 21,
            maxTargetClaims: 35,
            goal: 'someGoal',
            submissionStartDate: 'someStartDate',
            submissionEndDate: 'someEndDate',
          },
          agentRoles: [
            {
              id: '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someRole',
              credential: 'someCredential',
              autoApprove: true,
            },
            {
              id: '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someOtherRole',
              credential: 'someOtherCredential',
              autoApprove: false,
            },
          ],
          evaluations: [
            {
              id: '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEvaluationContext',
              contextLink: 'someEvaluationContextLink',
              evaluationAttributes: ['someEvaluationAttributes'],
              evaluationMethodology: 'someEvaluationMethodology',
            },
            {
              id: '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEvaluationContext',
              contextLink: 'someOtherEvaluationContextLink',
              evaluationAttributes: [
                'someOtherEvaluationAttribute1s',
                'someOtherEvaluationAttributes2',
              ],
              evaluationMethodology: 'someOtherEvaluationMethodology',
            },
          ],
          approvalCriteria: [
            {
              id: '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someApprovalContext',
              contextLink: 'someApprovalContextLink',
              approvalAttributes: [
                {
                  condition: 'someCondition1',
                  attribute: 'someApprovalAttribute1',
                },
                {
                  condition: 'someCondition2',
                  attribute: 'someApprovalAttribute2',
                },
              ],
            },
            {
              id: '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherApprovalContext',
              contextLink: 'someOtherApprovalContextLink',
              approvalAttributes: [
                { condition: 'someCondition', attribute: 'someAttribute' },
                { condition: 'someCondition', attribute: 'someAttribute' },
              ],
            },
          ],
          enrichments: [
            {
              id: '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEnrichmentContext',
              contextLink: 'someEnrichmentContextLink',
              resources: [
                { productId: 'someProductId1', resource: 'someOtherResource1' },
                { productId: 'someProductId1', resource: 'someOtherResource1' },
              ],
            },
            {
              id: '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '00000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEnrichmentContext',
              contextLink: 'someOtherEnrichmentContextLink',
              resources: [
                { productId: 'someProductId1', resource: 'someOtherResource1' },
                { productId: 'someProductId1', resource: 'someOtherResource1' },
              ],
            },
          ],
        },
        {
          id: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
          template: {
            id: '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
            entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
            templateId: 'someTemplateIdClaim2',
            title: 'someTitleClaim2',
            description: 'someDescriptionClaim2',
            isPrivate: true,
            minTargetClaims: 22,
            maxTargetClaims: 34,
            goal: 'someGoal2',
            submissionStartDate: 'someStartDateClaim2',
            submissionEndDate: 'someEndDateClaim2',
          },
          agentRoles: [
            {
              id: '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someRoleClaim2',
              credential: 'someCredentialClaim2',
              autoApprove: false,
            },
            {
              id: '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              role: 'someOtherRoleClaim2',
              credential: 'someOtherCredentialClaim2',
              autoApprove: true,
            },
          ],
          evaluations: [
            {
              id: '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEvaluationContextClaim2',
              contextLink: 'someEvaluationContextLinkClaim2',
              evaluationAttributes: ['someEvaluationAttributesClaim2'],
              evaluationMethodology: 'someEvaluationMethodologyClaim2',
            },
            {
              id: '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEvaluationContextClaim2',
              contextLink: 'someOtherEvaluationContextLinkClaim2',
              evaluationAttributes: [
                'someOtherEvaluationAttribute1sClaim2',
                'someOtherEvaluationAttributes2Claim2',
              ],
              evaluationMethodology: 'someOtherEvaluationMethodologyClaim2',
            },
          ],
          approvalCriteria: [
            {
              id: '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someApprovalContextClaim2',
              contextLink: 'someApprovalContextLinkClaim2',
              approvalAttributes: [
                {
                  condition: 'someCondition2',
                  attribute: 'someApprovalAttribute2',
                },
                {
                  condition: 'someCondition22',
                  attribute: 'someApprovalAttribute22',
                },
              ],
            },
            {
              id: '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherApprovalContextClaim2',
              contextLink: 'someOtherApprovalContextLinkClaim2',
              approvalAttributes: [
                {
                  condition: 'someCondition22',
                  attribute: 'someApprovalAttribute22',
                },
                {
                  condition: 'someCondition22',
                  attribute: 'someApprovalAttribute22',
                },
              ],
            },
          ],
          enrichments: [
            {
              id: '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someEnrichmentContextClaim2',
              contextLink: 'someEnrichmentContextLinkClaim2',
              resources: [
                { productId: 'someProductId', resource: 'someResource' },
                { productId: 'someProductId', resource: 'someResource' },
              ],
            },
            {
              id: '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              entityClaimId: '10000000-3b7d-4bad-9abc-2b0d7b3dcb6d',
              context: 'someOtherEnrichmentContexClaim2t',
              contextLink: 'someOtherEnrichmentContextLinkClaim2',
              resources: [
                { productId: 'someProductId', resource: 'someResource' },
                { productId: 'someProductId', resource: 'someResource' },
              ],
            },
          ],
        },
      ])
    })
  })

  describe('selectValidation', () => {
    it('should return the validation property', () => {
      // when ... we call the selector
      const result = SUT.selectValidation(state)

      // then ... should return result as expected
      expect(result).toEqual({
        '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
        '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          identifier: '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
          validated: false,
          errors: [],
        },
      })
    })
  })

  describe('selectValidationComplete', () => {
    it('should return false if not every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityClaims: {
          ...state.editEntityClaims,
          validation: {
            '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('should return true if every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityClaims: {
          ...state.editEntityClaims,
          validation: {
            '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectValidated', () => {
    it('should return false if any section has not completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityClaims: {
          ...state.editEntityClaims,
          validation: {
            '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })
    it('should return false if any section has not been validated successfully', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityClaims: {
          ...state.editEntityClaims,
          validation: {
            '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: false,
              errors: ['an error occured'],
            },
            '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: false,
              errors: ['an error occured'],
            },
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('should return true if every section has been validated successfully', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityClaims: {
          ...state.editEntityClaims,
          validation: {
            '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '00000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000001-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000002-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000003-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000004-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000005-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000006-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000007-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000008-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d': {
              identifier: '10000009-3b7d-4bad-9abc-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
})

import moment from 'moment'
import { EntityType } from '../../../../types/entities'
import * as SUT from './EntityImpact.selectors'

let state: any

beforeEach(() => {
  state = {
    selectedEntity: {
      did: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
      type: EntityType.Project,
      creatorDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
      status: 'CREATED',
      name: 'Some Title',
      description: 'Some Short Description',
      dateCreated: moment('2020-09-12T19:49:45Z'),
      creatorName: 'Creator Display Name',
      creatorLogo: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
      creatorMission: 'another mission',
      creatorWebsite: 'https://eerer.com',
      location: 'AR',
      image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
      logo: 'https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof',
      serviceProvidersCount: 10,
      serviceProvidersPendingCount: 2,
      evaluatorsCount: 10,
      evaluatorsPendingCount: 0,
      requiredClaimsCount: 23,
      pendingClaimsCount: 3,
      successfulClaimsCount: 10,
      rejectedClaimsCount: 5,
      agents: [],
      sdgs: ['5', '7'],
      bondDid: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
      content: null,
    } as any,
  }
})

describe('EntityImpact Selectors', () => {
  describe('selectRequiredClaimsCount', () => {
    it('should return the requiredClaimsCount property', () => {
      // when ... we call the selector
      const result = SUT.selectRequiredClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(23)
    })
  })

  describe('selectSuccessfulClaimsCount', () => {
    it('should return the successfulClaimsCount property', () => {
      // when ... we call the selector
      const result = SUT.selectSuccessfulClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(10)
    })
  })

  describe('selectPendingClaimsCount', () => {
    it('should return the pendingClaimsCount property', () => {
      // when ... we call the selector
      const result = SUT.selectPendingClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(3)
    })
  })

  describe('selectRejectedClaimsCount', () => {
    it('should return the rejectedClaimsCount property', () => {
      // when ... we call the selector
      const result = SUT.selectRejectedClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(5)
    })
  })

  describe('selectEvaluatorsCount', () => {
    it('should return the evaluatorsCount property', () => {
      // when ... we call the selector
      const result = SUT.selectEvaluatorsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(10)
    })
  })

  describe('selectEvaluatorsPendingCount', () => {
    it('should return the evaluatorsPendingCount property', () => {
      // when ... we call the selector
      const result = SUT.selectEvaluatorsPendingCount(state)

      // then ... should return result as expected
      expect(result).toEqual(0)
    })
  })

  describe('selectServiceProvidersCount', () => {
    it('should return the serviceProvidersCount property', () => {
      // when ... we call the selector
      const result = SUT.selectServiceProvidersCount(state)

      // then ... should return result as expected
      expect(result).toEqual(10)
    })
  })

  describe('selectServiceProvidersPendingCount', () => {
    it('should return the serviceProvidersPendingCount property', () => {
      // when ... we call the selector
      const result = SUT.selectServiceProvidersPendingCount(state)

      // then ... should return result as expected
      expect(result).toEqual(2)
    })
  })
})

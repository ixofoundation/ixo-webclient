import moment from 'moment'
import * as SUT from './selectedEntity.reducer'
import { GetEntitySuccessAction, SelectedEntityActions, ClearEntityAction, Entity } from './selectedEntity.types'
import { EntityType } from '../../modules/Entities/types'
import { AgentRole } from 'redux/account/account.types'

const initialState = SUT.initialState

describe('SelectedEntity Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GetEntitySuccess Action', () => {
    it('should return a new copy of state with the entity data set', () => {
      const entity: Entity = {
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
        goal: 'Some Goal',
        serviceProvidersCount: 10,
        serviceProvidersPendingCount: 2,
        evaluatorsCount: 10,
        evaluatorsPendingCount: 0,
        claimTemplateId: 'did:sov:BB1fV7PTbWG3aveDJZpgSn',
        requiredClaimsCount: 23,
        pendingClaimsCount: 3,
        successfulClaimsCount: 10,
        rejectedClaimsCount: 5,
        agents: [
          {
            did: 'did:ixo:CB1idAyvNUsSEktkT3a5LY',
            status: '0',
            role: AgentRole.ServiceProvider,
            kyc: false,
          },
          {
            did: 'did:ixo:NT1idAyvNUsSEktkT3a5LY',
            status: '0',
            role: AgentRole.Evaluator,
            kyc: false,
          },
        ],
        sdgs: ['5', '7'],
        bondDid: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
        content: null,
      } as any

      // given .. we have an action of type SelectedEntityActions.GetEntitySuccess and some data
      const action: GetEntitySuccessAction = {
        type: SelectedEntityActions.GetEntitySuccess,
        payload: entity,
      }

      // when... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual(entity)
    })
  })

  describe('ClearEntity Action', () => {
    it('should clear the entity', () => {
      const currentState: Entity = {
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
        goal: 'Some Goal',
        serviceProvidersCount: 10,
        serviceProvidersPendingCount: 2,
        evaluatorsCount: 10,
        evaluatorsPendingCount: 0,
        claimTemplateId: 'did:sov:BB1fV7PTbWG3aveDJZpgSn',
        requiredClaimsCount: 23,
        pendingClaimsCount: 3,
        successfulClaimsCount: 10,
        rejectedClaimsCount: 5,
        agents: [
          {
            did: 'did:ixo:CB1idAyvNUsSEktkT3a5LY',
            status: '0',
            role: AgentRole.ServiceProvider,
            kyc: false,
          },
          {
            did: 'did:ixo:NT1idAyvNUsSEktkT3a5LY',
            status: '0',
            role: AgentRole.Evaluator,
            kyc: false,
          },
        ],
        sdgs: ['5', '7'],
        bondDid: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
        content: null,
      } as any

      // given .. we have an action of type SelectedEntityActions.ClearEntity
      const action: ClearEntityAction = {
        type: SelectedEntityActions.ClearEntity,
      }

      // when... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual(null)
    })
  })
})

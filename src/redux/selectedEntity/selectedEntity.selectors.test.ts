import { AgentRole } from 'redux/account/account.types'
import moment from 'moment'
import { EntityType } from '../../modules/Entities/types'
import * as SUT from './selectedEntity.selectors'

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
    } as any,
  }
})

describe('SelectedEntity Selectors', () => {
  describe('selectSelectedEntity', () => {
    it('should return the selectedEntity property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectSelectedEntity(state)

      // then ... should return result as expected
      expect(result).toEqual(state.selectedEntity)
    })
  })

  describe('selectEntityDid', () => {
    it('should return the entity did', () => {
      // when ... we call the selector
      const result = SUT.selectEntityDid(state)

      // then ... should return the result as expected
      expect(result).toEqual('did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh')
    })
  })

  describe('selectEntityType', () => {
    it('should return the entity type', () => {
      // when ... we call the selector
      const result = SUT.selectEntityType(state)

      // then ... should return the result as expected
      expect(result).toEqual(EntityType.Project)
    })
  })

  describe('selectEntityName', () => {
    it('should return the entity name', () => {
      // when ... we call the selector
      const result = SUT.selectEntityName(state)

      // then ... should return the result as expected
      expect(result).toEqual('Some Title')
    })
  })

  describe('selectEntityDescription', () => {
    it('should return the entity description', () => {
      // when ... we call the selector
      const result = SUT.selectEntityDescription(state)

      // then ... should return the result as expected
      expect(result).toEqual('Some Short Description')
    })
  })

  describe('selectEntityCreator', () => {
    it('should return the entity creator', () => {
      // when ... we call the selector
      const result = SUT.selectEntityCreator(state)

      // then ... should return the result as expected
      expect(result).toEqual('did:sov:EA1fV7PTbWG3aveDJZpgSn')
    })
  })

  describe('selectEntityDateCreated', () => {
    it('should return the entity date created', () => {
      // when ... we call the selector
      const result = SUT.selectEntityDateCreated(state)

      // then ... should return the result as expected
      expect(result).toEqual(moment('2020-09-12T19:49:45Z'))
    })
  })

  describe('selectEntityCreatorName', () => {
    it('should return the creator name', () => {
      // when ... we call the selector
      const result = SUT.selectEntityCreatorName(state)

      // then ... should return the result as expected
      expect(result).toEqual('Creator Display Name')
    })
  })

  describe('selectEntityCreatorLogo', () => {
    it('should return the creator logo', () => {
      // when ... we call the selector
      const result = SUT.selectEntityCreatorLogo(state)

      // then ... should return the result as expected
      expect(result).toEqual('https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9')
    })
  })

  describe('selectEntityCreatorWebsite', () => {
    it('should return the creator logo', () => {
      // when ... we call the selector
      const result = SUT.selectEntityCreatorWebsite(state)

      // then ... should return the result as expected
      expect(result).toEqual('https://eerer.com')
    })
  })

  describe('selectEntityCreatorMission', () => {
    it('should return the creator mission', () => {
      // when ... we call the selector
      const result = SUT.selectEntityCreatorMission(state)

      // then ... should return the result as expected
      expect(result).toEqual('another mission')
    })
  })

  describe('selectEntityStatus', () => {
    it('should return the status', () => {
      // when ... we call the selector
      const result = SUT.selectEntityStatus(state)

      // then ... should return the result as expected
      expect(result).toEqual('CREATED')
    })
  })

  describe('selectEntityImage', () => {
    it('should return the image', () => {
      // when ... we call the selector
      const result = SUT.selectEntityImage(state)

      // then ... should return the result as expected
      expect(result).toEqual('https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc')
    })
  })

  describe('selectEntityLogo', () => {
    it('should return the logo', () => {
      // when ... we call the selector
      const result = SUT.selectEntityLogo(state)

      // then ... should return the result as expected
      expect(result).toEqual('https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof')
    })
  })

  describe('selectEntityLocation', () => {
    it('should return the location', () => {
      // when ... we call the selector
      const result = SUT.selectEntityLocation(state)

      // then ... should return the result as expected
      expect(result).toEqual('AR')
    })
  })

  describe('selectEntitySdgs', () => {
    it('should return the location', () => {
      // when ... we call the selector
      const result = SUT.selectEntitySdgs(state)

      // then ... should return the result as expected
      expect(result).toEqual(['5', '7'])
    })
  })

  describe('selectEntityBondDid', () => {
    it('should return the bondDid', () => {
      // when ... we call the selector
      const result = SUT.selectEntityBondDid(state)

      // then ... should return the result as expected
      expect(result).toEqual('did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz')
    })
  })

  describe('selectEntityAgents', () => {
    it('should return the agents', () => {
      // when ... we call the selector
      const result = SUT.selectEntityAgents(state)

      // then ... should return the result as expected
      expect(result).toEqual([
        {
          did: 'did:ixo:CB1idAyvNUsSEktkT3a5LY',
          status: '0',
          role: 'SA',
          kyc: false,
        },
        {
          did: 'did:ixo:NT1idAyvNUsSEktkT3a5LY',
          status: '0',
          role: 'EA',
          kyc: false,
        },
      ])
    })
  })

  describe('selectEntityClaimTemplateId', () => {
    it('should return the claim template id', () => {
      // when ... we call the selector
      const result = SUT.selectEntityClaimTemplateId(state)

      // then ... should return the result as expected
      expect(result).toEqual('did:sov:BB1fV7PTbWG3aveDJZpgSn')
    })
  })

  describe('entityIsLoading', () => {
    it('should return false if entity exists', () => {
      // when ... we call the selector
      const result = SUT.entityIsLoading(state)

      // then ... should return the result as expected
      expect(result).toEqual(false)
    })
  })
})

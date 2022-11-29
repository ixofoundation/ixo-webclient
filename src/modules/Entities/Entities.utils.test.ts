import { AgentRole } from 'redux/account/account.types'
import * as SUT from './Entities.utils'

describe('Entities Utils', () => {
  describe('isUserInRolesOfEntity', () => {
    it('should return true if the user is the creator', () => {
      // given ... some parameters
      const userDid = 'theUser'
      const creatorDid = 'theUser'
      const agents: any[] = []
      const roles = [AgentRole.Owner]
      // when ... we call the function
      const result = SUT.isUserInRolesOfEntity(userDid, creatorDid, agents, roles)
      // then ... it should return true
      expect(result).toEqual(true)
    })

    it('should return true if the user is not the creator nor an agent', () => {
      // given ... some parameters
      const userDid = 'theUser'
      const creatorDid = 'theCreator'
      const agents: any[] = []
      const roles = [AgentRole.Owner]
      // when ... we call the function
      const result = SUT.isUserInRolesOfEntity(userDid, creatorDid, agents, roles)
      // then ... it should return false
      expect(result).toEqual(false)
    })

    it('should return true if the user is of role', () => {
      // given ... some parameters
      const userDid = 'theUser'
      const creatorDid = 'theCreator'
      const agents = [
        {
          status: 'anything',
          kyc: false,
          did: 'theUser',
          role: AgentRole.ServiceProvider,
        },
        {
          status: 'anything',
          kyc: false,
          did: 'anotherUser',
          role: AgentRole.Investor,
        },
      ]
      const roles = [AgentRole.ServiceProvider]
      // when ... we call the function
      const result = SUT.isUserInRolesOfEntity(userDid, creatorDid, agents, roles)
      // then ... it should return true
      expect(result).toEqual(true)
    })

    it('should return true if the user is not of role', () => {
      // given ... some parameters
      const userDid = 'theUser'
      const creatorDid = 'theCreator'
      const agents = [
        {
          status: 'anything',
          kyc: false,
          did: 'theUser',
          role: AgentRole.Evaluator,
        },
        {
          status: 'anything',
          kyc: false,
          did: 'anotherUser',
          role: AgentRole.Investor,
        },
      ]
      const roles = [AgentRole.ServiceProvider]
      // when ... we call the function
      const result = SUT.isUserInRolesOfEntity(userDid, creatorDid, agents, roles)
      // then ... it should return false
      expect(result).toEqual(false)
    })

    it('should return false if the user is not an agent', () => {
      // given ... some parameters
      const userDid = 'theUser'
      const creatorDid = 'theCreator'
      const agents = [
        {
          status: 'anything',
          kyc: false,
          did: 'anotherUser',
          role: AgentRole.Investor,
        },
      ]
      const roles = [AgentRole.ServiceProvider, AgentRole.Evaluator, AgentRole.Investor, AgentRole.Owner]
      // when ... we call the function
      const result = SUT.isUserInRolesOfEntity(userDid, creatorDid, agents, roles)
      // then ... it should return false
      expect(result).toEqual(false)
    })
  })
})

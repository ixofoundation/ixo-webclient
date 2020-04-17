import { Dispatch } from 'redux'
import { ProjectsActions, GetProjectsAction } from './types'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'

export const getProjects = () => (dispatch: Dispatch): GetProjectsAction => {
  return dispatch({
    type: ProjectsActions.GetProjects,
    payload: {
      projects: blocksyncApi.project.listProjects().then(response => {
        return response.map(project => {
          const {
            projectDid,
            status,
            data: {
              title,
              shortDescription,
              longDescription,
              ownerName,
              createdOn: dateCreated,
              projectLocation: country,
              impactAction,
              agentStats: {
                serviceProviders: serviceProvidersCount,
                evaluators: evaluatorsCount,
                requiredClaims: requiredClaimsCount,
              },
              claimStats: {
                currentSuccessful: successfulClaimsCount,
                currentRejected: rejectedClaimsCount,
              },
              sdgs,
            },
          } = project

          return {
            projectDid,
            title,
            shortDescription,
            longDescription,
            dateCreated,
            ownerName,
            status,
            country,
            impactAction,
            serviceProvidersCount,
            evaluatorsCount,
            requiredClaimsCount,
            successfulClaimsCount,
            rejectedClaimsCount,
            sdgs,
          }
        })
      }),
    },
  })
}

/*
          const {
            projectDid,
            status,
            data: {
              title,
              shortDescription,
              longDescription,
              ownerName,
              createdOn: dateCreated,
              projectLocation: country,
              impactAction,
              agentStats: {
                serviceProviders: serviceProvidersCount,
                evaluators: evaluatorsCount,
                requiredClaims: requiredClaimsCount,
              },
              claimStats: {
                currentSuccessful: successfulClaimsCount,
                currentRejected: rejectedClaimsCount,
              },
              sdgs,
            },
          } = project

          return {
            projectDid,
            title,
            shortDescription,
            longDescription,
            dateCreated,
            ownerName,
            status,
            country,
            impactAction,
            serviceProvidersCount,
            evaluatorsCount,
            requiredClaimsCount,
            successfulClaimsCount,
            rejectedClaimsCount,
            sdgs,
          }
*/

/*
[{
    "data": {
        "claimStats": {
            "currentSuccessful": 0,
            "currentRejected": 0
        },
        "templates": {
            "claim": {
                "schema": "btxkiiynt1sk8ss9623",
                "form": "u0sepz71wwnk8ss9628"
            }
        },
        "agentStats": {
            "evaluators": 0,
            "evaluatorsPending": 0,
            "serviceProviders": 0,
            "serviceProvidersPending": 0,
            "investors": 0,
            "investorsPending": 0
        },
        "socialMedia": {
            "facebookLink": "",
            "instagramLink": "",
            "twitterLink": "",
            "webLink": ""
        },
        "ixo": {
            "totalStaked": 0,
            "totalUsed": 0
        },
        "founder": {
            "name": "",
            "email": "",
            "countryOfOrigin": "",
            "shortDescription": "",
            "websiteURL": "",
            "logoLink": ""
        },
        "sdgs": [3, 11],
        "title": "Multi-cultural Walking Tours",
        "ownerName": "WEDO GLOBAL",
        "ownerEmail": "info@wedoglobal.com",
        "shortDescription": "A social enterprise that offers multicultural education and opportunities for cultural interactions that build understanding and tolerance between people from diverse backgrounds in Hong Kong.",
        "longDescription": "WEDO aims to enhance cultural understanding of local Chinese about ethnic minorities in Hong Kong. This helps reduce intolerance and racial discrimination against ethnic minorities. We provide training opportunities for under-presented ethnic minorities. After training, participants have the opportunity to be recruited as cultural ambassadors who conduct multi-cultural workshops and theme-based community walking tours. This increases their job opportunities, confidence, knowledge and skills. Through this project, cultural ambassasors will offer cultural interactions in the format of walking tours. Given the current risk of exposure to Coronavirus, tour participants will also be provided with protective face-masks and informed about hygiene measures to reduce the spread of infections.",
        "impactAction": "Cultural Tour Participation",
        "projectLocation": "",
        "requiredClaims": 100,
        "autoApprove": ["SA"],
        "evaluatorPayPerClaim": "15",
        "serviceEndpoint": "https://pds_pandora.ixo.world/",
        "imageLink": "smsal67t2pgk8ss96ss",
        "createdOn": "2020-04-09T13:14:13.000Z",
        "createdBy": "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
        "nodeDid": "did:ixo:Sdjhti1ywgWgQJqtgYrGzJ",
        "claims": [],
        "agents": []
    },
    "_id": "5e8f1fa7926c2d002387e197",
    "txHash": "4acd444e3b2c0646899f2285a23f54fd35d84b89d667b438e5a807eafd23e80a",
    "senderDid": "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
    "projectDid": "did:ixo:W35a7GUaAAfBoCaWfSQwbJ",
    "pubKey": "Gpt3xojUcXoRBqDTmZrm2pJgbZoZ2nSxNieVqKTX5zPe",
    "__v": 0,
    "status": "CREATED"
}]
*/

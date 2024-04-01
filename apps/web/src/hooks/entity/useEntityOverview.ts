import { useEntityQuery } from "generated/graphql"
import { updateEntityAction } from "redux/entitiesExplorer/entitiesExplorer.actions"
import { getEntityById } from "redux/entitiesExplorer/entitiesExplorer.selectors"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { getCredentialSubject, getEntityProfile, getPage } from "services/entities"

export const useEntityOverview = (did: string) => {
    const entity = useAppSelector(getEntityById(did))
    const dispatch = useAppDispatch()

    const { refetch } = useEntityQuery({
        variables: { id: did }, onCompleted: async (data) => {
            console.log({ entity: data.entity })
            if (data.entity?.service && data.entity.settings) {
                const page = await getPage({ service: data.entity.service, setting: data.entity.settings["Page"] })
                const profile = await getEntityProfile(data.entity.settings["Profile"], data.entity.service)
                const creatorResource = data.entity.linkedResource.find((resource: any) => resource.id === "{id}#creator")
                const creator = await getCredentialSubject({resource: creatorResource, service: data.entity.service })


                dispatch(updateEntityAction({ ...data.entity, ...entity, ...page, profile, creator }))
            }
        }
    })

    return { ...entity, refetch }
}
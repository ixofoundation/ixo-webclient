import useCurrentEntity from "hooks/currentEntity"
import { useEffect } from "react"
import { updateEntityResourceAction } from "redux/currentEntity/currentEntity.actions"
import { getPage } from "services/entities/getPage"

export function useCurrentEntityPage() {
    const { page, pageLegacy, settings, service } = useCurrentEntity()

    useEffect(() => {
        if (!page && !pageLegacy) {
            getPage({ setting: settings?.Page, service }).then(result => {
                if (!result) return
                if ("page" in result) {
                    updateEntityResourceAction({ key: "page", data: result["page"], merge: false })
                }
                if ("pageLegacy" in result) {
                    updateEntityResourceAction({ key: "pageLegacy", data: result["pageLegacy"], merge: false })
                }
            })
        }
    }, [page, pageLegacy, service, settings?.Page])

    // const updateEntityPage = () => {
        
    // }

    return { page, pageLegacy }
}
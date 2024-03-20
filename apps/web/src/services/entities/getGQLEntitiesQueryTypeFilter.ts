import { EntityFilter } from "generated/graphql";


export const getGQLEntitiesQueryTypeFilter = (type: string): EntityFilter["type"] => {
    if (type === "protocol") {
        return {
            in: ["protocol", "protocol/deed", "protocol/claim", "protocol/impact", "deed", "deed/offer"]
        }
    }

    return {
        includesInsensitive: type
    }
}
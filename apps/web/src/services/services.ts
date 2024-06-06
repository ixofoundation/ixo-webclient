import { customQueries, utils } from "@ixo/impactxclient-sdk"
import { Service } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { CellnodePublicResource, CellnodeWeb3Resource } from "@ixo/impactxclient-sdk/types/custom_queries/cellnode"
import { chainNetwork } from "hooks/configs"
import { NodeType } from "types/entities"

export const uploadToService = async (
    data: string,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource> => {
    let res: CellnodePublicResource | CellnodeWeb3Resource
    if (service.type === NodeType.CellNode && service.serviceEndpoint) {
      res = await customQueries.cellnode.uploadPublicDoc('application/ld+json', data, undefined, chainNetwork)
    } else {
      res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        data,
        undefined,
        chainNetwork,
      )
    }
    return res
  }
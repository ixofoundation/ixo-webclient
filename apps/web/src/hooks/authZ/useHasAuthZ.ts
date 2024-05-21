import { useWallet } from "@ixo-webclient/wallet-connector"
import { TYPE_URL_GENERIC_AUTHORIZATION } from "components/Modals/AddActionModal/SetupAuthzGrantModal"
import { RPC_ENDPOINT } from "lib/protocol"
import { getQueryClient } from "lib/queryClient"
import { useEffect, useState } from "react"

export const useHasAuthZ = ({ admin, messageType }: { admin: string, messageType?: string }) => {
    const [hasAuthZ, setHasAuthZ] = useState<boolean>(false)
    const { wallet } = useWallet()

    useEffect(() => {
      const checkAuthZ = async () => {
        const queryClient = await getQueryClient(RPC_ENDPOINT)
        const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
          grantee: wallet?.address ?? '',
        })

        const evaluateAuth = granteeGrants.grants.find(
          (g) => (g.authorization?.typeUrl === (messageType ?? TYPE_URL_GENERIC_AUTHORIZATION)) && g.granter === admin,
        )
    
        if (evaluateAuth === undefined) return false
        return true
  }
        checkAuthZ().then((result) => setHasAuthZ(result))
    }, [])
    
    return hasAuthZ
}
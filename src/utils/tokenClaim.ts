import { Claim } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'

/**
 * Determines whether a claim is available based on its release date.
 * By comparing the current time with the release time specified in claim.release_at, the function provides a clear indication of whether the claim is currently claimable or still in the unbonding period.
 * @param claim - The claim object containing information about the claim and its release conditions.
 * @param blockHeight - The current block height used for comparison with the release conditions.
 * @returns A boolean indicating whether the claim is available.
 */
export function claimAvailable(claim: Claim, blockHeight: number) {
  if ('at_height' in claim.release_at) {
    return blockHeight >= claim.release_at.at_height
  } else if ('at_time' in claim.release_at) {
    const currentTimeNs = new Date().getTime() * 1000000
    return currentTimeNs >= Number(claim.release_at.at_time)
  }

  // Unreachable.
  return false
}

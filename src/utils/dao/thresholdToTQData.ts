import { Threshold } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { UpdateProposalConfigData } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'

export const thresholdToTQData = (
  source: Threshold,
): Pick<
  UpdateProposalConfigData,
  'thresholdType' | 'thresholdPercentage' | 'quorumEnabled' | 'quorumType' | 'quorumPercentage'
> & { absoluteThresholdCount?: string } => {
  let thresholdType: UpdateProposalConfigData['thresholdType'] = 'majority'
  let thresholdPercentage: UpdateProposalConfigData['thresholdPercentage'] = undefined
  let quorumEnabled = true
  let quorumType: UpdateProposalConfigData['quorumType'] = '%'
  let quorumPercentage: UpdateProposalConfigData['quorumPercentage'] = 20
  let absoluteThresholdCount: string | undefined = undefined

  if ('threshold_quorum' in source) {
    const { threshold, quorum } = source.threshold_quorum

    thresholdType = 'majority' in threshold ? 'majority' : '%'
    thresholdPercentage = 'majority' in threshold ? undefined : Number(threshold.percent) * 100

    quorumType = 'majority' in quorum ? 'majority' : '%'
    quorumPercentage = 'majority' in quorum ? undefined : Number(quorum.percent) * 100

    quorumEnabled = true
  } else if ('absolute_percentage' in source) {
    const { percentage } = source.absolute_percentage

    thresholdType = 'majority' in percentage ? 'majority' : '%'
    thresholdPercentage = 'majority' in percentage ? undefined : Number(percentage.percent) * 100

    quorumEnabled = false
  } else if ('absolute_count' in source) {
    const { threshold } = source.absolute_count
    absoluteThresholdCount = threshold
  }

  return {
    thresholdType,
    thresholdPercentage,
    quorumEnabled,
    quorumType,
    quorumPercentage,
    absoluteThresholdCount,
  }
}

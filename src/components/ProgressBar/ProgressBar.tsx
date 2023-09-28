import { Successful, Bar, Pending, Rejected, Disputed } from './ProgressBar.styles'

export interface Props {
  total: number
  approved: number
  rejected: number
  pending?: number
  disputed?: number
  height?: number
  activeBarColor?: string
  barColor?: string
  closedText?: string
  radius?: string
}

export const ProgressBar: React.FunctionComponent<Props> = ({
  total,
  approved,
  rejected,
  pending = 0,
  disputed = 0,
  activeBarColor,
  barColor,
  height = 6,
  closedText = '',
  radius,
}) => {
  const pendingWidth = (pending / total) * 100
  const approvedWidth = (approved / total) * 100
  const rejectedWidth = (rejected / total) * 100
  const disputedWidth = (disputed / total) * 100

  return (
    <Bar height={height} barColor={barColor} borderRadius={radius}>
      <Successful style={{ width: approvedWidth + '%' }} barColor={activeBarColor} borderRadius='none' />
      <Pending style={{ width: pendingWidth + '%' }} borderRadius='none' />
      <Rejected style={{ width: rejectedWidth + '%' }} borderRadius='none' />
      <Disputed style={{ width: disputedWidth + '%' }} borderRadius='none' />
      {rejected === 0 && (
        <small className='pl-2 justify-content-start align-items-center d-flex position-absolute w-100 h-100'>
          {closedText}
        </small>
      )}
    </Bar>
  )
}

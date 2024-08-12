import { rem } from '@mantine/core'

interface DaoIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string
}

export function IxoCoinIcon({ size = 24, style, ...others }: DaoIconProps) {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: rem(size), height: rem(size), ...style }}
    >
      <circle cx='14' cy='14' r='13.5' fill='#033B56' stroke='#00D2FF' />
      <rect x='6.00342' y='6.00342' width='15.9932' height='15.9932' stroke='#00D2FF' strokeWidth='0.00684932' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.0364 10.0349L10.0181 6H5.99997V10.0349L10.0181 14.0001L5.99997 18.0348V22H10.0181L14.0364 18.0348L17.9816 22H22V18.0348L17.9816 14.0001L22 10.0349V6H17.9816L14.0364 10.0349Z'
        fill='#00D2FF'
      />
    </svg>
  )
}

import { rem } from '@mantine/core'

interface InvestmentIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string
}

export function InvestmentIcon({ size = 24, style, ...others }: InvestmentIconProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.7198 11.9998C21.7198 17.3685 17.3685 21.7198 11.9998 21.7198C6.63111 21.7198 2.27979 17.3685 2.27979 11.9998C2.27979 6.63111 6.63111 2.27979 11.9998 2.27979C17.3685 2.27979 21.7198 6.63111 21.7198 11.9998ZM19.9524 11.9998C19.9524 7.61445 16.3851 4.04721 11.9998 4.04721C7.61445 4.04721 4.04721 7.61445 4.04721 11.9998H19.9524Z'
        fill={others.fill ?? 'currentColor'}
      />
    </svg>
  )
}

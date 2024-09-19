import { rem } from '@mantine/core'

interface AssetIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string
}

export function AssetIcon({ size = 24, style, ...others }: AssetIconProps) {
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
        d='M11.3599 6.37352L6.37456 11.3589C6.0206 11.7128 6.0206 12.2867 6.37456 12.6407L11.3599 17.6261C11.7139 17.98 12.2878 17.98 12.6417 17.6261L17.6271 12.6407C17.981 12.2867 17.981 11.7128 17.6271 11.3589L12.6417 6.37352C12.2878 6.01957 11.7139 6.01957 11.3599 6.37352ZM12.0008 15.7034L8.29723 11.9998L12.0008 8.29619L15.7044 11.9998L12.0008 15.7034Z'
        fill={others.fill ?? 'currentColor'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.02979 11.9998C2.02979 6.49302 6.49302 2.02979 11.9998 2.02979C17.5065 2.02979 21.9698 6.49302 21.9698 11.9998C21.9698 17.5065 17.5065 21.9698 11.9998 21.9698C6.49302 21.9698 2.02979 17.5065 2.02979 11.9998ZM20.3081 11.9998C20.3081 7.41857 16.581 3.69145 11.9998 3.69145C7.41857 3.69145 3.69145 7.41857 3.69145 11.9998C3.69145 16.581 7.41857 20.3081 11.9998 20.3081C16.581 20.3081 20.3081 16.581 20.3081 11.9998Z'
        fill={others.fill ?? 'currentColor'}
      />
    </svg>
  )
}

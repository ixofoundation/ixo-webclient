import { rem } from '@mantine/core'

interface ProjectIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string
}

export function ProjectIcon({ size = 24, style, ...others }: ProjectIconProps) {
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
        d='M16.8601 12.0002C16.8601 14.6843 14.6843 16.8601 12.0002 16.8601C9.3161 16.8601 7.14023 14.6843 7.14023 12.0002C7.14023 9.3161 9.3161 7.14023 12.0002 7.14023C14.6843 7.14023 16.8601 9.3161 16.8601 12.0002Z'
        fill={others.fill ?? 'currentColor'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.28027 12.0002C2.28027 6.63155 6.63155 2.28027 12.0002 2.28027C17.3688 2.28027 21.7201 6.63155 21.7201 12.0002C21.7201 17.3688 17.3688 21.7201 12.0002 21.7201C6.63155 21.7201 2.28027 17.3688 2.28027 12.0002ZM19.9527 12.0002C19.9527 7.61488 16.3855 4.04768 12.0002 4.04768C7.61488 4.04768 4.04768 7.61488 4.04768 12.0002C4.04768 16.3855 7.61488 19.9527 12.0002 19.9527C16.3855 19.9527 19.9527 16.3855 19.9527 12.0002Z'
        fill={others.fill ?? 'currentColor'}
      />
    </svg>
  )
}

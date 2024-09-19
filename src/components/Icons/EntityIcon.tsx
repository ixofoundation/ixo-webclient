import { rem } from '@mantine/core'

interface DaoIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string
}

export function EntityIcon({ size = 24, style, ...others }: DaoIconProps) {
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
        d='M2.28027 12.0002C2.28027 6.63155 6.63155 2.28027 12.0002 2.28027C17.3688 2.28027 21.7201 6.63155 21.7201 12.0002C21.7201 17.3688 17.3688 21.7201 12.0002 21.7201C6.63155 21.7201 2.28027 17.3688 2.28027 12.0002ZM19.9527 12.0002C19.9527 7.61488 16.3855 4.04768 12.0002 4.04768C7.61488 4.04768 4.04768 7.61488 4.04768 12.0002C4.04768 16.3855 7.61488 19.9527 12.0002 19.9527C16.3855 19.9527 19.9527 16.3855 19.9527 12.0002Z'
        fill={others.fill || 'currentColor'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 8.8499C10.2603 8.8499 8.85 10.2602 8.85 11.9999C8.85 13.7396 10.2603 15.1499 12 15.1499C13.7397 15.1499 15.15 13.7396 15.15 11.9999C15.15 10.2602 13.7397 8.8499 12 8.8499ZM7.15 11.9999C7.15 9.32132 9.32142 7.1499 12 7.1499C14.6786 7.1499 16.85 9.32132 16.85 11.9999C16.85 14.6785 14.6786 16.8499 12 16.8499C9.32142 16.8499 7.15 14.6785 7.15 11.9999Z'
        fill={others.fill || 'currentColor'}
      />
    </svg>
  )
}

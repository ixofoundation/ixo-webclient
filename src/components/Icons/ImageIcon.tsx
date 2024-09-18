import { rem } from '@mantine/core'

interface ImageIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string
}

export function ImageIcon({ size = 24, style, ...others }: ImageIconProps) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path
        d='M6.77778 25.8667H24.8889C26.4167 25.8667 27.6667 24.6167 27.6667 23.0889V8.64448C27.6667 7.1167 26.4167 5.8667 24.8889 5.8667H6.77778C5.25 5.8667 4 7.1167 4 8.64448V23.0889C4 24.6167 5.25 25.8667 6.77778 25.8667ZM6.22222 23.0889V19.2278L13.1667 14.7L21.6944 23.6445H6.77778C6.47222 23.6445 6.22222 23.3945 6.22222 23.0889ZM24.8889 23.6445H24.75L18.6111 17.2L21.1389 14.8111L25.4444 18.95V23.0889C25.4444 23.3945 25.1944 23.6445 24.8889 23.6445ZM6.77778 8.08892H24.8889C25.1944 8.08892 25.4444 8.33892 25.4444 8.64448V15.8667L21.9167 12.45C21.5 12.0334 20.8056 12.0334 20.3889 12.45L17.0833 15.5889L14.1389 12.5056C13.7778 12.1167 13.1667 12.0611 12.7222 12.3389L6.22222 16.5611V8.64448C6.22222 8.33892 6.47222 8.08892 6.77778 8.08892Z'
        fill={others.fill || 'currentColor'}
      />
    </svg>
  )
}

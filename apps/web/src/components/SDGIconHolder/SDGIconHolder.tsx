import { Box, BoxProps } from '@mantine/core'
import classes from './SDGIconHolder.module.css'

interface SDGSelectionButtonProps extends BoxProps {
  selected?: boolean
  bgColor: string
  icon: React.ReactNode
}

export function SDGIconHolder({ selected, bgColor, icon, className, ...props }: SDGSelectionButtonProps) {
  return (
    <Box
      className={`${classes.button} ${selected ? classes.selected : ''} ${className || ''}`}
      style={
        {
          '--bg-color': bgColor,
          '--bg-color-selected': `${bgColor}AA`,
        } as React.CSSProperties
      }
      {...props}
    >
      {icon}
    </Box>
  )
}

// AmountInput.styles.tsx
import { createStyles } from '@mantine/emotion'

export const useAmountInputStyles = createStyles(
  (theme, { disabled, error }: { disabled?: boolean; error?: boolean }) => ({
    amountInputWrapper: {
      position: 'relative',
      background: '#03324A',
      border: `1px solid ${error ? '#CD1C33' : theme.colors.ixoNewBlue}`,
      borderRadius: '4px',
      width: '100%',
      ...(disabled && { border: '1px solid transparent' }),
    },
    iconWrapper: {
      width: '25px',
      height: '25px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px',
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
    },
    input: {
      fontFamily: theme.fontFamily,
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '22px',
      color: '#FFFFFF',
      padding: '15px',
      margin: '0px !important',
      width: '100%',
      background: 'none',
      border: 'none',
      height: '50px',
      borderRadius: 'unset',
      '&:focus-visible': {
        outline: 'none',
      },
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '&::placeholder': {
        color: '#537B8E',
      },
    },
    memoInput: {
      fontFamily: theme.fontFamily,
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '22px',
      color: '#FFFFFF',
      padding: '15px',
      margin: '0px !important',
      width: '100%',
      background: '#FFFFFF88',
      border: 'none',
      height: '50px',
      borderRadius: 'unset',
      '&:focus-visible': {
        outline: 'none',
      },
      '&::placeholder': {
        color: '#537B8E',
      },
    },
    displayWrapper: {
      fontFamily: theme.fontFamily,
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '22px',
      color: '#FFFFFF',
      padding: '15px',
      margin: '0px !important',
      background: 'none',
      border: 'none',
      height: '50px',
      borderRadius: 'unset',
      '& > span': {
        fontWeight: 200,
        fontStyle: 'italic',
      },
    },
  }),
)

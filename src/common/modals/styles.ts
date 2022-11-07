import styled, {
  css,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components'
import { Input } from 'pages/CreateEntity/components'
import { Typography } from 'modules/App/App.styles'

const activeButtonCSS = css`
  background: ${(props): string => props.theme.ixoNewBlue};
  color: ${(props): string => props.theme.ixoWhite};
`

export const ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: '100',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    maxHeight: '90vh',
    maxWidth: '90vw',
    padding: 40,
    background: '#FFFFFF',
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: '8px',
    position: 'relative',
    width: 'fit-content',
  },
}

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  & > svg > rect {
    fill: ${(props): string => props.theme.ixoBlack};
  }
`

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ModalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const ModalInput = styled(Input)`
  font-weight: 500;
  &::placeholder {
    color: ${(props): string => props.theme.ixoMediumGrey};
  }
`

export const ModalTitle = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: ${(props): string => props.theme.ixoBlack};
  margin-bottom: 10px;
`

export const SelectionButton = styled.div<{ selected?: boolean }>`
  width: 140px;
  min-height: 36px;
  padding: 5px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: ${(props): string => props.theme.ixoBlack};
  background: ${(props): string => props.theme.ixoWhite};
  transition: all 0.2s;
  cursor: pointer;

  ${(props): FlattenInterpolation<ThemeProps<any>> =>
    props.selected && activeButtonCSS}

  &:hover {
    ${activeButtonCSS}
  }
`

export const SDGSelectionButton = styled.div<{
  selected?: boolean
  bgColor: string
}>`
  width: 142px;
  height: 120px;
  border-radius: 8px;
  background: ${(props): string =>
    props.selected ? props.bgColor + 'AA' : props.theme.ixoLightGrey2};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  & > i {
    color: white;
    font-size: 50px;
  }

  &:hover {
    background: ${(props): string => props.bgColor + 'AA'};
  }
`

import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  letter-spacing: 0.3px;
`

export const PageRow = styled.div`
  display: flex;
`

export const PropertyBoxWrapper = styled.div`
  position: relative;

  & .remove {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: ${(props): string => props.theme.ixoWhite};
    background: ${(props): string => props.theme.ixoGrey300};

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 30px;
    font-weight: 500;

    &:hover {
      background: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`

export const PropertyBox = styled.div<{
  bgColor?: string
  size?: number
}>`
  border-radius: 8px;
  width: ${(props): number => props.size ?? 110}px;
  height: ${(props): number => props.size ?? 110}px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;

  background: ${(props): string => props.bgColor ?? props.theme.ixoGrey700};
  transition: all 0.2s;
  cursor: pointer;

  & > svg {
    width: 42px;
    height: 42px;
  }

  & > span {
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
  }

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`

export const Badge = styled.div<{ $active: boolean }>`
  border-radius: 9999px;
  padding: 5px 10px;
  background: ${(props): string => (props.$active ? props.theme.ixoNewBlue : props.theme.ixoDarkBlue)};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`

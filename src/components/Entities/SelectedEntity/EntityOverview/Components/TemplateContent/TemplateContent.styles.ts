import styled from 'styled-components'

export const Container = styled.div``

export const AdditionalInfoList = styled.dl`
  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 18px;
`

export const AdditionalInfoRow = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: ${(props): string => props.direction ?? 'row'};
`

export const AdditionalInfoTitle = styled.dt`
  font-weight: 700;
`

export const AdditionalInfoContent = styled.dd`
  font-weight: 400;
`

export const AdditionalFilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  font-size: 14px;

  ${AdditionalInfoRow} {
    margin-right: 20px;
  }
`

export const IconWrapper = styled.div<{ collapsed?: boolean }>`
  display: inline-block;
  margin-left: 10px;

  svg {
    ${(props): string => (props.collapsed && 'transform: rotateZ(-90deg);') || ''}
    transition: all .2s;
    cursor: pointer;
  }

  svg > path {
    fill: #000000;
  }
`

export const SDGList = styled.div`
  display: flex;
  gap: 20px;

  margin-bottom: 20px;
`

export const SDGIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: white;
  padding: 1rem;
  background: #db6169;
  width: 100px;
  height: 100px;
  text-align: center;

  span {
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-size: 10px;
    line-height: 100%;
  }
  img {
    width: 40px;
    height: 40px;
  }

  &:nth-child(2) {
    background: #e0bb72;
  }
  &:nth-child(3) {
    background: #81b276;
  }
  &:nth-child(4) {
    background: #c75d61;
  }
  &:nth-child(5) {
    background: #e17161;
  }
  &:nth-child(6) {
    background: #7dcae9;
  }
  &:nth-child(7) {
    background: #f6d16c;
  }
  &:nth-child(8) {
    background: #aa566b;
  }
  &:nth-child(9) {
    background: #e78f66;
  }
  &:nth-child(10) {
    background: #d75d87;
  }
  &:nth-child(11) {
    background: #eeb36d;
  }
  &:nth-child(12) {
    background: #c7a768;
  }
  &:nth-child(13) {
    background: #739771;
  }
  &:nth-child(14) {
    background: #6eabd7;
  }
  &:nth-child(15) {
    background: #5d88b0;
  }
  &:nth-child(16) {
    background: #5d88b0;
  }
  &:nth-child(17) {
    background: #e0bb72;
  }
  &:nth-child(18) {
    background: #81b276;
  }
  &:nth-child(19) {
    background: #c75d61;
  }
  &:nth-child(20) {
    background: #e17161;
  }
  &:nth-child(21) {
    background: #7dcae9;
  }
  &:nth-child(22) {
    background: #f6d16c;
  }
  &:nth-child(23) {
    background: #aa566b;
  }
  &:nth-child(24) {
    background: #e78f66;
  }
  &:nth-child(25) {
    background: #d75d87;
  }
  &:nth-child(26) {
    background: #eeb36d;
  }
  &:nth-child(27) {
    background: #c7a768;
  }
  &:nth-child(28) {
    background: #739771;
  }
  &:nth-child(29) {
    background: #6eabd7;
  }
  &:nth-child(30) {
    background: #5d88b0;
  }
  &:nth-child(31) {
    background: #5d88b0;
  }
  &:nth-child(32) {
    background: #e0bb72;
  }
  &:nth-child(33) {
    background: #81b276;
  }
  &:nth-child(34) {
    background: #c75d61;
  }
  &:nth-child(35) {
    background: #e17161;
  }
  &:nth-child(36) {
    background: #7dcae9;
  }
  &:nth-child(37) {
    background: #f6d16c;
  }
  &:nth-child(38) {
    background: #aa566b;
  }
  &:nth-child(39) {
    background: #e78f66;
  }
  &:nth-child(40) {
    background: #d75d87;
  }
  &:nth-child(41) {
    background: #eeb36d;
  }
  &:nth-child(42) {
    background: #c7a768;
  }
  &:nth-child(43) {
    background: #739771;
  }
  &:nth-child(44) {
    background: #6eabd7;
  }
  &:nth-child(45) {
    background: #5d88b0;
  }
  &:nth-child(46) {
    background: #5d88b0;
  }
  &:nth-child(47) {
    background: #e0bb72;
  }
  &:nth-child(48) {
    background: #81b276;
  }
  &:nth-child(49) {
    background: #c75d61;
  }
  &:nth-child(50) {
    background: #e17161;
  }
`

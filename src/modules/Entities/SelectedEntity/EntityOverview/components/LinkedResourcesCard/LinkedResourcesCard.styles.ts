import styled from 'styled-components'

export const Resource = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: #F8F9FD;
  border-radius: 5px;
  height: 100%;
  margin-bottom: 0.75rem;
  cursor: pointer;
`

export const ResourceContainer = styled.div`
  width: 25%;
  padding: 0 0.75rem;
  height: 100%;
`

export const Resources = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const IconWrapper = styled.div<{color: string}>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  background: ${({color}) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
`

export const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #122045;
`

export const Description = styled.div`
  font-weight: normal;
  font-size: 12px;
  color: #7D8498;
`
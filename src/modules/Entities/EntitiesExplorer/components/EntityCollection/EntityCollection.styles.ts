import styled from 'styled-components'

export const EntityCollectionRow = styled.div``

export const EntityCollectionCol = styled.div`
  padding: 0px 0.5rem;

  ul {
    color: #828e94;
    padding-left: 30px;
  }
`

export const EntityCollectionImage = styled.div`
  border-radius: 8px;

  & > img {
    width: 100%;
    height: 190px;
  }
`

export const EntityCollectionContext = styled.div``

export const EntityCollectionMetrics = styled.div``

export const EntityCollectionAttributes = styled.div``

export const EntityCollectionText = styled.span<{
  fontSize?: string
  fontWeight?: number
  lineHeight?: string
  color?: string
}>`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-size: ${(props): string => props.fontSize ?? '13px'};
  font-weight: ${(props): number => props.fontWeight ?? 400};
  line-height: ${(props): string => props.lineHeight ?? '15px'};
  color: ${(props): string => props.color ?? '#828E94'};
`

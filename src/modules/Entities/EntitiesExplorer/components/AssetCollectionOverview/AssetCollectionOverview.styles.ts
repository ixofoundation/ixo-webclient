import styled from 'styled-components'

export const AssetCollectionOverviewRow = styled.div``

export const AssetCollectionOverviewCol = styled.div`
  padding: 0px 0.5rem;

  ul {
    color: #828e94;
    padding-left: 30px;

    li {
      line-height: 100%;
    }
  }
`

export const AssetCollectionOverviewImage = styled.div`
  border-radius: 8px;

  & > img {
    width: 100%;
    height: 190px;
  }
`

export const AssetCollectionOverviewContext = styled.div``

export const AssetCollectionOverviewMetrics = styled.div``

export const AssetCollectionOverviewAttributes = styled.div``

export const AssetCollectionOverviewText = styled.span<{
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

export const AssetCollectionOverviewAssistant = styled.div`
  top: 0;
  right: 0;
`

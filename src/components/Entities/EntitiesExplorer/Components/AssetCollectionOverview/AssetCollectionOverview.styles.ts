import styled from 'styled-components'

export const AssetCollectionOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DetailBoxText = styled.div`
  display: flex;
  flex-direction: column;
`

export const DetailBoxLogo = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

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

export const AssetCollectionOverviewImage = styled.div<{ background: string }>`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%),
    url(${(props): string => props.background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 290px;
  height: 190px;
  padding: 10px;
  border-radius: 8px;
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

export const AssetCollectionOverviewTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;

  & > span {
    color: ${(props): string => props.theme.ixoDarkBlue};

    &.isActive {
      color: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`

import styled from 'styled-components'

export const Container = styled.div`
  padding-bottom: 0.5rem;
  position: relative;
`

export const ContentContainer = styled.div`
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
  border-radius: 0.25rem;
  padding: 1.25rem 1rem;
  display: flex;
  width: 48rem;
  font-weight: 400;
`

export const FilePreviewWrapper = styled.div`
  height: 20rem;
  width: 15rem;
  background: #a3a3a3;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PreviewPlaceholder = styled.div`
  color: #fff;
`

export const DetailContainer = styled.div`
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
`
export const IconWrapper = styled.div<{ color: string }>`
  border-radius: 3px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }): string => color};
  svg {
    width: 10px;
  }
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
`

export const FileName = styled.div`
  font-weight: 500;
  font-size: 21px;
  color: #fff;
  margin-left: 1.125rem;
`

// export const CreationDetail = styled.div`
//   font-size: 13px;
//   color: #ffffff;
//   margin-top: 0.25rem;
// `

// export const Hash = styled.div`
//   color: #436779;
//   font-size: 13px;
// `

export const Description = styled.div`
  font-size: 16px;
  color: #fff;
  margin-top: 0.5rem;
`

export const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;

  button {
    width: 100px;
    margin-right: 1rem;

    svg {
      margin-right: 0.375rem;
    }
  }
`

export const Badge = styled.div`
  background: #143f54;
  border-radius: 4px;
  width: 6rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;
  margin-right: 0.5rem;

  svg {
    margin-right: 0.25rem;
  }
`
export const Badges = styled.div`
  display: flex;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`

export const PdfViewerWrapper = styled.a`
  & .react-pdf__Page__canvas,
  & .react-pdf__Page__textContent {
    width: 100% !important;
    height: 100% !important;
  }
`

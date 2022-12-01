import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

// export const Container = styled.section`
//   display: inline-block;
//   width: 100%;
//   .content {
//     float: none;
//   }
//   img {
//     float: left;
//     width: 50%;
//     margin-right: 15px;
//     margin-bottom: 15px;

//     @media (max-width: ${deviceWidth.tablet}px) {
//       width: 100%;
//     }
//   }
// `

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  width: 100%;
  margin-bottom: 20px;

  img {
    height: 200px;
    width: 200px;
  }

  p {
    margin: 0px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    flex-direction: column;

    img {
      width: 100%;
      object-fit: unset;
      height: unset;
    }
  }
`

export const ContainerColumn = styled.section`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    margin-bottom: 20px;
  }
`

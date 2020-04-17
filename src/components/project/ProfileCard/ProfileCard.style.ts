import styled from 'styled-components'

export const ProfileCardWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  color: black;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin: 1.75rem;

  .ProfileCard-image {
    width: 6rem;
    object-fit: cover;
  }

  .ProfileCard-content {
    font-family: Roboto;
    font-weight: normal;
    line-height: 1.2;
    padding: 0.75rem 1rem;
    .ProfileCard-name {
      font-size: 1.125rem;
      font-weight: bold;
    }
    .ProfileCard-role {
      font-size: 0.75rem;
      color: #a5adb0;
    }
    .ProfilceCard-social-links {
      margin-top: 1rem;
      svg {
        margin-right: 0.75rem;
        path {
          fill: #a5adb0;
        }
      }
    }
  }
`

import React from 'react'
import { ApiPageContent } from 'common/api/blocksync-api/types/page-content'
import { ProfileCardsWrapper } from './PageContent.styles'
import BodyContentCard from '../BodyContentCard/BodyContentCard'
import ImageContentCard from '../ImageContentCard/ImageContentCard'
import ProfileCard from '../ProfileCard/ProfileCard'
import Header from '../Header/Header'
import EmbeddedContentCard from '../EmbeddedContentCard/EmbeddedContentCard'
import Footer from '../Footer/Footer'

interface Props {
  ownerName: string
  ownerMission: string
  ownerLogo: string
  ownerWebsite: string
  pageContent: ApiPageContent
}

const PageContent: React.FunctionComponent<Props> = ({
  pageContent,
  ownerName,
  ownerMission,
  ownerLogo,
  ownerWebsite,
}) => {
  const renderHeader = (): JSX.Element => {
    const { title, image, imageDescription } = pageContent.header
    return (
      <Header name={title} image={image} imageDescription={imageDescription} />
    )
  }

  const renderBodySections = (): JSX.Element => {
    const { body } = pageContent

    return (
      <>
        {body.map((bodySection, index) => {
          const { image, content, title } = bodySection
          return (
            <BodyContentCard
              key={index}
              image={image}
              content={content}
              title={title}
            />
          )
        })}
      </>
    )
  }

  const renderImageSections = (): JSX.Element => {
    const { images } = pageContent

    return (
      <>
        {images.map((imageSection, index) => {
          const { image, content, title, imageDescription } = imageSection
          return (
            <ImageContentCard
              key={index}
              image={image}
              content={content}
              title={title}
              imageDescription={imageDescription}
            />
          )
        })}
      </>
    )
  }

  const renderProfiles = (): JSX.Element => {
    const { profiles } = pageContent

    return (
      <ProfileCardsWrapper>
        {profiles.map((profile, index) => {
          const { image, name, position, linkedInUrl, twitterUrl } = profile
          return (
            <ProfileCard
              key={index}
              image={image}
              name={name}
              position={position}
              linkedInUrl={linkedInUrl}
              twitterUrl={twitterUrl}
            />
          )
        })}
      </ProfileCardsWrapper>
    )
  }

  const renderEmbeddedContent = (): JSX.Element => {
    const { embedded } = pageContent

    return (
      <>
        {embedded.map((content, index) => {
          const { title, urls } = content
          return <EmbeddedContentCard key={index} title={title} urls={urls} />
        })}
      </>
    )
  }

  const renderFooter = (): JSX.Element => {
    const {
      social: {
        discourseUrl,
        facebookUrl,
        githubUrl,
        instagramUrl,
        linkedInUrl,
        otherUrl,
        telegramUrl,
        twitterUrl,
      },
    } = pageContent

    return (
      <Footer
        ownerLogo={ownerLogo}
        ownerMission={ownerMission}
        ownerName={ownerName}
        ownerWebsite={ownerWebsite}
        discourseUrl={discourseUrl}
        facebookUrl={facebookUrl}
        githubUrl={githubUrl}
        instagramUrl={instagramUrl}
        linkedInUrl={linkedInUrl}
        otherUrl={otherUrl}
        telegramUrl={telegramUrl}
        twitterUrl={twitterUrl}
      />
    )
  }

  return (
    <div>
      {renderHeader()}
      {renderBodySections()}
      {renderImageSections()}
      {renderProfiles()}
      {renderEmbeddedContent()}
      {renderFooter()}
    </div>
  )
}

export default PageContent

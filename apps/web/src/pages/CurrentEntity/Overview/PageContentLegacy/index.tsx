import React from 'react'
import { TEntityPageSectionLegacyModel } from 'types/entities'
import { Flex } from '@mantine/core'
import Header from './Header/Header'
import BodyContentCard from './BodyContentCard/BodyContentCard'
import ImageContentCard from './ImageContentCard/ImageContentCard'
import ProfileCard from './ProfileCard/ProfileCard'
import EmbeddedContentCard from './EmbeddedContentCard/EmbeddedContentCard'
import Footer from './Footer/Footer'

interface Props {
  page: TEntityPageSectionLegacyModel
}

const PageContentLegacy: React.FC<Props> = ({ page }): JSX.Element => {
  const { header, body, images, profiles, social, embedded } = page

  console.log({ header, body, images, profiles, social, embedded })

  const renderHeader = (): JSX.Element => {
    const { title, image, imageDescription } = header
    return <Header name={title} image={image} imageDescription={imageDescription} />
  }

  const renderBodySections = (): JSX.Element => {
    return (
      <>
        {body.map((bodySection, index) => {
          const { image, content, title } = bodySection
          return <BodyContentCard key={index} image={image} content={content} title={title} />
        })}
      </>
    )
  }

  const renderImageSections = (): JSX.Element => {
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
    return (
      <Flex mb={56}>
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
      </Flex>
    )
  }

  const renderEmbeddedContent = (): JSX.Element => {
    return (
      <>
        {embedded.map((content: any, index: number) => {
          const { title, urls } = content
          return <EmbeddedContentCard key={index} title={title} urls={urls} />
        })}
      </>
    )
  }

  const renderFooter = (): JSX.Element => {
    const { discourseUrl, facebookUrl, githubUrl, instagramUrl, linkedInUrl, otherUrl, telegramUrl, twitterUrl } =
      social

    return (
      <Footer
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
    <Flex w={'100%'} direction={'column'} gap={16}>
      <Flex w={'100%'} direction={'column'}>
        {renderHeader()}
      </Flex>
      <Flex w={'100%'} direction={'column'}>
        {renderBodySections()}
      </Flex>
      <Flex w={'100%'} direction={'column'}>
        {renderImageSections()}
      </Flex>
      <Flex w={'100%'} direction={'column'}>
        {renderProfiles()}
      </Flex>
      <Flex w={'100%'} direction={'column'}>
        {renderEmbeddedContent()}
      </Flex>
      <Flex w={'100%'} direction={'column'}>
        {renderFooter()}
      </Flex>
    </Flex>
  )
}

export default PageContentLegacy

import { Flex, Text, Button } from '@mantine/core'
import { LiaImage } from 'react-icons/lia'
import classes from './FeaturedImage.module.css'
import { ImageUploadModal } from 'components/Modals'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'

type FeaturedImageProps = {
  onChange: (image: string) => void
  initialImage?: string
  editable?: boolean
}

const FeaturedImage = ({ onChange, initialImage, editable = true }: FeaturedImageProps) => {
  const [image, setImage] = useState<string>(initialImage ?? '')
  const [isOpen, { close, open }] = useDisclosure()


  useEffect(() =>{
    setImage(initialImage ?? '')
  }, [initialImage])

  const handleSettingImage = (image: string) => {
    setImage(image)
    onChange(image)
  }
  console.log({image})

  return (
    <Flex direction={"column"} w="100%">
      <ImageUploadModal aspect={3.654} open={isOpen} onClose={close} value={image} handleChange={handleSettingImage} />
      {!image && editable && (
        <Flex className={classes.featuredImage} align='center' gap={6} onClick={open}>
          <LiaImage className={classes.icon} size={24} />
          <Text c='#a8adae' className={classes.text} fz={24}>
            Add a Hero Image
          </Text>
        </Flex>
      )}
      {image && (
        <Flex w="100%" h={300} pos={"relative"} bg={`url(${image}) center/cover no-repeat`}>
          {editable && (
            <div className={classes.overlay}>
              <Button onClick={open}>Replace Image</Button>
            </div>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default FeaturedImage

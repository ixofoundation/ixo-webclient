// @ts-nocheck
import * as ReactDOMServer from 'react-dom/server'
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import { Typography } from 'components/Typography'
import { ReactComponent as ImageOutlineIcon } from '/public/assets/images/icon-image-outline.svg'
import CustomImage from './CustomImage'

const HeroImage: ToolConstructable | ToolSettings = {
  ...CustomImage,
  config: {
    ...CustomImage.config,
    buttonContent: ReactDOMServer.renderToString(
      <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
        <ImageOutlineIcon />
        <Typography variant='secondary' size='2xl' color='grey700'>
          Add a Hero Image
        </Typography>
      </div>,
    ),
  },
}

export default HeroImage

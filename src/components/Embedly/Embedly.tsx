import { useImportScript } from 'hooks/importScript'

interface Props {
  url: string
}

const Embedly: React.FunctionComponent<Props> = ({ url }) => {
  useImportScript('https://cdn.embedly.com/widgets/platform.js')
  return (
    // eslint-disable-next-line
    <a
      href={url}
      className='embedly-card'
      data-card-recommend='0'
      // data-card-key={process.env.REACT_APP_EMBEDLY_KEY}
      data-card-controls='0'
      data-card-width='100%'
    />
  )
}

export default Embedly

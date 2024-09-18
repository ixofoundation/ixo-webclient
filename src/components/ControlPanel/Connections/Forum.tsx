interface Props {
  show: boolean
}

const Mobile: React.FunctionComponent<Props> = ({ show }) => {
  return <div className={`show-more-container ${show ? 'show' : ''}`}>Coming soon</div>
}

export default Mobile

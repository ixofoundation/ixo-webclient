import React from 'react'
// @ts-ignore
import { PlayButton, Progress } from 'react-soundplayer/components'
// @ts-ignore
import { withCustomAudio } from 'react-soundplayer/addons'
import Play from 'assets/icons/Play'

import { Container, TimerContainer, TrackContainer } from './Audio.styles'

interface Props {
  src: string
}

const prettyTime = (time: any): string => {
  const hours = Math.floor(time / 3600)
  let mins = '0' + Math.floor((time % 3600) / 60)
  let secs = '0' + Math.floor(time % 60)

  mins = mins.substr(mins.length - 2)
  secs = secs.substr(secs.length - 2)

  if (secs) {
    if (hours) {
      return `${hours}:${mins}:${secs}`
    }
    return `${mins}:${secs}`
  }
  return '00:00'
}

const Player = withCustomAudio((props: any) => {
  const { currentTime, soundCloudAudio, duration } = props
  let durationValue = soundCloudAudio.duration

  if (duration) {
    durationValue = duration
  }

  return (
    <Container>
      <TrackContainer>
        <PlayButton className='player-btn' {...props}>
          <Play />
        </PlayButton>
        <Progress value={(currentTime / duration) * 100 || 0} {...props} />
      </TrackContainer>
      <TimerContainer>
        <span>{prettyTime(currentTime)}</span>
        <span>{prettyTime(durationValue)}</span>
      </TimerContainer>
    </Container>
  )
})

const Audio: React.FunctionComponent<Props> = ({ src }): JSX.Element => {
  return <Player streamUrl={src} />
}

export default Audio

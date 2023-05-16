import React from 'react'
import { Card } from '../Card'
import { Widget } from '../types'
import { ReactComponent as CommentIcon } from 'assets/images/icon-comment-alt.svg'
import { ReactComponent as TelegramIcon } from 'assets/images/icon-telegram.svg'
import { ReactComponent as DiscordIcon } from 'assets/images/icon-discord.svg'
import { ReactComponent as SlackIcon } from 'assets/images/icon-slack.svg'

interface Props {
  widget: Widget
}

const Connect: React.FC<Props> = () => {
  return (
    <Card
      icon={<CommentIcon />}
      title='Connect'
      items={[
        {
          icon: <TelegramIcon />,
          content: 'Telegram',
          onClick: () => {
            window.open('https://t.me/ixonetwork')
          },
        },
        {
          icon: <DiscordIcon />,
          content: 'Discord',
          onClick: () => {
            window.open('https://discord.gg/ixo')
          },
        },
        {
          icon: <SlackIcon />,
          content: 'Slack',
          onClick: () => {
            window.open('https://ixofoundation.slack.com/signup#/domain-signup')
          },
        },
      ]}
    />
  )
}

export default Connect

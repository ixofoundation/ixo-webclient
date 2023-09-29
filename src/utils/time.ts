import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

export const timeAgo = new TimeAgo('en-US')

export const formatCookingTime = (duration: number): string => {
  const hours = Math.floor(duration / 60)
  const minutes = Math.floor((duration % 60) / 60)

  return `${hours}h ${minutes}min cooking time`
}

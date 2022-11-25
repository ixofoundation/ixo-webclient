import { Question } from './types'

export const orderForNewQuestion = (existingQuestions: { [id: string]: Question }): number =>
  Object.values(existingQuestions).length > 0
    ? Math.max(...Object.values(existingQuestions).map((question) => question.order + 1))
    : 1

export const questionsWithIncrementedOrder = (
  fromOrder: number,
  incrementBy: number,
  existingQuestions: {
    [id: string]: Question
  },
): { [id: string]: Question } => {
  const incrementedQuestions = {}

  const questionsToIncrement = Object.values(existingQuestions).filter((question) => question.order >= fromOrder)

  if (questionsToIncrement.length === 0) {
    return existingQuestions
  }

  questionsToIncrement.forEach((question) => {
    incrementedQuestions[question.id] = {
      ...question,
      order: question.order + incrementBy,
    }
  })

  return { ...existingQuestions, ...incrementedQuestions }
}

export const itemCountOrItemValuesLength = (itemCount: number, itemValues: string[]): number =>
  itemCount && itemValues.length > 0 ? (itemCount > itemValues.length ? itemValues.length : itemCount) : itemCount

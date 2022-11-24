import * as SUT from './EditEntityAttestation.utils'
import { Question } from './types'
import { Type, ControlType } from 'common/components/JsonForm/types'

describe('orderForNewQuestion', () => {
  it('should return the correct order for a new question where there are existing questions', () => {
    const existingQuestions = {
      someId1: {
        id: 'someId1',
        title: 'someTitle1',
        label: 'someLabel1',
        description: 'someDescription1',
        attributeType: 'someAttributeType1',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 3,
      },
      someId2: {
        id: 'someId2',
        title: 'someTitle2',
        label: 'someLabel2',
        description: 'someDescription2',
        attributeType: 'someAttributeType2',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
      someId3: {
        id: 'someId3',
        title: 'someTitle3',
        label: 'someLabel3',
        description: 'someDescription3',
        attributeType: 'someAttributeType3',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 2,
      },
    } as { [id: string]: Question }

    const newOrder = SUT.orderForNewQuestion(existingQuestions)

    expect(newOrder).toEqual(4)
  })

  it('should return the correct order for a new question that has no existing questions', () => {
    const newOrder = SUT.orderForNewQuestion({})

    expect(newOrder).toEqual(1)
  })
})

describe('questionsWithIncrementedOrder', () => {
  it('should increment the questions by 1 with an order greater than or equal to the fromOrder passed', () => {
    const existingQuestions = {
      someId1: {
        id: 'someId1',
        title: 'someTitle1',
        label: 'someLabel1',
        description: 'someDescription1',
        attributeType: 'someAttributeType1',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 3,
      },
      someId2: {
        id: 'someId2',
        title: 'someTitle2',
        label: 'someLabel2',
        description: 'someDescription2',
        attributeType: 'someAttributeType2',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
      someId3: {
        id: 'someId3',
        title: 'someTitle3',
        label: 'someLabel3',
        description: 'someDescription3',
        attributeType: 'someAttributeType3',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 2,
      },
    } as { [id: string]: Question }

    const newIncrementedQuestions = SUT.questionsWithIncrementedOrder(2, 1, existingQuestions)

    expect(newIncrementedQuestions).toEqual({
      someId1: {
        id: 'someId1',
        title: 'someTitle1',
        label: 'someLabel1',
        description: 'someDescription1',
        attributeType: 'someAttributeType1',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 4,
      },
      someId2: {
        id: 'someId2',
        title: 'someTitle2',
        label: 'someLabel2',
        description: 'someDescription2',
        attributeType: 'someAttributeType2',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
      someId3: {
        id: 'someId3',
        title: 'someTitle3',
        label: 'someLabel3',
        description: 'someDescription3',
        attributeType: 'someAttributeType3',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 3,
      },
    })
  })

  it('should decrement the questions by 1 with an order greater than or equal to the fromOrder passed', () => {
    const existingQuestions = {
      someId1: {
        id: 'someId1',
        title: 'someTitle1',
        label: 'someLabel1',
        description: 'someDescription1',
        attributeType: 'someAttributeType1',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 3,
      },
      someId2: {
        id: 'someId2',
        title: 'someTitle2',
        label: 'someLabel2',
        description: 'someDescription2',
        attributeType: 'someAttributeType2',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
      someId3: {
        id: 'someId3',
        title: 'someTitle3',
        label: 'someLabel3',
        description: 'someDescription3',
        attributeType: 'someAttributeType3',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 2,
      },
    } as { [id: string]: Question }

    const newIncrementedQuestions = SUT.questionsWithIncrementedOrder(2, -1, existingQuestions)

    expect(newIncrementedQuestions).toEqual({
      someId1: {
        id: 'someId1',
        title: 'someTitle1',
        label: 'someLabel1',
        description: 'someDescription1',
        attributeType: 'someAttributeType1',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 2,
      },
      someId2: {
        id: 'someId2',
        title: 'someTitle2',
        label: 'someLabel2',
        description: 'someDescription2',
        attributeType: 'someAttributeType2',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
      someId3: {
        id: 'someId3',
        title: 'someTitle3',
        label: 'someLabel3',
        description: 'someDescription3',
        attributeType: 'someAttributeType3',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
    })
  })

  it('should return the same questions when there is nothing to increment', () => {
    const existingQuestions = {
      someId1: {
        id: 'someId1',
        title: 'someTitle1',
        label: 'someLabel1',
        description: 'someDescription1',
        attributeType: 'someAttributeType1',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 3,
      },
      someId2: {
        id: 'someId2',
        title: 'someTitle2',
        label: 'someLabel2',
        description: 'someDescription2',
        attributeType: 'someAttributeType2',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
      someId3: {
        id: 'someId3',
        title: 'someTitle3',
        label: 'someLabel3',
        description: 'someDescription3',
        attributeType: 'someAttributeType3',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 2,
      },
    } as { [id: string]: Question }

    const newIncrementedQuestions = SUT.questionsWithIncrementedOrder(4, 1, existingQuestions)

    expect(newIncrementedQuestions).toEqual({
      someId1: {
        id: 'someId1',
        title: 'someTitle1',
        label: 'someLabel1',
        description: 'someDescription1',
        attributeType: 'someAttributeType1',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 3,
      },
      someId2: {
        id: 'someId2',
        title: 'someTitle2',
        label: 'someLabel2',
        description: 'someDescription2',
        attributeType: 'someAttributeType2',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 1,
      },
      someId3: {
        id: 'someId3',
        title: 'someTitle3',
        label: 'someLabel3',
        description: 'someDescription3',
        attributeType: 'someAttributeType3',
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
        order: 2,
      },
    })
  })

  it('should return an empty object when there are no existing questions', () => {
    const newOrder = SUT.questionsWithIncrementedOrder(1, 1, {})

    expect(newOrder).toEqual({})
  })
})

describe('minItemsOrItemValuesLength', () => {
  it('should choose minItems if it is undefined and there are items', () => {
    const min = SUT.itemCountOrItemValuesLength(undefined!, ['1', '2', '3'])

    expect(min).toEqual(undefined)
  })
  it('should choose minItems if it is undefined and there are no items', () => {
    const min = SUT.itemCountOrItemValuesLength(undefined!, [])

    expect(min).toEqual(undefined)
  })
  it('should choose minItems if it is less than the itemValues length', () => {
    const min = SUT.itemCountOrItemValuesLength(2, ['1', '2', '3'])

    expect(min).toEqual(2)
  })
  it('should choose minItems if it is equal to the itemValues length', () => {
    const min = SUT.itemCountOrItemValuesLength(3, ['1', '2', '3'])

    expect(min).toEqual(3)
  })
  it('should choose itemValues length if minItems is greater than this', () => {
    const min = SUT.itemCountOrItemValuesLength(4, ['1', '2', '3'])

    expect(min).toEqual(3)
  })
})

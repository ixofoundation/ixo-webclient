import React from 'react'
import { Wrapper, Row } from './SetupDataCollection.styles'
import { Button } from 'pages/CreateEntity/Components'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import 'survey-core/survey.i18n.js'
import 'survey-creator-core/survey-creator-core.i18n.js'
import { ComponentCollection, Serializer, ItemValue, Question, ICustomQuestionTypeConfiguration } from 'survey-core'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'

ComponentCollection.Instance.add({
  name: 'ordertable',
  title: 'Order Table',
  questionJSON: {
    type: 'matrixdropdown',
    columns: [
      {
        name: 'price',
        title: 'Price',
        cellType: 'expression',
        displayStyle: 'currency',
      },
      {
        name: 'qty',
        title: 'Qty',
        cellType: 'dropdown',
        placeholder: '0',
        choices: [1, 2, 3, 4, 5],
      },
      {
        name: 'total',
        title: 'Total',
        cellType: 'expression',
        displayStyle: 'currency',
        expression: '{row.qty} * {row.price}',
        totalType: 'sum',
        totalDisplayStyle: 'currency',
      },
    ],
  },
  onInit() {
    //Create a new class derived from Survey.ItemValue
    //It hides text, visibleIf and enableIf properties
    //and it adds a new price number property.
    Serializer.addClass(
      'ordertableitem',
      [
        { name: 'price:number', default: 0 },
        { name: 'text', visible: false },
        { name: 'visibleIf', visible: false },
        { name: 'enableIf', visible: false },
      ],
      //We create a standard Survey.ItemValue instance.
      //The third parameter said that the actual type is "ordertableitem"
      //SurveyJS will use properties definition from "ordertableitem" class
      //and it will define "price" property for every new instance
      function () {
        return new ItemValue(null, undefined, 'ordertableitem')
      },
      'itemvalue',
    )
    //Add orderItems properties. It is an array of ordertableitem elements
    Serializer.addProperty('ordertable', {
      name: 'orderItems:ordertableitem[]',
      category: 'general',
      visibleIndex: 3,
    })
  },
  onLoaded(question) {
    //Create rows and default values on first loading
    this.updateRowsAndValues(question)
  },
  //Calls on property changed in component/root question
  onPropertyChanged(question, propertyName, newValue) {
    if (propertyName === 'orderItems') {
      //Calls when orderItems array is changed:
      //new item is added or existing removed or elements order changed
      //We need to rebuild rows and defaultValues
      this.updateRowsAndValues(question)
    }
  },
  //Calls when a property of ItemValue element is changed.
  onItemValuePropertyChanged(question, options) {
    //If the propertyName of the array is "orderItems"
    if (options.propertyName === 'orderItems') {
      //If property name of ItemValue element is "value" then rebuild rows and defaultValues
      if (options.name === 'value') {
        this.updateRowsAndValues(question)
      }
      //If property name of ItemValue element is "price" then rebuild defaultValues
      if (options.name === 'price') {
        this.setDefaultValues(question)
      }
    }
  },
  //Internal functions: buildRows, setDefaultValues and updateRowsAndValues
  //Create matrix rows using orderItems property
  buildRows(question: Question) {
    const rows = []
    for (let i = 0; i < question.orderItems.length; i++) {
      const item = question.orderItems[i]
      if (item.value) {
        rows.push(item.value)
      }
    }
    question.contentQuestion.rows = rows
  },
  //Build matrix default value using orderItems property
  setDefaultValues(question: Question) {
    const defaultValue = {}
    for (let i = 0; i < question.orderItems.length; i++) {
      const item = question.orderItems[i]
      if (!!item.value && !!item.price) {
        defaultValue[item.value] = { price: item.price }
      }
    }
    question.contentQuestion.defaultValue = defaultValue
  },
  updateRowsAndValues(question: Question) {
    this.buildRows(question)
    this.setDefaultValues(question)
  },
} as ICustomQuestionTypeConfiguration & { updateRowsAndValues: any; setDefaultValues: any; buildRows: any })

const SetupDataCollection: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const history = useHistory()
  const baseLink = match.path.split('/').slice(0, -1).join('/')

  const handlePrev = (): void => {
    history.push(`${baseLink}/profile`)
  }
  const handleNext = (): void => {
    history.push(`${baseLink}/property`)
  }

  const options = {
    showLogicTab: true,
  }
  const creator = new SurveyCreator(options)
  creator.JSON = {
    elements: [
      {
        type: 'ordertable',
        name: 'question1',
        orderItems: [
          {
            value: 'Steak',
            price: 27,
          },
          {
            value: 'Salmon',
            price: 22,
          },
          {
            value: 'Beer',
            price: 5,
          },
        ],
      },
    ],
  }
  //Select the order table component
  creator.selectedElement = creator.survey.getAllQuestions()[0]
  //Show property grid
  creator.rightContainerActiveItem('property-grid')

  return (
    <Wrapper>
      <SurveyCreatorComponent creator={creator} />

      <Row className='d-flex mt-4' style={{ gap: 16 }}>
        <Button variant='secondary' onClick={handlePrev}>
          Back
        </Button>
        <Button variant='primary' onClick={handleNext}>
          Continue
        </Button>
      </Row>
    </Wrapper>
  )
}

export default SetupDataCollection

import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import React from 'react'
//import ProjectsFilter from './ProjectsFilter'
//import DesktopDateFilterView from './DesktopDateFilterView'
//import { Button } from './ProjectsFilter.style'
import { CalendarSort } from './svgs'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('Date button component', () => {
  test('it shows the expected text when clicked', () => {
    act(() => {
      ReactDOM.render(
        <Button>
          <CalendarSort width="16" fill="#000" />
          {'Dates'}
        </Button>,
        container,
      )
    })
    const Button = container.getElementsByTagName('Button')[0]
    expect(Button.textContent).toBe('Dates')
    act(() => {
      Button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(Button.textContent).toBe('Select')
  })
})

/*
describe('DesktopDateFilterView', () => {
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })
  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })
  it('renders a DesktopDateButton', () => {
    // Given ... certain property values
    const startDate = 'null'
    const endDate = 'null'
    const getDesktopDateButton = jest.fn()
    const handleDateChange = jest.fn()
    const showDatePicker = 'false'
    const toggleShowDatePicker = jest.fn()
    const dateText = 'Dates'
    const resetDateButtonText = jest.fn()
    const resetDateFilter = jest.fn()

    // when ... we render the component
    act(() => {
      render(
        <DesktopDateFilterView
        startDate={startDate}
        endDate={endDate}
        onGetDesktopDateButton={getDesktopDateButton}
        onHandleDateChange={handleDateChange}
        showDatePicker={showDatePicker}
        onToggleShowDatePicker={toggleShowDatePicker}
        dateText={dateText}
        onResetDateButtonText={resetDateButtonText}
        onResetDateFilter={resetDateFilter}
        />,
        container
      )
    })
    // Then ...  it renders a text input of type text inside with expected attributes set
    const DesktopDateFilterView = document.querySelector('DesktopDateFilterView')
    expect(DesktopDateFilterView.startDate).toBe('null')
    expect(DesktopDateFilterView.endDate).toBe('null')
    expect(DesktopDateFilterView.showDatePicker).toBe('false')
    expect(DesktopDateFilterView.dateText).toBe('Dates')
  })
  
})

*/

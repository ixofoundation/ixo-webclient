import React from 'react'
import { render } from '@testing-library/react'
import { create, act } from 'react-test-renderer'
import ProjectsFilter from './ProjectsFilter'
import testSchema from '../../../lib/json/projectsFilterTest.json'

describe('Projects filter', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ProjectsFilter schema={testSchema} />)
    expect(getByTestId('ProjectsFilter')).toBeDefined()
  })

  it('displays the correct text on the desktop date button', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const button = instance.getDesktopDateButton()
    const buttonText = button.props.children[1]
    expect(buttonText).toBe('Dates')
    expect(instance.state.dateText).toBe('Dates')
    act(() => button.props.onClick())
    expect(instance.state.dateText).toBe('Select')
  })

  it('displays the correct text on the mobile date button', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const button = instance.getMobileDateButton()
    const buttonText = button.props.children[1]
    expect(buttonText).toBe('Dates')
    expect(instance.state.dateText).toBe('Dates')
    act(() => button.props.onClick())
    expect(instance.state.dateText).toBe('Select')
  })

  it('toggles the date picker', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const toggleShowDates = instance.toggleShowDatePicker
    expect(instance.state.showDatePicker).toBe(false)
    act(() => toggleShowDates())
    expect(instance.state.showDatePicker).toBe(true)
  })

  it('toggles mobile date menu', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const toggleMobileDates = instance.toggleMobileDates
    expect(instance.state.mobileDatesMenuOpen).toBe(false)
    act(() => toggleMobileDates())
    expect(instance.state.mobileDatesMenuOpen).toBe(true)
  })

  it('resets text on date button', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const resetDateButtonText = instance.resetDateButtonText
    expect(instance.state.dateText).toBe('Dates')
    act(() => resetDateButtonText())
    expect(instance.state.dateText).toBe('Select')
  })

  it('resets date filter', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const resetDateFilter = instance.resetDateFilter
    act(() => resetDateFilter())
    expect(instance.state.startDate).toBe(null)
    expect(instance.state.endDate).toBe(null)
    expect(instance.state.startDateDisplay).toBe(null)
    expect(instance.state.endDateDisplay).toBe(null)
    expect(instance.state.showDatePicker).toBe(false)
    expect(instance.state.dateText).toBe('Dates')
  })

  it('resets date display', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const resetDateDisplay = instance.resetDateDisplay
    act(() => resetDateDisplay())
    expect(instance.state.startDateDisplay).toBe(null)
    expect(instance.state.endDateDisplay).toBe(null)
  })

  it('shows the mobile date picker', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const showMobileDatePicker = instance.showMobileDatePicker
    expect(instance.state.showDatePicker).toBe(false)
    act(() => showMobileDatePicker())
    expect(instance.state.showDatePicker).toBe(true)
  })

  it('sets the category name', () => {
    const testName = 'category name'
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const setCategoryName = instance.setCategoryName
    expect(instance.state.checkTitle).toBe(' ')
    act(() => setCategoryName(testName))
    expect(instance.state.checkTitle).toBe('category name')
  })

  it('handles the selecting and unselecting of tags', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    expect(instance.state.categorySelections[0].tags[0]).toBe(
      'Test Category 1 - Test Tag 1',
    )
    act(() =>
      instance.handleSelectCategoryTag(
        'Test Category 1',
        'Test Category 1 - Test Tag 1',
      ),
    )
    expect(instance.state.categorySelections[1].tags.length).toBe(0)
  })

  it('returns the category filter title and number of filters', () => {
    const component = create(<ProjectsFilter schema={testSchema} />)
    const instance = component.getInstance()
    const title = instance.categoryFilterTitle('Test Category 1')
    expect(title).toBe('Test Category 1 - 1')
  })

  it('resets the category filter', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    act(() => instance.resetCategoryFilter('Test Category 1'))
    expect(instance.state.categorySelections[1].tags.length).toBe(0)
  })

  it('tags the className', () => {
    const component = create(<ProjectsFilter schema={testSchema} />)
    const instance = component.getInstance()
    const isPressed = instance.tagClassName(
      'Test Category 1',
      'Test Category 1 - Test Tag 1',
    )
    expect(isPressed).toBe('buttonPressed')
  })

  it('toggles mobile filters', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const toggleMobileFilters = instance.toggleMobileFilters
    expect(instance.state.mobileFilterMenuOpen).toBe(false)
    act(() => toggleMobileFilters())
    expect(instance.state.mobileFilterMenuOpen).toBe(true)
  })

  it('returns the mobile filter text', () => {
    const component = create(<ProjectsFilter schema={testSchema} />)
    const instance = component.getInstance()
    const buttonText = instance.mobileFilterText()
    expect(buttonText).toBe('Filters - 1')
  })

  it('resets the filters', () => {
    let component
    act(() => {
      component = create(<ProjectsFilter schema={testSchema} />)
    })
    const instance = component.getInstance()
    const resetFilters = instance.resetFilters
    expect(instance.state.categorySelections[0].tags[0]).toBe(
      'Test Category 1 - Test Tag 1',
    )
    act(() =>
      instance.handleSelectCategoryTag(
        'Test Category 1',
        'Test Category 1 - Test Tag 1',
      ),
    )
    expect(instance.state.categorySelections[1].tags.length).toBe(0)
    act(() => resetFilters())
    expect(instance.state.categorySelections[0].tags[0]).toBe(
      'Test Category 1 - Test Tag 1',
    )
  })
})

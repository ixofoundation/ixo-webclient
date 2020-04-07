import React from 'react'
import { render } from '@testing-library/react'
import ProjectsFilter from './ProjectsFilter'

describe('Desktop date button', () => {
  it('renders correctly', () => {
    // when ... we create the component
    const { getByTestId } = render(<ProjectsFilter />)

    // then ... it should render correctly
    expect(getByTestId('ProjectsFilter')).toBeDefined()
  })
})

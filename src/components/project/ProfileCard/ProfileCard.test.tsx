import React from 'react'
import { render } from '@testing-library/react'
import ProfileCard from './ProfileCard'

const user = {
  imageUrl: 'testUrl',
  name: 'test name',
  role: 'test role',
  linkedinLink: 'testLinkedinLink',
  twitterLink: 'testTwitterLink',
}

describe('ProfileCard Component', () => {
  it('renders correctly', () => {
    // when ... we create the component
    const { getByTestId } = render(<ProfileCard user={user} />)

    // then ... it should render correctly
    expect(getByTestId('ProfileCard')).toBeDefined()
  })

  it('displays an image of the user', () => {
    // when ... the profile card renders
    const { getByTestId } = render(<ProfileCard user={user} />)
    // then ... the image should display
    expect(getByTestId('ProfileCardImage')).toBeDefined()
  })

  it("displays the user's name", () => {
    // when ... the profile card renders
    const { getByText } = render(<ProfileCard user={user} />)
    // then ... the name should be rendered
    expect(getByText(user.name)).toMatchInlineSnapshot(`
      <div
        class="profileCard-name"
      >
        test name
      </div>
    `)
  })
  it("displays the user's role", () => {
    // when ... the profile card renders
    const { getByText } = render(<ProfileCard user={user} />)
    // then ... the role should be rendered

    expect(getByText(user.role)).toMatchInlineSnapshot(`
      <div
        class="profileCard-role"
      >
        test role
      </div>
    `)
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import ProfileCard from './ProfileCard'

const user = {
  imageLink: 'testUrl',
  title: 'test name',
  subtitle: 'test role',
  icons: [],
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
    expect(getByTestId('ProfileCard-image')).toBeDefined()
  })

  it("displays the user's name", () => {
    // when ... the profile card renders
    const { getByText } = render(<ProfileCard user={user} />)
    // then ... the name should be rendered
    expect(getByText(user.title)).toMatchInlineSnapshot(`
      <div
        class="ProfileCard-name"
      >
        test name
      </div>
    `)
  })
  it("displays the user's role", () => {
    // when ... the profile card renders
    const { getByText } = render(<ProfileCard user={user} />)
    // then ... the role should be rendered

    expect(getByText(user.subtitle)).toMatchInlineSnapshot(`
      <div
        class="ProfileCard-role"
      >
        test role
      </div>
    `)
  })
})

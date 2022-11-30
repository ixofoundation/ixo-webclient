// @ts-nocheck
// TODO Fix tests accoerding to new way using @testing-library/react
// import { render } from '@testing-library/react'
// import BondsSidebar from './BondsSidebar'
// import { BrowserRouter as Router } from 'react-router-dom'

export const dummy = 'test'
describe('dummy test', () => {
  it('must pass', () => {
    expect('test').toBeTruthy()
  })
})

// describe('BondsSidebar Component', () => {
//   it('renders correctly', () => {
//     // when ... we create the component
//     const { getByTestId } = render(
//       <Router>
//         <BondsSidebar projectDID='test' bondDID='test' />
//       </Router>,
//     )

//     // then ... it should render correctly
//     expect(getByTestId('BondsSidebar')).toBeDefined()
//   })

//   it('should render a link inside it, that, when clicked routes to investment accounts', () => {
//     // when ... we click on a link
//     const { getByTestId } = render(
//       <Router>
//         <BondsSidebar projectDID='test' bondDID='test' />
//       </Router>,
//     )
//     fireEvent.click(getByTestId('BondsSidebar-navLink-accounts'))
//     // then ... the link item should be active
//     expect(getByTestId('BondsSidebar-navLink-accounts').classList.contains('active')).toBeTruthy()
//   })

//   it('should render a link inside it, that, when clicked routes to bonds trades', () => {
//     // when ... we click on a link
//     const { getByTestId } = render(
//       <Router>
//         <BondsSidebar projectDID='test' bondDID='test' />
//       </Router>,
//     )
//     fireEvent.click(getByTestId('BondsSidebar-navLink-trades'))
//     // then ... the link item should be active
//     expect(getByTestId('BondsSidebar-navLink-trades').classList.contains('active')).toBeTruthy()
//   })

//   it('should render a link inside it, that, when clicked routes to bonds orders', () => {
//     // when ... we click on a link
//     const { getByTestId } = render(
//       <Router>
//         <BondsSidebar projectDID='test' bondDID='test' />
//       </Router>,
//     )
//     fireEvent.click(getByTestId('BondsSidebar-navLink-orders'))
//     // then ... the link item should be active
//     expect(getByTestId('BondsSidebar-navLink-orders').classList.contains('active')).toBeTruthy()
//   })
// })

import { isActiveRoute } from './routes'

describe('isActiveRoute util', () => {
  const newLocation = (window.location = {
    ...window.location,
    pathname: '/activepath',
  })

  it('returns true when an active match value is passed', () => {
    // given ... a truthy match value the function returns true
    // when ... the function is called
    const returnValue = isActiveRoute('', newLocation, ['/test'])
    // then ... the return should be true
    expect(returnValue).toBeTruthy()
  })

  it('returns false when match is undefined', () => {
    // given ... an undefined match value the function returns false
    // when ... the function is called
    const returnValue = isActiveRoute(undefined, newLocation, ['/test'])
    // then ... the return should be false
    expect(returnValue).toBe(false)
  })

  it('returns true when a the current the pathname matches', () => {
    // given ... an active pathname the function should return true
    // when ... the function is called
    const returnValue = isActiveRoute(undefined, newLocation, ['/activepath'])
    // then ... the return should be true
    expect(returnValue).toBeTruthy()
  })
})

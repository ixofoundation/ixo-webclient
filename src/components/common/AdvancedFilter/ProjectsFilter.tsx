import * as React from 'react'

import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../lib/commonData'

import { schema } from './schema'
import DesktopFilterView from './DesktopFilterView'
import MobileFilterView from './MobileFilterView'
import MobileDateFilterView from './MobileDateFilterView'
import DesktopDateFilterView from './DesktopDateFilterView'

import { FiltersWrap, FilterInfo } from './Style'

interface State {
  showDatePicker: boolean
  startDate: any
  endDate: any
  startDateDisplay: string
  endDateDisplay: string
  checkTitle: string
  categorySelections: any[]
  dateText: string
  mobileFilterMenuOpen: boolean
  mobileDatesMenuOpen: boolean
}

class ProjectsFilter extends React.Component<{}, State> {
  initialCategorySelections = schema.categories.map(category => ({
    category: category.title,
    tags:
      category.selectedTags && category.selectedTags.length
        ? [...category.selectedTags]
        : [],
  }))

  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
      checkTitle: ' ',
      categorySelections: this.initialCategorySelections,
      startDate: null,
      endDate: null,
      dateText: 'Dates',
      mobileFilterMenuOpen: false,
      mobileDatesMenuOpen: false,
      startDateDisplay: null,
      endDateDisplay: null,
    }
  }

  render(): JSX.Element {
    return (
      <>
        <FiltersWrap>
          <FilterInfo>All Projects</FilterInfo>
          <div className="filters">
            <MediaQuery minWidth={'577px'}>
              <DesktopDateFilterView />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileDateFilterView />
            </MediaQuery>

            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <DesktopFilterView />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileFilterView />
            </MediaQuery>
          </div>
        </FiltersWrap>
      </>
    )
  }
}
export default ProjectsFilter

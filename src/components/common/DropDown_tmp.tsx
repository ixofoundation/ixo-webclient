import GridDropdown from 'react-grid-dropdown'
import 'react-grid-dropdown/dist/style.css'
import * as React from 'react'
//import styled from 'styled-components';

import background1 from '../../assets/images/sdg/sdg-affordableenergy.png'
import background2 from '../../assets/images/sdg/background2.jpeg'
import background3 from '../../assets/images/sdg/background3.jpeg'
import background4 from '../../assets/images/sdg/background4.jpeg'

interface itemArray {
  label: string
  id: string
  backgroundImage: string
  onClick: Function
}

export interface State {
  activeItem: string
  items: itemArray[]
}
interface classesObject {
  buttonClass: 'button-class'
  dropdownClass: 'dropdown-class'
  itemClass: 'item-class'
  itemLabelClass: 'item-label-class'
}

interface stylesObject {
  buttonStyle: {}
  dropdownStyle: {}
  itemStyle: {}
  itemLabelStyle: {}
}

export interface Props {
  classes: classesObject
  styles: stylesObject
}

export default class Search extends React.Component<Props, State> {
  static defaultProps = {
    classes: {
      buttonClass: 'button-class',
      dropdownClass: 'dropdown-class',
      itemClass: 'item-class',
      itemLabelClass: 'item-label-class',
    },
    styles: {
      buttonStyle: {},
      dropdownStyle: {},
      itemStyle: {},
      itemLabelStyle: {},
    },
  }

  constructor(props) {
    super(props)

    this.state = {
      activeItem: '1item',
      items: [
        {
          label: '1 item',
          id: '1item',
          backgroundImage: `url(${background1})`,
          onClick: (): void => this.setActiveItem('1item'),
        },
        {
          label: '2 item',
          id: '2item',
          backgroundImage: `url(${background2})`,
          onClick: (): void => this.setActiveItem('2item'),
        },
        {
          label: '3 item',
          id: '3item',
          backgroundImage: `url(${background3})`,
          onClick: (): void => this.setActiveItem('3item'),
        },
        {
          label: '4 item',
          id: '4item',
          backgroundImage: `url(${background3})`,
          onClick: (): void => this.setActiveItem('4item'),
        },
        {
          label: '5 item',
          id: '5item',
          backgroundImage: `url(${background1})`,
          onClick: (): void => this.setActiveItem('5item'),
        },
        {
          label: '6 item',
          id: '6item',
          backgroundImage: `url(${background4})`,
          onClick: (): void => this.setActiveItem('6item'),
        },
      ],
    }
  }

  setActiveItem = (itemLabel): void => this.setState({ activeItem: itemLabel })

  render(): JSX.Element {
    const { classes, styles } = this.props
    const { activeItem, items } = this.state

    return (
      <div
        style={{ padding: '50px', fontFamily: 'Roboto', position: 'relative' }}
      >
        <GridDropdown
          label="sdg"
          activeItem={activeItem}
          items={items}
          //sectionsOrder={sectionsOrder}

          buttonClass={classes.buttonClass}
          dropdownClass={classes.dropdownClass}
          itemClass={classes.itemClass}
          itemLabelClass={classes.itemLabelClass}
          buttonStyle={styles.buttonStyle}
          dropdownStyle={styles.dropdownStyle}
          itemStyle={styles.itemStyle}
          itemLabelStyle={styles.itemLabelStyle}
        />
        <div
          style={{
            fontSize: '12px',
            display: 'inline-block',
            position: 'absolute',
            left: '65px',
            top: '430px',
          }}
        ></div>
      </div>
    )
  }
}

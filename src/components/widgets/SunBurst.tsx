import * as React from 'react'
import 'react-vis/dist/style.css'
import { Sunburst } from 'react-vis'

function randomLeaf() {
  return {
    size: Math.random() * 1000,
    color: Math.random(),
  }
}

function updateData() {
  const totalLeaves = Math.random() * 20
  const leaves = []
  for (let i = 0; i < totalLeaves; i++) {
    const leaf = randomLeaf()
    if (Math.random() > 0.8) {
      // SOMETHING NOT WORKING HERE. CHILDREN MAP FUNCTION NOT GOING
      leaf.children = new Array(3)
      leaf.children.map(() => {
        const newEl = randomLeaf()
        console.log('CHILD IS: ', newEl)
      })
      console.log('after: ', leaf)
    }
    leaves.push(leaf)
  }
  return {
    title: '',
    color: 1,
    children: leaves,
  }
}

export interface ParentProps {}

const DIVERGING_COLOR_SCALE = ['#00939C', '#85C4C8', '#EC9370', '#C22E00']

export default class SunburstSDG extends React.Component<ParentProps> {
  state = {
    data: updateData(),
    hovering: false,
  }

  render() {
    const { data, hovering } = this.state
    return (
      <div className="animated-sunburst-example-wrapper">
        <div>{hovering ? 'CURRENTLY HOVERING' : 'NOT HOVERED'}</div>
        <Sunburst
          animation={{ damping: 20, stiffness: 300 }}
          data={data}
          colorType={'category'}
          colorRange={DIVERGING_COLOR_SCALE}
          style={{ stroke: '#fff' }}
          onValueMouseOver={() => this.setState({ hovering: true })}
          onValueMouseOut={() => this.setState({ hovering: false })}
          height={300}
          width={350}
        />
      </div>
    )
  }
}

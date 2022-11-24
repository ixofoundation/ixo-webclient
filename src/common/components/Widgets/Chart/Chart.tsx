import * as React from 'react'
import { Bar } from 'react-chartjs-2'
// @ts-ignore
import { Chart } from 'chart.js'
import moment from 'moment'
import { Container, LabelsX } from './Chart.styles'

const compEnd = moment('2018-12-15 00:00:00')

export interface ParentProps {
  barData: BarData[]
}

export interface BarData {
  data: any[]
  color: BarColors
  label: string
}

export enum BarColors {
  blue = 'BLUE',
  yellow = 'YELLOW',
  red = 'RED',
  green = 'GREEN',
  darkBlue = 'DARKBLUE',
}

export default class BarChartProjects extends React.Component<ParentProps, any> {
  [x: string]: any
  constructor(props: ParentProps) {
    super(props)
  }

  state = {
    canvasHeight: 0,
    hasError: false,
    errorMessage: '',
    firstTime: true,
    xLabels: [],
    bucketsArray: 1,
    totalBars: 100,
    hoursPerBucket: 24,
    chartHeight: 60,
  }

  dataBasedOnDeviceWidth = (): void => {
    if (window.innerWidth < 960) {
      this.setState({ totalBars: 50 })
    }
    if (window.innerWidth < 480) {
      this.setState({ chartHeight: 120 })
    } else if (window.innerWidth < 768) {
      this.setState({ chartHeight: 100 })
    }
  }

  UNSAFE_componentWillMount(): void {
    this.dataBasedOnDeviceWidth()

    // https://github.com/jedtrow/Chart.js-Rounded-Bar-Charts/blob/master/Chart.roundedBarCharts.js
    Chart.elements.Rectangle.prototype.draw = (): void => {
      const ctx = this._chart.ctx
      const vm = this._view
      if (this.state.canvasHeight < vm.base) {
        this.setState({ canvasHeight: vm.base })
      }
      let left, right, top, bottom, signX, signY, borderSkipped, radius
      let borderWidth = vm.borderWidth
      // Set Radius Here
      // If radius is large enough to cause drawing errors a max radius is imposed
      const cornerRadius = vm.width

      if (!vm.horizontal) {
        // bar
        left = vm.x - vm.width / 2
        right = vm.x + vm.width / 2
        top = vm.y
        bottom = vm.base
        signX = 1
        signY = bottom > top ? 1 : -1
        borderSkipped = vm.borderSkipped || 'bottom'
      } else {
        // horizontal bar
        left = vm.base
        right = vm.x
        top = vm.y - vm.height / 2
        bottom = vm.y + vm.height / 2
        signX = right > left ? 1 : -1
        signY = 1
        borderSkipped = vm.borderSkipped || 'left'
      }

      // Canvas doesn't allow us to stroke inside the width so we can
      // adjust the sizes to fit if we're setting a stroke on the line
      if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom))
        borderWidth = borderWidth > barSize ? barSize : borderWidth
        const halfStroke = borderWidth / 2
        // Adjust borderWidth when bar top position is near vm.base(zero).
        const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0)
        const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0)
        const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0)
        const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0)
        // not become a vertical line?
        if (borderLeft !== borderRight) {
          top = borderTop
          bottom = borderBottom
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
          left = borderLeft
          right = borderRight
        }
      }

      ctx.beginPath()
      ctx.fillStyle = vm.backgroundColor
      ctx.strokeStyle = vm.borderColor
      ctx.lineWidth = borderWidth

      // Corner points, from bottom-left to bottom-right clockwise
      // | 1 2 |
      // | 0 3 |
      const corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom],
      ]

      // Find first (starting) corner with fallback to 'bottom'
      const borders = ['bottom', 'left', 'top', 'right']
      let startCorner = borders.indexOf(borderSkipped, 0)
      if (startCorner === -1) {
        startCorner = 0
      }

      function cornerAt(index: number): Array<Array<number>> {
        return corners[(startCorner + index) % 4]
      }

      // Draw rectangle from 'startCorner'
      let corner = cornerAt(0)
      let width, height, x, y, nextCornerId
      // eslint-disable-next-line
      let x_tl, x_tr, y_tl, y_tr
      // eslint-disable-next-line
      let x_bl, x_br, y_bl, y_br
      ctx.moveTo(corner[0], corner[1])

      for (let i = 1; i < 4; i++) {
        corner = cornerAt(i)
        nextCornerId = i + 1
        if (nextCornerId === 4) {
          nextCornerId = 0
        }

        width = corners[2][0] - corners[1][0]
        height = corners[0][1] - corners[1][1]
        x = corners[1][0]
        y = corners[1][1]

        radius = cornerRadius / 2

        if (height < 0) {
          // Negative values in a standard bar chart
          x_tl = x
          x_tr = x + width
          y_tl = y + height
          y_tr = y + height

          x_bl = x
          x_br = x + width
          y_bl = y
          y_br = y

          // Draw
          ctx.moveTo(x_bl + radius, y_bl)
          ctx.lineTo(x_br - radius, y_br)
          ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius)
          ctx.lineTo(x_tr, y_tr + radius)
          ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr)
          ctx.lineTo(x_tl + radius, y_tl)
          ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius)
          ctx.lineTo(x_bl, y_bl - radius)
          ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl)
        } else if (width < 0) {
          // Negative values in a horizontal bar chart
          x_tl = x + width
          x_tr = x
          y_tl = y
          y_tr = y

          x_bl = x + width
          x_br = x
          y_bl = y + height
          y_br = y + height

          // Draw
          ctx.moveTo(x_bl + radius, y_bl)
          ctx.lineTo(x_br - radius, y_br)
          ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius)
          ctx.lineTo(x_tr, y_tr + radius)
          ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr)
          ctx.lineTo(x_tl + radius, y_tl)
          ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius)
          ctx.lineTo(x_bl, y_bl - radius)
          ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl)
        } else {
          ctx.moveTo(x + radius, y)
          ctx.lineTo(x + width - radius, y)
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
          ctx.lineTo(x + width, y + height + radius) // set the bottom-right starting pixel
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
          ctx.lineTo(x, y + height + radius) // set the bottom-left starting pixel
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
          ctx.lineTo(x, y + radius)
          ctx.quadraticCurveTo(x, y, x + radius, y)
        }
      }

      ctx.fill()
      if (borderWidth) {
        ctx.stroke()
      }
    }
  }

  componentDidMount(): void {
    this.createBucketsArray()
  }

  populateTooltipArray(length: number): Array<string> {
    const tempArr: string[] = []
    for (let i = 0; i < length; i++) {
      tempArr.push(String(i))
    }
    return tempArr
  }

  populateXaxisLabels(): void {
    // THIS FUNCTION DOESN'T WORK 100%. NEED TO RETHINK WHEN TO PUSH TO LABELARRAY
    const labelArray = []

    for (let i = 0; i < this.state.totalBars; i += 1) {
      if (i % 10 === 0) {
        const theTime = compEnd.clone().subtract(i, 'days')
        labelArray.push(theTime.format('D MMM'))
      }
    }

    const firstTime = compEnd.clone().subtract(this.state.totalBars, 'days')
    labelArray.push(firstTime.format('D MMM'))

    // reverse array so that latest label is on the right of the chart
    labelArray.reverse()
    this.setState({ xLabels: labelArray })
  }

  getBarDate(index: number): string {
    const reversedIndex = this.state.totalBars - index
    const theDiff = Math.round(reversedIndex * this.state.hoursPerBucket)
    const theTime = compEnd.clone().subtract(theDiff, 'hours')
    return theTime.format('dddd, D MMMM, YYYY')
  }

  waitAndChange = (): void => {
    this.setState({ firstTime: false })
  }

  createBucketsArray = (): void => {
    const bucketsArray = []

    for (let i = 0; i <= this.state.totalBars; i++) {
      bucketsArray.push(24 * i)
    }

    this.populateXaxisLabels()
    this.setState({ bucketsArray: bucketsArray, hoursPerBucket: 24 })
  }

  populateDataArray = (arrayIndex: number): Array<number> => {
    const hoursDifferenceArray = []

    for (let k = 0; k < this.props.barData[arrayIndex].data.length; k++) {
      const theDate = moment(this.props.barData[arrayIndex].data[k].data.createdOn)

      hoursDifferenceArray.push(compEnd.diff(theDate, 'hours'))
    }

    const BucketValueArray = [this.state.totalBars].map(Number.prototype.valueOf, 0)

    for (let k = 0; k < hoursDifferenceArray.length; k++) {
      for (let p = 0; p < this.state.totalBars; p++) {
        if (p === this.state.totalBars - 1) {
          if (hoursDifferenceArray[k] > this.state.bucketsArray[p]) {
            BucketValueArray[p]++
          }
        } else {
          if (
            hoursDifferenceArray[k] >= this.state.bucketsArray[p] &&
            hoursDifferenceArray[k] < this.state.bucketsArray[p + 1]
          ) {
            BucketValueArray[p]++
          }
        }
      }
    }
    return BucketValueArray
  }

  allData = (canvas: any): Record<string, any> => {
    const ctx = canvas.getContext('2d')

    // const gradientsArray = this.handleGetGradients(ctx);
    const gradientRed = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight)
    gradientRed.addColorStop(0, '#E2223B') // top
    gradientRed.addColorStop(0.5, '#E2223B')
    gradientRed.addColorStop(1, '#B31429') // bottom

    const gradientYellow = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight)
    gradientYellow.addColorStop(0, '#DFA551') // top
    gradientYellow.addColorStop(0.5, '#DFA551')
    gradientYellow.addColorStop(1, '#F3C546') // bottom

    const gradientBlue = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight)
    gradientBlue.addColorStop(0, '#49BFE0')
    gradientBlue.addColorStop(0.5, '#49BFE0')
    gradientBlue.addColorStop(1, '#016582')

    const gradientDarkBlue = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight)
    gradientDarkBlue.addColorStop(0, '#096f8c')
    gradientDarkBlue.addColorStop(0.5, '#096f8c')
    gradientDarkBlue.addColorStop(1, '#0b556f')

    const gradientGreen = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight)
    gradientGreen.addColorStop(0, '#63d25a')
    gradientGreen.addColorStop(0.5, '#63d25a')
    gradientGreen.addColorStop(1, '#156a0e')

    const gradientRemaining = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight)
    gradientRemaining.addColorStop(0, '#F5F3F3')
    gradientRemaining.addColorStop(1, '#EAE9E9')

    const dataArrays: any[] = []

    this.props.barData.forEach((val, index) => {
      dataArrays.push(this.populateDataArray(index).reverse())
    })

    let dataRemainder: number[] = []
    let dataMaxArray: number[] = []

    const dataSumArray = Array(...dataArrays[0].length).map(function () {
      return 0
    })
    const dataSets = []
    dataArrays.forEach((val, index) => {
      val.forEach((element: any, elIndex: any) => {
        dataSumArray[elIndex] += element
      })

      let theCol = null
      let hoverCol = null
      switch (this.props.barData[index].color) {
        case BarColors.red:
          theCol = gradientRed
          hoverCol = '#E2223B'
          break
        case BarColors.yellow:
          theCol = gradientYellow
          hoverCol = '#DFA551'
          break
        case BarColors.blue:
          theCol = gradientBlue
          hoverCol = '#49BFE0'
          break
        case BarColors.darkBlue:
          theCol = gradientDarkBlue
          hoverCol = '#0f81a0'
          break
        case BarColors.green:
          theCol = gradientGreen
          hoverCol = '#E2223B'
          break
        default:
      }
      dataSets.push({
        label: this.props.barData[index].label,
        data: val,
        backgroundColor: theCol,
        hoverBackgroundColor: hoverCol,
      })
    })

    const max = Math.max(...dataSumArray)
    dataMaxArray = new Array(this.state.totalBars)
    dataMaxArray.fill(max + 2)
    dataRemainder = dataSumArray.map((value) => {
      return max + 2 - value
    })
    if (dataRemainder.length < this.state.totalBars) {
      const excessBarsCount = this.state.totalBars - dataRemainder.length
      const excessElements = new Array(excessBarsCount)
      excessElements.fill(max + 2)
      dataRemainder.push(...excessElements)
    }

    dataSets.push({
      label: 'Total Remainder',
      data: dataRemainder,
      backgroundColor: gradientRemaining,
      hoverBackgroundColor: gradientRemaining,
    })

    if (this.state.firstTime === true) {
      setTimeout(this.waitAndChange, 500)
      return {
        labels: this.populateTooltipArray(this.state.totalBars),
        datasets: [
          {
            label: 'Total Remainder',
            data: dataMaxArray,
            backgroundColor: gradientRemaining,
            hoverBackgroundColor: gradientRemaining,
          },
        ],
      }
    }
    return {
      labels: this.populateTooltipArray(this.state.totalBars),
      datasets: dataSets,
    }
  }

  render(): JSX.Element {
    // NEED TO CODE *VIEW REPORT* LINK, THAT GOES TO CLAIM PAGE ITSELF

    const options = {
      tooltips: {
        callbacks: {
          title: (tooltipItem: any): string => {
            return this.getBarDate(tooltipItem[0].index)
          },
          label: (tooltipItem: any, data: any): string => {
            if (tooltipItem.datasetIndex !== 1) {
              return `${tooltipItem.yLabel} ${data.datasets[tooltipItem.datasetIndex].label}`
            } else {
              return ''
            }
          },
        },
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              callback: function (value: number): number | null {
                if (value % 1 === 0) {
                  return value
                } else {
                  return null
                }
              },
              fontColor: '#282828',
            },
          },
        ],
      },
    }

    return (
      <Container className='container-fluid'>
        {this.state.hasError ? (
          this.state.errorMessage
        ) : (
          <Bar height={this.state.chartHeight} data={this.allData} options={options} />
        )}
        <LabelsX>
          {this.state.xLabels.map((label, index) => {
            return <p key={index}>{label}</p>
          })}
        </LabelsX>
      </Container>
    )
  }
}

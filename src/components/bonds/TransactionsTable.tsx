import React, { Component } from 'react'
import 'react-virtualized/styles.css'
import './TransactionsTable.css'

// You can import any component you want as a named export from 'react-virtualized', eg
import { Column, Table } from 'react-virtualized'
import { connect } from 'react-redux'
import { Store } from '../../model/store'
import { getTotalSupplies } from '../../redux/bond/bond_action_creators'
import { currencyStr } from '../../model/account'
import moment from 'moment'

import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

import checkmark from '../../assets/img/checkmark.png'
import x from '../../assets/img/x.png'
import { Currency } from '../../model'

export enum SortDirection {
  ASC,
  DESC,
}

class TransactionsTable extends Component<any> {
  state = {
    list: [],
    sortBy: 'timestamp',
    sortDirection: SortDirection.ASC,
    tableWidth: 500,
    page: 0,
    totalPages: 'N/A',
    focusedInput: null,
    filters: {
      startDate: moment().subtract(1, 'year'),
      endDate: moment(),
      orderType: 'All',
      token: 'All',
      query: '',
    },
  }
  // state = {}

  constructor(props: any) {
    super(props)
    this.state = {
      list: [],
      sortBy: 'timestamp',
      sortDirection: SortDirection.ASC,
      tableWidth: 500,
      page: 0,
      totalPages: 'N/A',
      focusedInput: null,
      filters: {
        startDate: moment().subtract(1, 'year'),
        endDate: moment(),
        orderType: 'All',
        token: 'All',
        query: '',
      },
    }
  }

  componentDidMount() {
    // table size needs manual adjusting because virtualized table renders only visible items
    this.resizeTable()
    window.addEventListener('resize', () => this.resizeTable())
    this.props.dispatch(getTotalSupplies())
  }

  resizeTable() {
    const content = document.getElementsByClassName(
      'BondsWrapper_panel__content',
    )
    this.setState({ tableWidth: content[0].clientWidth })
  }

  sortItems(list: any) {
    Object.assign([], list)

    // sort by key. timestamp for default
    list = list.sort((a: any, b: any) => {
      return new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1
    })

    // reverse the list?
    if (this.state.sortDirection === SortDirection.DESC) {
      list = list.reverse()
    }

    // const filtered = list.filter((item: any) => {

    //     let match = false

    //     // filter by type
    //     if (this.state.filters.orderType != "All") {
    //         match = this.txType(item.tx) == this.state.filters.orderType
    //     }

    //     // filter by date TODO (this should be a querying option)
    //     if (this.state.filters.token != "All") {
    //         match = (item.tx.value.msg[0].value.denom != this.state.filters.token)
    //     }

    //     // filter by query TODO

    //     return !match
    // })

    return list
  }

  componentWillReceiveProps(props: any) {
    if (props.txs && props.txs.length != this.state.list.length) {
      this.setState({ list: this.sortItems(props.txs) })
    }
  }

  // shouldComponentUpdate(nextProps: Store, nextState: any) {
  //     if (nextState.filters != this.state.filters) {
  //         this.setState({ list: this.sortItems(this.props.txs) })
  //         // alert("ASD")
  //         return true
  //     }
  //     return (nextState !== this.state || nextProps !== this.props)
  // }

  txType(tx: any) {
    const orderTypes: any = {
      'cosmos-sdk/MsgBuy': 'Buy',
      'cosmos-sdk/MsgSell': 'Sell',
      'cosmos-sdk/MsgSwap': 'Swap',
    }
    const msg = tx.value.msg[0].type
    return orderTypes[msg]
  }

  render() {
    return (
      <div className="BondsWrapper_panel__chrome Table">
        <div
          className="BondsWrapper_panel__content"
          style={{ minHeight: '60vh' }}
        >
          <div className="Table_filter__fields">
            <select
              name="orderType"
              className="orderType"
              onChange={e =>
                this.setState({
                  filters: { ...this.state.filters, orderType: e.target.value },
                })
              }
            >
              <option value="All">Order Type</option>
              <option value="All">All</option>
              <option value="Buy">Buys</option>
              <option value="Sell">Sells</option>
              <option value="Swap">Swaps</option>
            </select>
            <select
              name="token"
              className="token"
              onChange={e =>
                this.setState({
                  filters: { ...this.state.filters, token: e.target.value },
                })
              }
            >
              <option value="All">All Tokens</option>

              {this.props.totalSupplies.map((supply: Currency) => (
                <option
                  key={supply.denom}
                  selected={this.props.selectedToken == supply.denom!}
                >
                  {supply.denom!.toUpperCase()}
                </option>
              ))}
            </select>
            <DateRangePicker
              startDate={this.state.filters.startDate} // momentPropTypes.momentObj or null,
              startDateId="startDate" // PropTypes.string.isRequired,
              endDate={this.state.filters.endDate} // momentPropTypes.momentObj or null,
              endDateId="endDate" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) =>
                this.setState({
                  filters: { ...this.state.filters, startDate, endDate },
                })
              } // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />

            <input
              placeholder="Search"
              className="query"
              onChange={e =>
                this.setState({
                  filters: { ...this.state.filters, query: e.target.value },
                })
              }
            />
            <button>Export</button>
          </div>

          <Table
            width={this.state.tableWidth}
            height={500}
            headerHeight={40}
            rowHeight={60}
            rowCount={this.state.list.length}
            rowGetter={({ index }) => this.state.list[index]}
          >
            <Column
              label="Time"
              dataKey="timestamp"
              width={150}
              cellRenderer={tcp => {
                var time = moment(tcp.cellData)
                return time.fromNow()
              }}
            />

            <Column
              label="Account"
              width={250}
              dataKey="tx"
              cellRenderer={tcp => {
                const accountKey: any = {
                  'cosmos-sdk/MsgBuy': 'buyer',
                  'cosmos-sdk/MsgSell': 'seller',
                  'cosmos-sdk/MsgSwap': 'swapper',
                }
                const msg = tcp.cellData.value.msg[0]
                return (
                  <span className="address">
                    {msg.value[accountKey[msg.type]]}
                  </span>
                )
              }}
            />
            <Column
              label="Order Type"
              width={150}
              dataKey="tx"
              cellRenderer={tcp => {
                const orderTypes: any = {
                  'cosmos-sdk/MsgBuy': 'Buy',
                  'cosmos-sdk/MsgSell': 'Sell',
                  'cosmos-sdk/MsgSwap': 'Swap',
                }
                const msg = tcp.cellData.value.msg[0]
                return orderTypes[msg.type]
              }}
            />

            <Column
              label="Status"
              width={250}
              dataKey="logs"
              cellRenderer={tcp =>
                tcp.cellData[0].success ? (
                  <>
                    <img src={checkmark} width={15} className="icon" />
                    Confirmed
                  </>
                ) : (
                  <>
                    <img src={x} width={15} className="icon" />
                    Cancelled
                  </>
                )
              }
            />

            <Column
              label="Order Amount"
              width={250}
              dataKey="tx"
              cellRenderer={tcp =>
                currencyStr(tcp.cellData.value.msg[0].value.amount)
              }
            />
            {/* <Column label="Order Amount" width={250} dataKey="events" cellRenderer={(tcp: any) => {
                            const type = this.txType(tcp.rowData.tx)
                            console.log(tcp.rowData.logs[0].success)
                            // if (isArray(tcp.cellData) && tcp.cellData.length > 1) {
                            if (type == "Buy" && tcp.rowData.logs[0].success) {
                                let attributes = tcp.cellData[tcp.cellData.length - 1].attributes
                                return JSON.stringify(attributes)
                            }
                            // return type
                            // return attributes[attributes.length - 1].value
                            // } else {
                            //     return "nil"
                            // }
                        }} /> */}
            <Column
              label="Tokens"
              width={250}
              dataKey="tx"
              cellRenderer={tcp =>
                currencyStr(tcp.cellData.value.msg[0].value.amount)
              }
            />
          </Table>

          <div className="pagination">
            <a className="pageNumber active">{this.state.page}</a>
            <a className="pageNumber">{this.state.page + 1}</a>
            <a className="pageNumber">{this.state.page + 2}</a>
            <a className="pageNumber">...</a>
            <a className="pageNumber">{this.state.totalPages}</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state: Store) {
  return state
}

export default connect(mapStateToProps)(TransactionsTable)

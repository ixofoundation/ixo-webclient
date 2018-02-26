import * as React from 'react';
import { connect } from "react-redux";
import { IPublicSiteStoreState } from '../../redux/public_site_reducer';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { renderIfTrue } from '../../utils/react_utils';
import { ICustomButton } from '../../../../types/models';
import styled from 'styled-components';

export namespace Table {

    export interface Props {
        ixo?: any
        tableList: any
        tableOptions: any
        customButtons?: ICustomButton[]
        selectOptions?: any[]
    }
    export interface State {
        selectedOption: string
    }

    export interface Callbacks {
    }

    export interface IProps extends Props, Callbacks {
    }
}

export class Table extends React.Component<Table.IProps, Table.State> {

    buttonIndex = -1;

    constructor(props?: Table.IProps, context?: any) {
        super(props, context);
        this.state = {
            selectedOption: null
        }
    }

    handleSubmit = (cell, row, enumObject, rowIndex, selectedOption?) => {
        this.props.customButtons[cell].callback(row, selectedOption);
    }

    handleOptionChanged = (selectedOption) => {
        this.setState({ selectedOption: selectedOption.target.value });
    }

    customButton = (cell, row, enumObject, rowIndex) => {
        if ((this.props.customButtons.length > 1) && (this.buttonIndex < (this.props.customButtons.length - 1))) {
            this.buttonIndex = this.buttonIndex + 1;
        } else {
            this.buttonIndex = 0;
        }
        cell = this.buttonIndex;
        return (
            <div>
                {renderIfTrue(this.props.selectOptions && this.props.selectOptions.length > 0, () =>
                    <SelectStatus onChange={this.handleOptionChanged}>
                        {this.props.selectOptions.map((option) => {
                            return <option value={option.value} label={option.label} />
                        })}
                    </SelectStatus>
                )}

                <button
                    className='btn-info'
                    onClick={() => {
                        this.handleSubmit(cell, row, enumObject, rowIndex, this.state.selectedOption)

                    }}>
                    {this.props.customButtons[this.buttonIndex].buttonLabel}
                </button>
            </div>
        )
    }

    renderColumns() {
        var entry = this.props.tableList[0];
        var columns = [];

        for (var key in entry) {
            if (entry.hasOwnProperty(key)) {
                columns.push(key);
            }
        }

        if (this.props.customButtons) {
            this.props.customButtons.map((button, key) => {
                columns.push('button' + key);
            })
        }

        return columns.map((key, id) => {
            if (key.includes('button')) {
                return <TableHeaderColumn
                    dataField={key}
                    dataFormat={this.customButton.bind(this)}
                    key={id}
                    hidden={key.includes('_') || false}
                    isKey={key === '_id' || false}>
                    {this.props.customButtons[key.slice(-1)].headerLabel}
                </TableHeaderColumn>
            } else {
                return <TableHeaderColumn
                    dataField={key}
                    key={id}
                    hidden={key.includes('_') || false}
                    isKey={key === '_id' || false}>
                    {key}
                </TableHeaderColumn>
            }

        })
    }

    render() {
        return <BootstrapTable data={this.props.tableList} search={true} options={this.props.tableOptions}>
            {this.renderColumns()}
        </BootstrapTable>
    }
}


const SelectStatus = styled.select`
    display: block;
    justify-content: center;
    background-color: white;
    height: 35px;
    width: 90px;
    border: none;
    color: black;
`;
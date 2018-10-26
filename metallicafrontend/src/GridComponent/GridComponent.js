import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Toggle } from '../Actions/Toggle'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TradeUrl } from '../ConfigFiles/Config'
import { subscribeToTimer } from '../Crud/TradeSocket'
import { FetchSearchData } from '../Search/SearchAction'
import { Gridcolumns } from './GridColumns'
class AddStock extends Component {
    constructor() {
        super();
        this.i = 0;
        this.state = {
            trade: [],
            show: false
        };
        subscribeToTimer((err, TradeData) => {
            this.setState({ TradeData: TradeData.data });
            TradeData.status ? toast.success("Trade " + TradeData.status) : false;
            TradeData.status ? this.HandleTrade(TradeData.status) : false
        })
    }

    HandleTrade() {
        this.props.refresh(TradeUrl.filterTradeUrl, value);
    }

    handleCrudToggle(data, operation) {
        // Handle Display Operation
        if (operation === 'Display') {
            this.props.toggle("Display ", false, false, true, data, 'Display');
        }
        // Handle Add Operation         
        if (operation === 'Add')
            if (this.props.flags.Operation !== "AddStock") {
                this.props.toggle("Add stock", false, true, false, '', 'AddStock');
            }
            else
                this.props.toggle("Add stock", !this.props.flags.visible, true, false, '', 'AddStock');
    }

    render() {

        return (
            <div className={!this.props.flags.visible ? "col-md-8" : "col-md-12"} style={{transition:'1s',}}>
                <div style={{ boxShadow: 'inset 0 4px 78px 4px #dbecfa' }}>
                    <div className="table responsive">
                        <ReactTable
                            data={this.props.trade}
                            columns={Gridcolumns}
                            className="  -highlight "
                            defaultPageSize={10}
                            defaultSorted={[
                                {
                                    id: 'Date',
                                    desc: true,
                                }
                            ]}
                            getTrProps={(state, rowInfo, column, instance) => { return { onClick: () => { this.handleCrudToggle(rowInfo.original,'Display') } } }}
                        />
                    </div>
                    <div align="right" style={{ marginBottom: '60px' }}>
                        <span style={{ fontSize: '40px' }} className="glyphicon glyphicon-plus-sign" onClick={() => this.handleCrudToggle('','Add')} ></span>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    flags: state.UserReducer,
    trade: state.SearchReducer.Data.SearchData
})

const mapDispatchToProps = (dispatch) => {
    return {
        toggle: (name, flag, disable, disableFields, data, Operation) => {
            dispatch(Toggle(name, flag, disable, disableFields, data, Operation))
        },
        refresh: (Url, data) => {
            dispatch(FetchSearchData(Url, data))
        }


    }
}
const value =
    {
        StartDate:new Date(new Date().setDate(new Date().getDate()-160)).toISOString().slice(0,10),
        EndDate: new Date().toISOString().slice(0,10),
        CommodityName: null,
        PartyName: null,
        LocName: null,
        Side: null,
    }


export default connect(mapStateToProps, mapDispatchToProps)(AddStock);

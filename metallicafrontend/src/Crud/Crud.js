import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Crud.css'
import { Toggle } from '../Actions/Toggle'
import { reduxForm, Field } from 'redux-form'
import { PostTrade, UpdateTrade, DeleteTrade } from './CrudAction'
import { FetchSearchData } from '../Search/SearchAction';
import { renderField, renderSelect, renderRadioGroup } from './Form'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import { TradeUrl } from '../ConfigFiles/Config'

class Crud extends Component {
    constructor() {
        super();
        this.state = {
            Date: new Date().getDate() + '/' + (new Date().getMonth() + 1) + "/" + (new Date().getFullYear()),
            Id: '',
            prev: '',
        };



    }
    submit = (data) => {
        data.UserId = sessionStorage.getItem('UserId');
        if (this.props.data.Operation === 'Edit')
            this.props.UpdateTrade(TradeUrl.Url + "/" + this.state.Id, data)
        else
            this.props.PostTrade(TradeUrl.Url, data)
            
        this.props.toggle('', true, true, false, '', '');

        this.resetme.click();

    }

    handleEdit(heading, flag) {

        this.props.toggle(heading, flag, true, false, this.props.data.Data, 'Edit');
    }

    handleDelete() {
        this.props.Delete(TradeUrl.Url + "/" + this.state.Id)
     //   this.props.refreshGrid(TradeUrl.filterTradeUrl, value);
        this.props.toggle('', true, false, false, this.props.data.Data, 'Delete');
        this.resetme.click();
    }


    componentWillUpdate(nextProps) {
        if (nextProps.data.Operation === 'Display') {
            this.props.change('Price', nextProps.data.Data.Price)
            this.props.change('Quantity', nextProps.data.Data.Quantity)
            nextProps.data.Data.Side === "Buy"? this.props.change('Side', '0') : this.props.change('Side', '1')
            if (this.state.Date !== nextProps.data.Data.Date && nextProps.data.Data.Date) {
                this.setState({ Date: nextProps.data.Data.Date },
                    this.setState({ Id: nextProps.data.Data.Id }))
            } this.props.change('CommodityId', nextProps.data.Data.CommodityId)
            this.props.change('LocationId', nextProps.data.Data.LocationId)
            this.props.change('CounterPartyId', nextProps.data.Data.CounterPartyId)
        }

        if (this.state.prev !== nextProps.data.Operation) {
            this.setState({ prev: nextProps.data.Operation })
            if (this.state.prev !== 'AddStock' && nextProps.data.Operation === 'AddStock') {
                this.resetme.click();
            }
        }
    }


    render() {

        const { handleSubmit, touched, error, reset } = this.props
        return (

            <div className=" animate fade one" hidden={this.props.data.visible} style={{boxShadow: 'inset 0 4px 38px 4px #dbecfa',transition:'hidden 3s'}}>
                <div className="row">
                    <div className="col-lg-4 col-md-2 col-sm-2 col-xs-2"></div>
                    <div className="col-lg-4 col-md-5 col-sm-5 col-xs-5">
                        <legend><h3 style={{ textAlign: 'center' }}>{this.props.data.name}</h3></legend>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-5 col-xs-5" style={{ fontSize: '20px' }}>
                        <span hidden={!(this.props.data.Operation === "Display" || this.props.data.Operation === "Edit")}>
                            <i className="glyphicon glyphicon-trash" onClick={() => this.handleDelete()}></i>
                            <i className="glyphicon glyphicon-edit" onClick={() => this.handleEdit("Edit", false)}></i>
                        </span>
                        <i className="glyphicon glyphicon-remove" onClick={() => this.handleEdit("Delete", true)} ></i>
                    </div>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <form onSubmit={handleSubmit(this.submit)} >
                        <div className="row"  >
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-3 col-sm-2" style={{ fontSize: '15px' }}>
                                <Field name="Side" component={renderRadioGroup}>
                                    <RadioButton value='0' label="Buy" disabled={this.props.data.disableFields} />
                                </Field>
                                <Field name='Side' component={renderError} />
                            </div>
                            <div className="col-md-3 col-sm-2" style={{ fontSize: '15px' }}>
                                <Field name="Side" component={renderRadioGroup}>
                                    <RadioButton value='1' label="Sell" disabled={this.props.data.disableFields} />
                                </Field>
                            </div>
                            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                                <label style={{ marginRight: '20px', fontSize: '15px', float: 'right' }}>{this.props.data.Operation !== "AddStock" ? this.state.Date : new Date().toLocaleDateString()}
                                </label>
                            </div>
                        </div>

                        <Field name="CommodityId" component={renderSelect} label="Commodity" disabled={this.props.data.disableFields}>
                            {this.props.Commodity ? this.props.Commodity.map(option => (
                                <MenuItem value={option.value} key={option.value} primaryText={option.label} />)) : false}
                        </Field>


                        <Field name="Quantity" component={renderField} label="Quantity" type="text" disabled={this.props.data.disableFields} />

                        <Field name="Price" component={renderField} label="Price" type="text" disabled={this.props.data.disableFields} />

                        <Field name="CounterPartyId" component={renderSelect} label="CounterParty" disabled={this.props.data.disableFields}>
                            {this.props.Counterparty ? this.props.Counterparty.map(option => (
                                <MenuItem value={option.value} key={option.value} primaryText={option.label} />)) : false}
                        </Field>

                        <Field name="LocationId" component={renderSelect} label="Location" disabled={this.props.data.disableFields}>
                            {this.props.Location ? this.props.Location.map(option => (
                                <MenuItem value={option.value} key={option.value} primaryText={option.label} />)) : false}
                        </Field>

                        <div className="row" style={{ marginTop: '20px' }} align="center">
                            <button type="submit" className='btn btn-info' disabled={this.props.data.disableFields} style={{ width: '90px', marginBottom: '10px', marginRight: '20px' }}>submit</button>
                            <button type="reset" className='btn btn-info' disabled={this.props.data.disableFields} style={{ width: '90px', marginBottom: '10px' }} onClick={reset} ref={(input) => this.resetme = input}>Reset</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

const renderError = ({ meta: { touched, error } }) =>
    touched && error ? <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{error}</span> : false

const validate = values => {

    const errors = {}
    if (!values.Price) {
        errors.Price = 'Required'
    } else if (isNaN(Number(values.Price))) {
        errors.Price = 'Not a number'
    }
    if (values.Price && !/^(\d{1,5}|\d{0,5}\.\d{1,2})$/i.test(values.Price)) {
        errors.Price = 'Can have upto 2 decimal places'
    }

    if (!values.CounterPartyId) {
        errors.CounterPartyId = 'Required'
    }
    if (!values.CommodityId) {
        errors.CommodityId = 'Required'
    }

    if (!values.LocationId) {
        errors.LocationId = 'Required'
    }

    if (!values.Side) {
        errors.Side = 'Required'
    }
    if (!values.Quantity) {
        errors.Quantity = 'Required'
    } else if (isNaN(Number(values.Quantity))) {
        errors.Quantity = 'Not a number'
    }
    return errors
}


const mapStateToProps = state => ({
    data: state.UserReducer,
    Counterparty: state.Counterparty.Data.Counterparties,
    Location: state.Location.Data.Locations,
    Commodity: state.Commodity.Data.Commodities,
});

const mapDispatchToProps = dispatch => {

    return {
        toggle: (name, flag, disable, disableFields, data, Operation) => {
            dispatch(Toggle(name, flag, disable, disableFields, data, Operation))
        },
        PostTrade: (PostUrl, OrderDetails) => {
            dispatch(PostTrade(PostUrl, OrderDetails))
        },
        UpdateTrade: (UpdateUrl, OrderDetails) => {
            dispatch(UpdateTrade(UpdateUrl, OrderDetails))
        },
        Delete: (Url) => {
            dispatch(DeleteTrade(Url))
        }
    }
}

Crud = reduxForm({
    form: 'Crud',
    validate,

})(Crud)

export default connect(mapStateToProps, mapDispatchToProps)(Crud);
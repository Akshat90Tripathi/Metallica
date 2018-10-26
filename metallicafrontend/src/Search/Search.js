import React from 'react'
import { connect } from 'react-redux'
import { FetchCommodityData } from '../Actions/FetchCommodityData'
import { FetchLocationData } from '../Actions/FetchLocationData'
import { FetchCounterPartyData } from '../Actions/FetchCounterPartyData'
import { RefDataUrls ,TradeUrl} from '../ConfigFiles/Config'
import { FetchSearchData } from './SearchAction'
import { reduxForm, Field } from 'redux-form'
import { renderField, renderSelectField, renderCheckbox } from './Form.js'
import MenuItem from 'material-ui/MenuItem'

import './SearchStyle.css'

class Search extends React.Component {
    constructor() {
        super();
        this.Id = [];
        
        this.todaysDate=new Date().toISOString().slice(0,10)
        this.DaybeforeYesterdayDate=new Date(new Date().setDate(new Date().getDate()-190)).toISOString().slice(0,10);
    }

    componentDidMount() {
        this.reset()
        this.props.fetchd(RefDataUrls.CommodityUrl.url, RefDataUrls.LocationUrl.url, RefDataUrls.CounterPartyUrl.url)
        this.props.Filter(TradeUrl.filterTradeUrl, value);     
    }

    reset(){
       
        this.props.change('EndDate',this.todaysDate)
        this.props.change('StartDate',this.DaybeforeYesterdayDate)
        this.props.change('CommodityName',null)
        this.props.change('PartyName',null)
        this.props.change('LocName',null)
        this.props.change('Buy',null)
        this.props.change('Sell',null)
        }
    
        submit(values){
        if (values.Buy && values.Sell)
            values.Side = null;
        else if (values.Sell )
            values.Side = 1;
        else if (values.Buy )
            values.Side = 0;
        else
            values.Side = null
        this.props.Filter(TradeUrl.filterTradeUrl, values) 
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="search mg0" >
                <div className="row search_div mg0">
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                        <div className="col-md-2">
                            <label htmlFor="StartDate">StartDate</label>
                            <Field name="StartDate" component={renderField} type="date" />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="EndDate">EndDate</label>
                            <Field name="EndDate" component={renderField} type="date" />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="Commodity">Commodity</label>
                            <Field name="CommodityName" component={renderSelectField} label="Commodity" >
                              {this.props.Commodity?this.props.Commodity.map(option => (
                                 <MenuItem value={option.value} key={option.value} primaryText={option.label}/> )):false} 
                            </Field>
                        </div>
                        <div className="col-md-1">
                            <div className="checkbox">
                                <Field name="Buy" component={renderCheckbox} label="Buy" />
                            </div>
                            <div className="checkbox">
                                <Field name="Sell" component={renderCheckbox} label="Sell" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="CounterParty">CounterParty</label>
                            <Field name="PartyName" component={renderSelectField} label="CounterParty" >
                              {this.props.Counterparty?this.props.Counterparty.map(option => (
                                 <MenuItem value={option.value} key={option.value} primaryText={option.label}/> )):false} 
                            </Field>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="Location">Location</label>
                            <Field name="LocName" component={renderSelectField} label="Location" >
                            {this.props.Location?this.props.Location.map(option => (
                                 <MenuItem value={option.value} key={option.value} primaryText={option.label}/> )):false} 
                            </Field>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-3 col-xs-4" style={{padding:'0px 15px 0px 0px'}}>
                            <button type="Submit" className="btn btn-info search_btn">Submit</button>
                            <button type="Reset" className="btn btn-info search_btn" onClick={()=>this.reset()}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        )

    }
}


const mapStateToProps = state => ({
    Counterparty: state.Counterparty.Data.Counterparties,
    Location: state.Location.Data.Locations,
    Commodity: state.Commodity.Data.Commodities,
    trade: state.FilterTrade,
    Login: state.LoginReducer

});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchd: (Url, Url1, Url2) => {
            dispatch(FetchLocationData(Url1))
            dispatch(FetchCommodityData(Url))
            dispatch(FetchCounterPartyData(Url2))
        },

        Filter: (filterTradeUrl, data) => {
            dispatch(FetchSearchData(filterTradeUrl, data))
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



    Search = reduxForm({
    form: 'Search',
})(Search)

export default connect(mapStateToProps, mapDispatchToProps)(Search);
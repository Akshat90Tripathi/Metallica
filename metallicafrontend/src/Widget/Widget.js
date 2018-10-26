import React from 'react'
import { FetchLiveMarketData } from '../Actions/FetchLiveMarketData'
import { connect } from "react-redux";
import { RefDataUrls } from '../ConfigFiles/Config'
import { subscribeToLiveMarket } from './WidgetSocket'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Widget extends React.Component {
    constructor(props) {
        super();
        this.i = 0;
        this.state = {
            LiveMarket: null
        }
        subscribeToLiveMarket((err, marketData) => {
            this.setState({ LiveMarket: marketData.data });
                marketData.Description ? toast.success(marketData.Description) : false
        });
    }
    componentWillMount() {
        this.props.fetchd(RefDataUrls.LiveMarketUrl.url)
    }

    componentWillUpdate(nextProps) {
        if (this.state.LiveMarket !== nextProps.LiveMarketdata) {
            if (!this.interval) {
                this.setState({ LiveMarket: nextProps.LiveMarketdata })
                this.interval = setInterval(() => { this.ticker() }, 2000)
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    ticker() {
        if (this.state.LiveMarket !== null)
            if (this.i < this.state.LiveMarket.length) {
                document.getElementById("d1").innerHTML = this.state.LiveMarket[this.i++].Description + " : " + this.state.LiveMarket[this.i - 1].Price
                document.getElementById("d2").innerHTML = this.state.LiveMarket[this.i++].Description + " : " + this.state.LiveMarket[this.i - 1].Price
            }

            else {
                this.i = 0;
                if (this.i < this.state.LiveMarket.length) {
                    document.getElementById("d1").innerHTML = this.state.LiveMarket[this.i++].Description + " : " + this.state.LiveMarket[this.i - 1].Price
                    document.getElementById("d2").innerHTML = this.state.LiveMarket[this.i++].Description + " : " + this.state.LiveMarket[this.i - 1].Price

                }
            }


    }

    render() {

        return (
            <div style={{boxShadow: 'inset 0 4px 28px 4px #dbecfa', minHeight: '70px' }} >
                <div className="header" align="center">
                    <h3 className="mg0">  <strong>Live </strong><strong  className=" animate1 two Disco">Market</strong></h3>
                </div>
                <div className="row mg0" style={{ fontSize: '18px', fontWeight:'bold',fontSize:'20px'}} align="center">
                    <div className="col-lg-6 col-md-6 col-sm-6 animate fadeDown two" id="d1"  >
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6  animate fadeDown two" id="d2">
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    LiveMarketdata: state.LiveMarket.Data.Livemarkets,

    LiveMarket: state.LiveMarket

});


const mapDispatchToProps = (dispatch) => {
    return {
        fetchd: (Url) => {
            dispatch(FetchLiveMarketData(Url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

import React, {Component} from 'react'
import axios from 'axios'
import FormattedPrice from './FormattedPrice'

export default class Ticker extends Component{
    constructor(props){
        super(props)
        this.state ={
            bid: 10,
            ask: 10
        }
        this.updatePrice = this.updatePrice.bind(this)
    }

    updatePrice(){
        axios.get('https://www.bitstamp.net/api/v2/ticker/btcusd')
        .then( res=> {
            this.setState({
                bid: res.data.bid,
                ask: res.data.ask,
            })
        })


    }

    componentDidMount(){

        this.updatePrice()
        let seconds = 1
        let the_interval = seconds* 1000
        setInterval(this.updatePrice, the_interval)

    }

    render(){
        return(
            <div className="er">
                <h4 id="btcusd">Bitcoin T</h4>
                Compra
                <div className="bid">
                    <div className="currency">USD</div>
                    <FormattedPrice price={this.state.bid} size="big" />
                </div>
                <hr className="dashed"/>
                Venta
                <div className="ask">
                    <div className="currency">USD</div> 
                    <FormattedPrice price={this.state.ask} size="small"/>
                </div>
            </div>

        )
    }

}
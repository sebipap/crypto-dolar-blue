import React, {Component} from 'react'
import axios from 'axios'
import FormattedPrice from './FormattedPrice'

export default class ER extends Component{
    constructor(props){
        super(props)
        this.state ={
            bid: this.props.coin.bid,
            ask: this.props.coin.ask,
            id: "",
            ticker: this.props.coin.ticker
        }

        this.updatePrice = this.updatePrice.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }

    changeColor() {
        this.setState({
            ...this.state,
            id: this.props.coin.symbol 
        })
        setTimeout( () => {
            this.setState({
                ...this.state,
                id: '',
            })
        }, 1000);
    }


    updatePrice(){
        axios.get('https://www.bitstamp.net/api/v2/ticker/' + this.props.coin.symbol + '/')
        .then( res => {
            this.changeColor()
            this.setState({
                bid: res.data.bid ,
                ask: res.data.ask ,
            })
        })
        .catch(err => console.log('no response'+ err))

    }
    
    componentDidMount(){
        this.setState({
            bid: this.props.coin.bid,
            ask: this.props.coin.ask,
            id: "",
            ticker: this.props.coin.ticker
        })
        if(this.state.ticker == true){
            this.updatePrice()
            let seconds = 3 
            let the_interval = seconds* 1000
            setInterval(this.updatePrice, the_interval)
        }
    }

    render(){

        return(
            <div className="er" id={this.state.id}>
                <h4 id={this.props.coin.symbol}>{this.props.coin.name}</h4>
                Compra
                <div className="bid">
                    <div className="currency">{this.props.coin.priceIn}</div>
                    <FormattedPrice price={this.state.bid} size="big" />
                </div>
                <hr className="dashed"/>
                Venta
                <div className="ask">
                    <div className="currency">{this.props.coin.priceIn}</div> 
                    <FormattedPrice price={this.props.coin.ask} size="small"/>
                </div>
            </div>

        )
    }

}
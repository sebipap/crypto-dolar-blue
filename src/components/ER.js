import React, {Component} from 'react'
import FormattedPrice from './FormattedPrice'
import axios from 'axios'

export default class ER extends Component {
  constructor(props){
  super(props)
  this.updatePrice = this.updatePrice.bind(this)
}

updatePrice(symbol){
  axios.get('https://www.bitstamp.net/api/v2/ticker/' + symbol +'/')
  .then( res=> {
      this.setState({
          bid: res.data.bid,
          ask: res.data.ask,
      })
  })
  .catch( err => {
    this.setState({
      name: "Error"
    })
  })
}

componentDidMount(){


  if (this.props.coin.symbol==="btcusd" || this.props.coin.symbol==="ethusd"){
    this.updatePrice(this.props.coin.symbol)
    let seconds = 0.5
    let the_interval = seconds* 1000
    setInterval(this.updatePrice(this.props.coin.symbol), the_interval)
  }
}
render(){
  return (

    <div className="er">
      <h4 id={this.props.coin.symbol}>{this.props.coin.name}</h4>
      Compra
      <div className="bid">
        <div className="currency">{this.props.coin.priceIn}  </div>
        <FormattedPrice price={this.props.coin.bid} size="big" />
      </div>

      <hr className="dashed"/>

      Venta
      <div className="ask">
        <div className="currency">{this.props.coin.priceIn} </div> 
        <FormattedPrice price={this.props.coin.ask} size="small"/>
      </div>

    </div>

  )
}
}
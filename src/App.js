import React, {Component} from 'react'
import ER from './components/ER.js'
import axios from 'axios'

export default class App extends Component{
  constructor(){
    super();
    this.state = {
     usdarsblue: {},
     usdarsofficial: {},
     ethusd: {},
     btcusd: {},
     btcars: {},
     usdtars: {},
     usdarsmep: {},
     usdarsliqui: {},
    }
    this.updateCoins = this.updateCoins.bind(this)
    this.updateBTC = this.updateBTC.bind(this)
    this.updateETH = this.updateETH.bind(this)
  }

  componentDidMount(){

    axios.get('/latest')
    .then( res => {
        this.setState({
          usdarsblue: res.data.usdarsblue ,
          usdarsofficial: res.data.usdarsofficial ,
          ethusd: res.data.ethusd ,
          btcusd: res.data.btcusd ,
          btcars: res.data.btcars ,
          usdtars: res.data.usdtars ,
          usdarsmep: res.data.usdarsmep ,
          usdarsliqui: res.data.usdarsliqui ,
        })    
    })
    .catch( () => console.log("error"))

    this.updateCoins()
    let seconds = 5
    let the_interval = seconds* 1000
    setInterval(this.updateCoins, the_interval)

}

  updateCoins(){
    this.updateBTC()
    this.updateETH()
  }

  updateBTC(){
    axios.get('https://www.bitstamp.net/api/v2/ticker/btcusd/',
      {headers: {
        'Access-Control-Allow-Origin': '*'
      }})
    .then( res=> {
        this.setState({
          ...this.state,
          btcusd: {
            ...this.state.btcusd,
            bid: res.data.bid,
            ask: res.data.ask,
          }

        })
    })
}

  updateETH(){
    axios.get('https://www.bitstamp.net/api/v2/ticker/ethusd/',
    {headers: {
      'Access-Control-Allow-Origin': '*'
    }})
    .then( res=> {
        this.setState({
          ...this.state,
          ethusd: {
            ...this.state.ethusd,
            bid: res.data.bid,
            ask: res.data.ask,
          }

        })
    })
  }

  render(){
    
    return(
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2  sidebar">
              <div className="sidebar-sticky">

                <h4>CryptoDolarBlue</h4>
                {/* <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      <span data-feather="home"></span>
                      Dólar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Cryptos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Calculadora
                    </a>
                  </li>
                </ul> */}

              </div>
            </nav>

            <div className="col-md-10">
              <div className="er-category">
                <h2>COTIZACIONES DEL DÓLAR</h2>
                <div className="er-box">
                  <div className="er-container">
                    <ER coin={this.state.usdarsblue}/>
                    <ER coin={this.state.usdarsofficial}/>
                    {/* <ER coin={this.state.usdarsmep}/>
                    <ER coin={this.state.usdarsliqui}/> */}
                  </div>
                </div>
              </div>
              <div className="er-category">
                <h2>COTIZACIONES DE CRIPTOMONEDAS</h2>
                <div className="er-box">
                  <div className="er-container">
                    <ER coin={this.state.btcusd}/>
                    <ER coin={this.state.ethusd}/>
                    <ER coin={this.state.usdtars}/>
                    <ER coin={this.state.btcars}/>
                  </div>
                </div>


        
              </div>
            </div>
          </div>


        </div>
    )
  }
}



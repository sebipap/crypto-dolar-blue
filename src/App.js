import React, {Component} from 'react'
import ER from './components/ER.js'
import axios from 'axios'
import Calc from './components/Calc'


export default class App extends Component{
  constructor(){
    super();
    this.state = {
      erList: [],
      usdarsblue: {},
      usdarsofficial: {},
      eurarsblue: {},
      eurarsofficial: {},
      btcars: {},
      usdtars: {},
      btcusd: {},
      ethusd: {},
      usdeur: {},
      usdgbp: {},
      usdbrl: {},
      usdmxn: {},
      usdcny: {},

     loading: true
    }
  }

  componentDidMount(){  
    axios.get('/latest') 
    .then( res => {
        let coins = res.data

        coins.map( coin => {
          this.setState({
            ...this.state,
            [coin.symbol]: coin
          })
        } )
        this.setState({
          ...this.state,
          erList: coins,
          loading: false
        })

    })
    .catch( () => console.log("error"))
}


  render(){
    if(this.state.loading){
      return(
        <div class="spinner-grow spinner-border m-5 text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )
    }else{
      return(
          <div className="container-fluid">
            <div className="row">
              <nav className="col-md-2  sidebar">
                <div className="sidebar-sticky">
                  <h4>CryptoDolarBlue</h4>
                </div>
              </nav>
              <div className="col-md-10">




                <div className="er-category">
                  <h2>CRIPTOMONEDAS</h2>
                  <div className="er-box">
                    <div className="er-container">
                      <ER coin={this.state.btcusd}/>
                      <ER coin={this.state.ethusd}/>
                      <ER coin={this.state.usdtars}/>
                      <ER coin={this.state.btcars}/>
                    </div>
                  </div>
                </div>

                <div className="er-category">
                  <h2>CAMBIO ARGENTINA</h2>
                  <div className="er-box">
                    <div className="er-container">
                      <ER coin={this.state.usdarsblue}/>
                      <ER coin={this.state.usdarsofficial}/>
                      <ER coin={this.state.eurarsblue}/>
                      <ER coin={this.state.eurarsofficial}/>


                    </div>
                  </div>
                </div>

                <div className="er-category">
                  <h2>DOLAR EN OTROS PAÍSES</h2>
                  <div className="er-box">
                    <div className="er-container">
                      <ER coin={this.state.usdeur}/>
                      <ER coin={this.state.usdgbp}/>
                      <ER coin={this.state.usdbrl}/>
                      <ER coin={this.state.usdmxn}/>
                      <ER coin={this.state.usdcny}/>
                    </div>
                  </div>
                </div>

                <div className="er-category">
                  <h2>CALCULADORA</h2>
                      <Calc erList={this.state.erList} />
                </div>


              </div>
            </div>
          </div>
      )

    }
  }
}



import React, {Component} from 'react'
import ER from './components/ER.js'
import axios from 'axios'
import Calc from './components/Calc'


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
     loading: true
    }
  }

  componentDidMount(){

    axios.get('/latest')
    .then( res => {
        this.setState({
          usdarsblue: res.data.usdarsblue ,
          usdarsofficial: res.data.usdarsofficial ,
          eurarsblue: res.data.eurarsblue ,
          eurarsofficial: res.data.eurarsofficial ,
          ethusd: res.data.ethusd ,
          btcusd: res.data.btcusd ,
          btcars: res.data.btcars ,
          usdtars: res.data.usdtars ,
          usdarsmep: res.data.usdarsmep ,
          usdarsliqui: res.data.usdarsliqui ,
          loading: false
        })    
    })
    .catch( () => console.log("error"))
}


  render(){
    if(this.state.loading){
      return(
      <h1>Loading...</h1>
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

                <Calc ers={this.state} />
                
                <div className="er-category">
                  <h2>DIVISAS ARGENTINA</h2>
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
}



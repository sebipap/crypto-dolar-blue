import React, {Component} from 'react'

export default class Calc extends Component {
    constructor(props){
        super(props)
        this.state = {
            exRateType: "blue",
            from: {
                currency: "",
                value: 0
            },
            to: {
                currency: "",
                value: 0
            }
        }
        this.handleExRateType = this.handleExRateType.bind(this)
    }
    handleExRateType(e){
        this.setState({
            ...this.state,
            exRateType: e.target.value
        })

    }


    render(){




        return(
            <div className="calc">
                <h3>Calculadora</h3>
                <br/>
                Tipo de Cambio
                <br/>
                <div class="btn-group" role="group">

                    {this.state.exRateType==='blue' ?
                        <>
                            <button type="button" value="official" onClick={this.handleExRateType} class="btn btn-outline-success">Oficial</button>
                            <button type="button" value="blue"  onClick={this.handleExRateType} class="btn btn-primary">Blue</button>
                        </>
                    :
                        <>
                            <button type="button" value="official" onClick={this.handleExRateType} class="btn btn-success">Oficial</button>
                            <button type="button" value="blue" onClick={this.handleExRateType} class="btn btn-outline-primary">Blue</button>
                        </> 
                    }   
                </div>
                <br/>

                <div id="calc-section">
                    <label>De</label>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                        </div>
                        <select class="custom-select" id="inputGroupSelect01">
                            <option selected>Elegir moneda</option>
                            <option value="usd">Dólar</option>
                            <option value="usd">Peso Argentino</option>
                            <option value="eur">Euro</option>
                            <option value="btc">Bitcoin</option>
                            <option value="eth">Etherum</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">BTC</span>
                        </div>
                        <input type="number" class="form-control" aria-label="Dollar amount (with dot and two decimal places)"/>
                    </div>
                </div>
                <br/>
                <div id="calc-section">
                    <label>A</label>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                        </div>
                        <select class="custom-select" id="inputGroupSelect01">
                            <option selected>Elegir moneda</option>
                            <option value="usd">Dólar</option>
                            <option value="usd">Peso Argentino</option>
                            <option value="eur">Euro</option>
                            <option value="btc">Bitcoin</option>
                            <option value="eth">Etherum</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">BTC</span>
                        </div>
                        <input type="number" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" readOnly/>
                    </div>
                </div>

            </div>
        )
    }   
}
import React, {Component} from 'react'

export default class Calc extends Component {
    constructor(props){
        super(props)
        this.state = {
            exRateType: "blue",
            currencyA: "",
            valueA: "",
            currencyB: "",
            valueB: "",
        
        }
        // this.handleInputs = this.handleInputs.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.makeConversion = this.makeConversion.bind(this)

    }



    handleChange(e) {
        this.makeConversion(e)
    }

    makeConversion(e){

        let localA = this.state.valueA
        let exRateType = this.state.exRateType
        let currencyA = this.state.currencyA
        let currencyB = this.state.currencyB

        switch (e.target.name) {
            case "currencyA":
                currencyA = e.target.value
                break;
                
                case "currencyB":
                    currencyB = e.target.value
                break;
                
            case "valueA":
                localA = e.target.value
                break;
                
            case "exRateType":
                exRateType = e.target.value
                break;
                
            default:
                break

            }      
                     
        // exchange rates are defined compared to 1 USD
        let exRates = {}

        this.props.erList.map( er => {
            exRates = {
                ...exRates,
                [er.symbol]: er.avg
            }
        } )

        exRates.usdusd = 1
        exRates.usdbtc = 1 / exRates.btcusd
        exRates.usdeth = 1 / exRates.ethusd

        let exRateNameA = "usd" + currencyA
        if(currencyA==="ars"){
            exRateNameA=exRateNameA + exRateType 
        }


        let exRateNameB = "usd" + currencyB
        if(currencyB==="ars"){
            exRateNameB=exRateNameB + exRateType
        }
        
        let localB = ( localA / exRates[exRateNameA]) * exRates[exRateNameB];

        if(localB >= 10){
            localB =  Math.round(localB*100) /100 
        }

        this.setState({
            ...this.state,
            valueB: localB,
            [e.target.name]: e.target.value,

        })

    }

    render(){
        return(
            <div className="calc">
                <div className="calc-head ">
                <div className="row">
                    <div className="float-left col-md-4 margin-auto">
                        <h6>Tipo de Cambio</h6>
                    </div>

                    <div className="btn-group float-right col-md-8" role="group">

                        {this.state.exRateType === 'blue' ?
                            <>
                                <button type="button" name="exRateType" value="official" onClick={this.handleChange} className="btn btn-secondary">Oficial</button>
                                <button type="button" name="exRateType" className="btn btn-primary">Blue ☑️</button>
                            </>
                            :
                            <>
                                <button type="button" name="exRateType" className="btn btn-success">Oficial ✅</button>
                                <button type="button" name="exRateType" value="blue" onClick={this.handleChange} className="btn btn-secondary">Blue</button>
                            </>
                        }
                    </div>
                    <br />
                </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="calc-section">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <select className="custom-select" name="currencyA" id="inputGroupSelect01" onInput={this.handleChange}>
                                    <option selected>Elegir moneda</option>
                                    <option value="usd">Dólar</option>
                                    <option value="ars">Peso Argentino</option>
                                    <option value="eur">Euro</option>
                                    <option value="btc">Bitcoin</option>
                                    <option value="eth">Etherum</option>
                                    <option value="brl">Real Brasilero</option>
                                    <option value="gbp">Libra Esterlina</option>
                                    <option value="mxn">Peso Mexicano</option>
                                    <option value="cny">Yuan Chino</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">{this.state.currencyA}</span>
                                </div>
                                <input type="numbexRates" className="form-control" name="valueA" value={this.state.valueA} onInput={this.handleChange} aria-label="Dollar amount (with dot and two decimal places)" />
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="col-md-6">
                        <div className="calc-section">

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <select className="custom-select" name="currencyB" id="inputGroupSelect01" onInput={this.handleChange}>
                                    <option selected>Elegir moneda</option>
                                    <option value="usd">Dólar</option>
                                    <option value="ars">Peso Argentino</option>
                                    <option value="eur">Euro</option>
                                    <option value="btc">Bitcoin</option>
                                    <option value="eth">Etherum</option>
                                    <option value="brl">Real Brasilero</option>
                                    <option value="gbp">Libra Esterlina</option>
                                    <option value="mxn">Peso Mexicano</option>
                                    <option value="cny">Yuan CHino</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">{this.state.currencyB}</span>
                                </div>
                                <input type="numbexRates" className="form-control" value={this.state.valueB} aria-label="Dollar amount (with dot and two decimal places)" readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}
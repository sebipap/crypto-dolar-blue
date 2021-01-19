import React, {Component} from 'react'

export default class Calc extends Component {
    constructor(props){
        super(props)
        this.state = {
            exRateType: "blue",
            currencyA: "",
            valueA: 0,
            currencyB: "",
            valueB: 0,
        
        }
        this.handleChange = this.handleChange.bind(this)
        this.makeConversion = this.makeConversion.bind(this)

    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
          })
      }

    makeConversion(){

        // 1 - Pasar lo de A a dolares
        // 2- Pasar ese resultado a la moneda B

        let localA = this.state.valueA
        let usdA 

        const usdarsblue = this.props.ers.usdarsblue.avg
        const usdarsofficial = this.props.ers.usdarsofficial.avg
        const eurarsblue = this.props.ers.eurarsblue.avg
        const eurarsofficial = this.props.ers.eurarsofficial.avg
        const btcusd = this.props.ers.btcusd.avg
        const ethusd = this.props.ers.ethusd.avg
        const eurusd = this.props.ers.eurarsofficial / this.props.ers.usdarsofficial




        switch (this.state.currencyA) {
            case "usd":
                usdA = localA
                break;

            case "eur":
                usdA = localA * eurusd
                break;

            case "ars":
                if(this.state.exRateType === "blue"){
                    usdA = localA / usdarsblue
                }else{
                    usdA = localA / usdarsofficial
                }
                break;

            case "btc":
                usdA = localA * btcusd
                break;

            case "eth":
                usdA = localA * ethusd
                break;
        }

        let localB = 0;

        switch (this.state.currencyB) {
            case "usd":
                localB = usdA
                break;

            case "euro":
                localB = usdA / eurusd
                break;

            case "ars":
                if(this.state.exRateType === "blue"){
                    localB = usdA * usdarsblue
                }else{
                    localB = usdA * usdarsofficial
                }
                break;

            case "btc":
                localB = usdA / btcusd
                break;

            case "eth":
                localB = usdA / ethusd


        }

        this.setState({
            ...this.state,
            valueB: localB
        })

    }

    render(){
        return(
            <div className="calc">
                <div className="row">

                <h3>Calculadora</h3>
                </div>
                <div className="row">
                
                    <div className="float-left col-4"><h6>Tipo de Cambio</h6></div>

                    <div className="btn-group float-right col-8" role="group">

                        {this.state.exRateType==='blue' ?
                            <>
                                <button type="button" name="exRateType" value="official" onClick={this.handleChange} className="btn text-muted">Oficial</button>
                                <button type="button" name="exRateType" value="blue"  onClick={this.handleChange} className="btn btn-primary">Blue</button>
                            </>
                        :
                        <>
                                <button type="button" name="exRateType" value="official" onClick={this.handleChange} className="btn btn-success">Oficial</button>
                                <button type="button" name="exRateType" value="blue" onClick={this.handleChange} className="btn text-muted">Blue</button>
                            </> 
                        }   
                                        </div>
                        <br />
                    </div>
                    <div className="row">
                    <div className="col-5 calc-section">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" name="currencyA" onInput={this.handleChange}>
                            <option selected>Elegir moneda</option>
                            <option value="usd">Dólar</option>
                            <option value="ars">Peso Argentino</option>
                            <option value="eur">Euro</option>
                            <option value="btc">Bitcoin</option>
                            <option value="eth">Etherum</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">{this.state.currencyA}</span>
                        </div>
                        <input type="number" className="form-control" name="valueA" value={this.state.valueA} onInput={this.handleChange} aria-label="Dollar amount (with dot and two decimal places)"/>
                    </div>
                </div>
                    <br/>
                    <div className="col-2">
                    <button className="btn" onClick={this.makeConversion}> 	❯ </button>

                    </div>
                    <div className="col-5 calc-section">
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
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">{this.state.currencyB}</span>
                        </div>
                        <input type="number" className="form-control" value={this.state.valueB} aria-label="Dollar amount (with dot and two decimal places)" readOnly/>
                    </div>
                </div>
                </div>
            </div>
        )
    }   
}
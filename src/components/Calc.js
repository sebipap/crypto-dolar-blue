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
            
        

        }

        let usdA 

        const usdarsblue = this.props.ers.usdarsblue.avg
        const usdarsofficial = this.props.ers.usdarsofficial.avg
        const btcusd = this.props.ers.btcusd.avg
        const ethusd = this.props.ers.ethusd.avg
        const eurusd = this.props.ers.eurarsofficial.avg / this.props.ers.usdarsofficial.avg


        console.log(eurusd)

        switch (currencyA) {
            case "usd":
                usdA = localA
                break;

            case "eur":
                usdA = localA * eurusd
                break;

            case "ars":
                if(exRateType === "blue"){
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

        switch (currencyB) {
            case "usd":
                localB = usdA
                break;

            case "eur":
                localB = usdA / eurusd
                break;

            case "ars":
                if(exRateType === "blue"){
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
                break;


        }
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
                    <div className="col-6 calc-section">
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

                    <div className="col-6 calc-section">
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
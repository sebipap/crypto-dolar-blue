const axios = require('axios')
const fs = require('fs')

const writeJSON = obj => {
    let jsonContent = JSON.stringify(obj)
    fs.writeFile("latest.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.")
            return console.log(err)
        }
     
        console.log("JSON file has been saved.")
    })
}


const apiRequest = () => {

    Promise.all([
        axios.get('https://api.bluelytics.com.ar/v2/latest'),        // [0]
        axios.get('https://api.satoshitango.com/v2/ticker') ,         // [1]
        axios.get('https://www.bitstamp.net/api/v2/ticker/btcusd/'), // [2]
        axios.get('https://www.bitstamp.net/api/v2/ticker/ethusd/') // [3]
    ])
    .then(res => {
        return ({
            usdarsblue: {
                symbol: 'usdarsblue',
                name: 'Dólar Blue',
                bid: res[0].data.blue.value_sell,
                ask: res[0].data.blue.value_buy,
                priceIn: 'ARS',
                ticker: false
            },

            usdarsofficial: {
                symbol: 'usdarsofficial',
                name: 'Dólar Oficial',
                bid: res[0].data.oficial.value_sell,
                ask: res[0].data.oficial.value_buy,
                priceIn: 'ARS',
                ticker: false
            },

            ethusd: {
                symbol: 'ethusd',
                name: 'Etherum',
                bid: res[3].data.bid,
                ask: res[3].data.ask,
                priceIn: 'USD',
                ticker: true
            },

            btcusd: {
                symbol: 'btcusd',
                name: 'Bitcoin',
                bid: res[2].data.bid,
                ask: res[2].data.ask,
                priceIn: 'USD',
                ticker: true
            },

            btcars: {
                symbol: 'btcars',
                name: 'Bitcoin | Peso',
                bid: res[1].data.data.compra.arsbtc,
                ask: res[1].data.data.venta.arsbtc,
                priceIn: 'ARS',
                ticker: false
            },
        
            usdtars: {
                symbol: 'usdtars',
                name: 'USDT | Peso',
                bid: res[1].data.data.compra.arsbtc/res[2].data.bid,
                ask: res[1].data.data.venta.arsbtc/res[2].data.ask,
                priceIn: 'ARS',
                ticker: false
            },
            
            usdarsmep:{
                symbol: 'usdarsmep',
                name: 'Dólar Bolsa',
                bid: 0,
                ask: 0,
                priceIn: 'ARS',
                ticker: false
            },
            
            usdarsliqui:{
                symbol: 'usdarsliqui',
                name: 'Dólar C.C.L',
                bid: 0,
                ask: 0,
                priceIn: 'ARS',
                ticker: false
            }
        })
    })
.then(er => writeJSON(er))

}

const getExRates = () => {
    apiRequest()
    var minutes = 60
    the_interval = minutes* 60* 1000
    setInterval(apiRequest, the_interval)
}

module.exports = getExRates;


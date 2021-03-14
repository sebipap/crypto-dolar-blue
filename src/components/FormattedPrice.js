import React from 'react'

export default function FormattedPrice(props) {

const price = props.price
let k = 0;
let m = 0;
let n = 0;
let c = 0;
let big = "";
let small = "";

export default function FormattedPrice(props) {

const price = props.price
let k = 0;
let m = 0;
let n = 0;
let c = 0;
let big = "";
let small = "";
let mini = "";
let micro = "";


// 10^7

if(price>=10000000 ){
    m =  Math.trunc(Math.round(price)/1000000)
    small = m
    n = price - m * 1000000
    micro=Math.round(n)
    
}

// 10^6

if(price>=1000000 && price<10000000){
    m =  Math.trunc(Math.round(price)/1000000)
    small = m
    n = Math.round(price-m*1000000)
    let zeroAmount = 6 - n.toString().length
    mini = "0".repeat(zeroAmount) + n
}

// 10 ^ 5
if(price>=10000 && price<999999){
    k =  Math.trunc(Math.round(price)/1000)
    big = k
    n = Math.round(price-k*1000)
    let zeroAmount = 3 - n.toString().length
    small = "0".repeat(zeroAmount) + n

} 

// 10 ^ 4

if(price<10000 && price>999){
    big=Math.round(price)
}

// 10 ^ 0

if(price<=999 && price>=1){
    n = Math.trunc(price)
    big = n
    c = Math.round((price-n)*100)
    if(c>=10){
        small = "." + c

    }else{
        small = ".0" + c
    }
}

// 10 ^ -1

if(price<1){
    big = 0
    c = Math.round(price*100000)
    let zeroAmount = 5 - (c.toString().length)
    small = "." + "0".repeat(zeroAmount) +c
}



if(props.size==="big"){
    return(
        <>
            <Text style = {[styles.h3, styles.h]}>{big}</Text>
            <Text style = {[styles.h4, styles.h]}>{small}</Text>
            <Text style = {[styles.h5, styles.h]}>{mini}</Text>
            <Text style = {[styles.h6, styles.h]}>{micro}</Text>

        </>
    )
}else if(props.size==="small"){
    return(
        <>
            <Text style = {[styles.h5, styles.h]}>{big}</Text>
            <Text style = {[styles.h6, styles.h]}>{small}</Text>
            <Text style = {[styles.h7, styles.h]}>{mini}</Text>
            <Text style = {[styles.h8, styles.h]}>{micro}</Text>
        </>
        )
}
}

const styles = StyleSheet.create({
    h3: {fontSize: 26 ,color:"blue"},
    h4: {fontSize: 22 ,color:"green"},
    h5: {fontSize: 20 ,color:"yellow"},
    h6: {fontSize: 18 ,color:"white"},
    h7: {fontSize: 16 ,color:"purple"},
    h8: {fontSize: 14 ,color:"orange"},
    // h: {
    //     fontWeight: 'bold',
    //     color: '#efefef'
    // }




})


let mini = "";
let micro = "";


// 10^7

if(price>=10000000 ){
    m =  Math.trunc(Math.round(price)/1000000)
    small = m
    n = price - m * 1000000
    micro=Math.round(n)
}

// 10^6

if(price>=1000000 && price<10000000){
    m =  Math.trunc(Math.round(price)/1000000)
    small = m
    n = price - m * 1000000
    mini=Math.round(n)
}

// 10 ^ 5
if(price>=10000 && price<999999){
    k =  Math.trunc(Math.round(price)/1000)
    big = k
    n = Math.round(price-k*1000)
    let zeroAmount = 3 - n.toString().length
    small = "0".repeat(zeroAmount) + n

} 

// 10 ^ 4

if(price<10000 && price>999){
    big=Math.round(price)
}

// 10 ^ 0

if(price<=999 && price>=1){
    n = Math.trunc(price)
    big = n
    c = Math.round((price-n)*100)
    if(c>=10){
        small = "." + c

    }else{
        small = ".0" + c
    }
}

// 10 ^ -1

if(price<1){
    big = 0
    c = Math.round(price*100000)
    let zeroAmount = 5 - (c.toString().length)
    small = "." + "0".repeat(zeroAmount) +c
}



if(props.size==="big"){
    return(
        <>
            <h2>{big}</h2>
            <h3>{small}</h3>
            <h4>{mini}</h4>
            <h5>{micro}</h5>

        </>
    )
}else if(props.size==="small"){
    return(
        <>
            <h3>{big}</h3>
            <h4>{small}</h4>
            <h5>{mini}</h5>
            <h6>{micro}</h6>
        </>
        )
}




}
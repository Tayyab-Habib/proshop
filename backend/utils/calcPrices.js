export const addDecimals = (num)=>{
    return(Math.round(num * 100) / 100).toFixed(2)
}

export const calcPrices =(orderItems)=>{
     // Calculate items price
     const itemsPrice =addDecimals(orderItems.reduce((acc,item) =>acc + item.price * item.qty, 0 ))
     // Calculate shipping price (if order is over $100 then free, else $10 shipping)
     const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10)

     // Calculate tax price (15%)
     const taxPrice = addDecimals(Number((0.15 *itemsPrice).toFixed(2)))

     // Calculate total price
     state.totalPrice = (
         Number(itemsPrice)+Number(shippingPrice)+Number(taxPrice)
     ).toFixed(2)
return {itemsPrice, shippingPrice, taxPrice, totalPrice}
}  
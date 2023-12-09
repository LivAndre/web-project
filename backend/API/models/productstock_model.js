const productstock_model = (product_id, size, quantity, price) =>{
    let productstock = {
        product_id : product_id,
        size : size,
        quantity : quantity,
        price : price
    }
    
    return productstock
}

module.exports = {
    productstock_model
}
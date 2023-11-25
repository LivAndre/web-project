const transaction_model = (productstock_id, user_id, reference_number, date_of_purchase, price, mode_of_payment) =>{
    let transaction = {
        productstock_id : productstock_id,
        user_id : user_id,
        reference_number : reference_number,
        date_of_purchase : date_of_purchase,
        price : price,
        mode_of_payment : mode_of_payment

    }
    
    return transaction
}

module.exports = {
    transaction_model
}
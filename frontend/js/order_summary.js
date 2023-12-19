const viewOrderSummary = ()=>{
    let cartID = sessionStorage.getItem('cartId');

    const apiUrl = `http://localhost:8000/cart/getAllProducts?cart_id=${cartID}`;

    // Request body is not needed for a GET request
    // Remove the body property from options
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Call the api_client function
    api_client(apiUrl, options, function (response) {
        console.log('Response:', response);
        if (response.successful == false){
            //TO DO: SHOW ERROR MESSAGE
        }
        else{
            if (response.count == 0){
                //TO DO: SHOW NO CART ITEMS
            } 
            else{

                let innerHTML = ""
                let subtotal = 0

                for (let i in response.items){
                    let el = response.items[i]

                    subtotal += el.price

                    innerHTML += `
                    <div class="added-product">
                  <div class="text2">
                    <div class="adidas-yeezy-700-classic">
                     ${el.name}<br>Size: ${el.size.replace(" us", "")}
                    </div>
                    <div class="_1399">₱${el.price}</div>
                  </div>
                  <img class="yeezy-4" src="${el.image}" />
                </div>
                    `
                }

                let tax = parseFloat(150)
                let shipping = parseFloat(120)
                let total = parseFloat(subtotal + tax + shipping)
                document.getElementById("order-summary-products").innerHTML = innerHTML
                document.getElementById("order-summary-subtotal").innerHTML = "₱"+formatNumber(subtotal, true)
                document.getElementById("order-summary-total").innerHTML = "₱"+formatNumber(total, true)

            }
        }
    })
}
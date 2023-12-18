document.addEventListener('DOMContentLoaded', function () {

    console.log("Clicked!")
    const apiUrl = "http://localhost:8000/cart/add-to-cart"
    const addToCartButton = document.getElementById('addToCartButton');

    const cartID = sessionStorage.getItem("cartId");
    const productID = sessionStorage.getItem("selectedProdId");

    console.log(cartID)
    console.log(productID)
    
    addToCartButton.addEventListener('click', function () {
        // Request body
        const requestBody = {
            productstock_id: productID,
            cart_id: cartID,
        };

        // Request headers
        const requestHeaders = {
            'Content-Type': 'application/json',
        };

        // Options for the api_client function
        const options = {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(requestBody),
        };

        // Call the api_client function
        api_client(apiUrl, options, function (response) {
            console.log('Response:', response);
            // Handle the response here
        });
    });
});
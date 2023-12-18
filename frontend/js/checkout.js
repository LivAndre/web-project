document.addEventListener('DOMContentLoaded', function () {
    const cartID = sessionStorage.getItem("cartId");
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
        // Handle the response here
    })
});
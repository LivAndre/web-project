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
        if (response.successful == false){
            //TO DO: SHOW ERROR MESSAGE
        }
        else{
            if (response.count == 0){
                alert(response.message)

            }
            else{
              
           

                let innerHTML = ``

                let subtotal = 0

                for (let i in response.items){
                    let el = response.items[i]

                    subtotal += el.price

                    innerHTML += `
                    <div class="cart-product">
                  <div class="content2">
                    <div class="info">
                      <div class="adidas-yeezy-700-classic">
                        ${el.name}<br>Size: ${el.size.replace(" us", "")}
                      </div>
                      
                    </div>
                    <div class="right-side">
                     
                      <div class="_11000">₱${el.price}</div>
                      <svg
                        class="icon-24-px-close"
                        id = "deleteButton"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 6L18 18"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <img class="yeezy-3" src="${el.image}" />
                </div>
                <svg
                  class="devider"
                  width="536"
                  height="2"
                  viewBox="0 0 536 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1C209.321 1 326.679 1 536 1"
                    stroke="#A3A3A3"
                    stroke-width="0.5"
                  />
                </svg>
                    `
                }

                let tax = parseFloat(150)
                let shipping = parseFloat(120)
                let total = parseFloat(subtotal + tax + shipping)
                document.getElementById("shopping-cart-items").innerHTML = innerHTML
                document.getElementById("cart-subtotal").innerHTML = "₱"+formatNumber(subtotal, true)
                document.getElementById("cart-total").innerHTML = "₱"+formatNumber(total, true)


                const deleteButton = document.getElementById('deleteButton')
                deleteButton.addEventListener('click', function () {
                const apiUrl = `http://localhost:8000/cart/remove/${cartID}`;
          
                  console.log(cartID)
                  // Request body
                  const requestBody = {
                      cart_id: cartID,
                  };
          
                  // Request headers
                  const requestHeaders = {
                      'Content-Type': 'application/json',
                  };
          
                  // Options for the api_client function
                  const options = {
                      method: 'DELETE',
                      headers: requestHeaders,
                      body: JSON.stringify(requestBody),
                  };
          
                  // Call the api_client function
                  api_client(apiUrl, options, function (response) {
                      console.log('Response:', response);
          
                      alert(response.message)
                      // Handle the response here
                      location.reload()
                  });
              });

            


            }
        }


    })
});
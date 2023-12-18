const getUrl = (env)=>{

    let url = ""
    switch (env){
        case "DEV_URL":
            url = "http://localhost:8000"
            break;
        default:
            url = "http://localhost:8000"
    }

    return url

}
// GENERATE CART ID REFERENCE
function generateCartId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const cartId = `cart_${timestamp}`;
    return cartId;
  }
  window.onload = function () {
    let cartId = "";
    const cartIdContainerHomepage = document.getElementById('cartIdContainer');
    if (cartIdContainerHomepage.hasAttribute('value')){
        cartId = cartIdContainerHomepage.getAttribute('value');
        if (!(cartId !== null && cartId.trim() !== '')) {
            cartId = generateCartId();
            sessionStorage.setItem('cartId', cartId);
        }
        console.log("WALANG LAMAN"); 
    }
    
    if (cartIdContainerHomepage) {
        cartIdContainerHomepage.setAttribute('value',cartId);
    }
  };
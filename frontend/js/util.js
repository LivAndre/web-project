//MAAM MAY ERROR DITO
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
    const timestamp = new Date().getTime() // Get current timestamp
    const cartId = `cart_${timestamp}`
    return cartId
  }
  window.onload = function () {
    let cartId = ""
    const cartIdContainerHomepage = document.getElementById('cartIdContainer')
    if (cartIdContainerHomepage.hasAttribute('value')){
        cartId = cartIdContainerHomepage.getAttribute('value')
        if (!(cartId !== null && cartId.trim() !== '')) {
            cartId = generateCartId()
            sessionStorage.setItem('cartId', cartId)
        }
    }
    
    if (cartIdContainerHomepage) {
        cartIdContainerHomepage.setAttribute('value',cartId)
    }
  }

function formatNumber(value, isDecimal) {

    let numberFractions = (isDecimal ? 2 : 0)
    const options = {
        style: 'decimal', 
        minimumFractionDigits: numberFractions,
        maximumFractionDigits: numberFractions,
      }
    
    const formattedWithOptions = value.toLocaleString('en-US', options)
    return formattedWithOptions
}
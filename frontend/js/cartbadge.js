function getCartCount() {
    var cartCountCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cartCount\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return parseInt(cartCountCookie) || 0;
  }
  
  function setCartCount(count) {
    var cartBadge = document.getElementById("cartBadge");
    cartBadge.textContent = count;

    // Set the cart count in a cookie (expires in 7 days)
    document.cookie = "cartCount=" + count + "; expires=" + new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
  }
  
  function incrementCart() {
    var currentCount = getCartCount();
    setCartCount(currentCount + 1);
  }
  
  function decrementCart() {
    var currentCount = getCartCount();

    // Ensure the count doesn't go below 0
    if (currentCount > 0) {
      setCartCount(currentCount - 1);
    }
  }
  
  window.addEventListener('load', function () {
    setCartCount(getCartCount());
  });
  
  // Add event listeners to buttons or elements on the page
  document.getElementById("addToCartButton").addEventListener("click", incrementCart);
  document.getElementById("deleteButton").addEventListener("click", decrementCart);

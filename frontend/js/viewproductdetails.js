function initializeProdDetails(){

    let productId = sessionStorage.getItem("selectedProdId") === null ? 1 : sessionStorage.getItem("selectedProdId")
    console.log(productId)
    let url = `http://localhost:8000/productstocks/view/${productId}`
    let content = {
        "method": "GET",
        "headers": {

        }
    }
    
    api_client(url, content, (response)=>{
        if (response.successful == true){
            // console.log(JSON.stringify(response.data))
            let productName = response.data[0].name
            let productBrand = response.data[0].brand_name
            let productDescription = response.data[0].description
            let productPrice = response.data[0].price
            let productImg = response.data[0].main_img
            document.getElementById("product-brand-top").innerHTML = productBrand
            document.getElementById("product-name-top").innerHTML = productName
            document.getElementById("product-name").innerHTML = productName
            document.getElementById("product-price").innerHTML = "$"+productPrice
            document.getElementById("product-desc").innerHTML = productDescription
            document.getElementById("product-main-img").src = productImg
            document.getElementById("product-main-img-top").src = productImg
        }
        else{
            console.log(response.message)
        }
    })
    
   
}

// viewProductDetails()
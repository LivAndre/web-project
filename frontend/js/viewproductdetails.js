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
            let productName = response.data[0].name
            let productBrand = response.data[0].brand_name
            let productDescription = response.data[0].description
            let productPrice = response.data[0].price
            let productImg = response.data[0].main_img
            let productTop = response.data[0].top_img
            let productImgBack = response.data[0].back_img

            document.getElementById("product-brand-top").innerHTML = productBrand
            document.getElementById("product-name-top").innerHTML = productName
            document.getElementById("product-name").innerHTML = productName
            document.getElementById("product-price").innerHTML = "₱"+productPrice
            document.getElementById("product-desc").innerHTML = productDescription
            document.getElementById("product-main-img").src = productImg
            document.getElementById("product-main-img-top2").src = productImg
            document.getElementById("product-main-img-back").src = productImgBack
            document.getElementById("product-main-img-top").src = productTop


    
            const mainImg = document.getElementById("product-main-img") 
            const mainImg2 = document.getElementById("product-main-img-top2")
            const backImg = document.getElementById("product-main-img-back")
            const topImg = document.getElementById("product-main-img-top")
            

            backImg.addEventListener("mouseover", () => {
                mainImg.src = backImg.src;
              });
              
            mainImg2.addEventListener("mouseover", () => {
                mainImg.src = mainImg2.src;
            });
              
            topImg.addEventListener("mouseover", () => {
                mainImg.src = topImg.src;
             });


        }
        else{
            console.log(response.message)
        }
    })
    
   
}


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

            let productData = response.data.product_details
            let stockData = response.data.stock_details
            let productName = productData.name
            let productBrand = productData.brand_name
            let productDescription = productData.description
            let productPrice = stockData[0].price
            let productImg = productData.main_img
            let productTop = productData.top_img
            let productImgBack = productData.back_img

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
                mainImg.src = backImg.src
              })
              
            mainImg2.addEventListener("mouseover", () => {
                mainImg.src = mainImg2.src
            })
              
            topImg.addEventListener("mouseover", () => {
                mainImg.src = topImg.src
             })

             let innerHTML = ``
             for (let i in stockData){
                let el = stockData[i]

                innerHTML += `<div class="${i == 0 ? 'tab2' : 'tab'} viewproductdetailssizes" id="viewproductdetailssizes${el.stock_id}">
                <label>
                <input type="radio" name="memory" value="${el.stock_id}" onclick="changePrice(${el.price}, this)">
                ${el.size}
              </label>
            </div>`
             }

             document.getElementById("shoe-sizes-tab").innerHTML = innerHTML
             sessionStorage.setItem("selectedStockId", stockData[0].stock_id)

        }
        else{
            console.log(response.message)
        }
    })
    
   
}

const changePrice = (price, el)=>{
    document.getElementById("product-price").innerHTML = "₱"+price

    let list = document.getElementsByClassName("viewproductdetailssizes")

    sessionStorage.setItem("selectedStockId", el.value)

    for (let i=0; i<list.length; i++){
        if (list[i].id == `viewproductdetailssizes${el.value}`){
            list[i].classList.add("tab2")
            list[i].classList.remove("tab")
        }
        else{
            list[i].classList.remove("tab2")
            list[i].classList.add("tab")
        }
    }
}




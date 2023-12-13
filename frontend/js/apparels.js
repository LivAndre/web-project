const getAllProducts = () => {
    let url = `${getUrl("DEV_URL")}/products/view/apparels`;
  
   

    let content = {
        "method": "GET",
        "headers": {

        }
    }
    
    api_client(url, content, (response)=>{
        if (response.successful == true){
            document.getElementById("total-product-count").innerHTML = response.count
           
            
            populateAllProducts(response.data)
            
        }
        else{
            console.log(response.message)
        }
    })
}


const populateAllProducts = (data)=>{

    

    let innerHTML = ""

    let count = 1
    
    for (let i in data){
        let el = data[i]

        if (count == 1){
            innerHTML += `<div class="row">`
        }

        innerHTML += `
        <div class="product-card">
        <div class="top-section"></div>
        <div class="text-icon">
          <div class="info4">
            <div class="jordan-1-travis-scott">
            ${el["name"]}
            </div>
            <div class="_65-000">₱${el["min_price"]}</div>
          </div>
          <div class="button">
            <div class="label" onclick="redirectToProdDetails('${el['id']}')">Buy Now</div>
          </div>
        </div>
        <img class="j-1-ts-2" src="${el["main_img"]}" />
      </div>
        `
        
        if (count == 3){
            innerHTML += `</div>`
            

        }
        count = count + 1
        if (count > 3){
            count = count - 3
        }
    }

    document.getElementById("product-list").innerHTML = innerHTML
}


const redirectToProdDetails = (id)=>{
    sessionStorage.setItem("selectedProdId", id)

    setTimeout(()=>{
        window.location.href = "ProdInf.html"
    }, 2000)
}
const getNewArrivals = () => {
    let url = `${getUrl("DEV_URL")}/products/view/newarrivals`;
  
   

    let content = {
        "method": "GET",
        "headers": {

        }
    }
    
    api_client(url, content, (response)=>{
        if (response.successful == true){
           
            
            populateNewArrivalProducts(response.data)
            
        }
        else{
            console.log(response.message)
        }
    })
}


const populateNewArrivalProducts = (data)=>{

    

    let innerHTML = ""

    let count = 1
    
    for (let i in data){
        let el = data[i]

        if (count == 1){
            innerHTML += `<div class="roww">`
        }

        innerHTML += `
        <div class="cardd">
        <div class="top-section"></div>
        <div class="text-iconn">
          <div class="info4">
            <div class="jordan-1-travis-scott">
            ${el["name"]}
            </div>
            <div class="_65-000">₱${el["min_price"]}</div>
          </div>
          <div class="buttonn">
            <div class="labell" onclick="redirectToProdDetails('${el['id']}')">Buy Now</div>
          </div>
        </div>
        <img class="j-1-ts-2" src="${el["main_img"]}" />
      </div>
        `
        
        if (count == 4){
            innerHTML += `</div>`
            

        }
        count = count + 1
        if (count > 4){
            count = count - 4
        }
    }

    document.getElementById("product-list").innerHTML = innerHTML
}

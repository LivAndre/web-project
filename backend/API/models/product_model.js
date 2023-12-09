const product_model = (brand_id, category_id , name, created_at, description, main_img, back_img, top_img) =>{
    let product = {
        brand_id : brand_id,
        category_id : category_id,
        name : name,
        created_at : created_at,
        description : description,
        main_img : main_img,
        back_img : back_img,
        top_img : top_img
    }
    
    return product
}

module.exports = {
    product_model
}
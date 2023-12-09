const user_model = (first_name, last_name, address, email, contact_number) =>{
    let user = {
        first_name : first_name,
        last_name : last_name,
        address : address,
        email : email,
        contact_number : contact_number
        
    }
    
    return user
}

module.exports = {
    user_model
}
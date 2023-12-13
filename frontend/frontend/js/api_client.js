function api_client(url, content, callback){
    fetch(url, content)
    .then((response)=>{
        response
        .json()
        .then(object =>{
            callback(object)
        })
    })
    .catch((error)=>{
        error
        .json()
        .then(err =>{
            callback(err)
        })
    })
}
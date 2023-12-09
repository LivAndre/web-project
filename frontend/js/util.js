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
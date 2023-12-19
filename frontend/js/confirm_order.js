function insertUser() {
    const API_URL = "http://localhost:8000/users/add-user"

    const firstName = document.getElementById("fname").value
    const lastName = document.getElementById("lname").value
    const address = document.getElementById("address").value
    const email = document.getElementById("email").value
    const contactNumber = document.getElementById("contact").value

    if (firstName.trim() === '' || !validateAlphabetical(firstName)) {
        alert('Invalid first name')
        return Promise.reject('Invalid first name') // Reject the promise if validation fails
    } else if (lastName.trim() === '' || !validateAlphabetical(lastName)) {
        alert('Invalid last name')
        return Promise.reject('Invalid last name')
    } else if (address.trim() === '' || !validateCity(address)) {
        alert('Invalid address')
        return Promise.reject('Invalid address')
    } else if (email.trim() === '' || !validateEmail(email)) {
        alert('Invalid email')
        return Promise.reject('Invalid email')
    } else if (contactNumber.trim() === '' || !validateNumber(contactNumber)) {
        alert('Invalid contact number')
        return Promise.reject('Invalid contact number')
    }

    const body = {
        first_name: firstName,
        last_name: lastName,
        address: address,
        email: email,
        contact_number: contactNumber,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }

    return new Promise((resolve, reject) => {
        api_client(API_URL, options, function (response) {
            console.log('Response', response)
            resolve(response.id)
        })
    })
}

async function insertTransaction(){
    const API_URL = "http://localhost:8000/transactions/add-transaction"
    const userId = await insertUser()
    console.log(userId)

    const body = {
        cart_id: sessionStorage.getItem("cartId"),
        user_id: userId,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }

    api_client(API_URL, options, function (response){
        console.log('Response', response)
        sessionStorage.setItem("refNum",response.reference_number)
        alert(response.message)
    })
}

async function handlePayment() {
    try {
        await insertTransaction()
        // Redirect after successful transaction
        window.location.href = '/frontend/html/confirm.html'
    } catch (error) {
        console.error('Error:', error)
        // Handle errors if needed
    }
}



const initializeOrderId = ()=>{
    let referenceNum = (sessionStorage.getItem("refNum") === null ? "" : sessionStorage.getItem("refNum"))
    let msg = ""
    if (referenceNum == ""){
        msg = `Reference number not found.<br />`
    }
    else{
        msg = `ORDER #${referenceNum} ONGOING PROCESSING.<br />`
        
    }
    document.getElementById("order-id-message").innerHTML = msg
}

const searchOrderNum = (el)=>{

    if (event.key == "Enter"){
        let reference_number = el.value

        let url = `http://localhost:8000/transactions/view/transaction/reference/${reference_number}`;
    
    
        let content = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }
    
        api_client(url, content, (response) => {
            if (response.successful == false){
                alert(response.message)
                el.value = ""
            }
            else{
                console.log(`get reference details: ${JSON.stringify(response)}`)
                sessionStorage.setItem("orderRefDetails", JSON.stringify(response.data))

                setTimeout(()=>{
                    window.location.href = "receipt.html"
                }, 1000)
            }
        })

    }
}
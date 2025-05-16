let api = "https://682199fa259dad2655afc100.mockapi.io/users"
let username = document.getElementById("username")
let password = document.getElementById("password")
let btn_signup = document.getElementById("btn_signup")


btn_signup.addEventListener("click", async () => {
    
    if(username.value == "" || password.value == ""){
        alert("username or password must not be empty")
        return;
    }

    const res = await fetch(api)
    const users = await res.json()

    let userExist = users.find(user => {
        return user.username == username.value
    })

    if(userExist){
        alert("user already exists")
        return
    }

    // post the user
   await fetch(api, {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(() => {

        localStorage.setItem("username", username.value)
        localStorage.setItem("password", password.value)

        alert("signed up successfully")
        window.location.href = "./login.html"
    })


})
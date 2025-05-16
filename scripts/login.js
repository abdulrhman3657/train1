let api = "https://682199fa259dad2655afc100.mockapi.io/users"
let username = document.getElementById("username")
let password = document.getElementById("password")
let btn_login = document.getElementById("btn_login")

btn_login.addEventListener("click", async () => {
    
    if(username.value == "" || password.value == ""){
        alert("username or password must not be empty")
        return;
    }

    const res = await fetch(api)
    const users = await res.json()

    let userExist = users.find(user => {
        return user.username == username.value
    })

    if(!userExist){
        alert("user does not exist")
        return
    }

    if(userExist.password != password.value){
        alert("wrong username or password")
        return
    }

    localStorage.setItem("username", username.value)
    localStorage.setItem("password", password.value)

    alert("logged in successfully")
    window.location.href = "../index.html"

})
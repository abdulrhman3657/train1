let api = "https://682199fa259dad2655afc100.mockapi.io/posts"

let img_url = document.getElementById("img_url")
let img_text = document.getElementById("img_text")
let btn_add_post = document.getElementById("btn_add_post")

let display_user = document.getElementById("display_user")

if(localStorage.getItem("username")){
    display_user.innerText = localStorage.getItem("username")
}


// get and display posts
const getPosts = async () => {

    const res = await fetch(api)
    const posts = await res.json()

    // console.log(posts)

    posts.forEach(post => {

        let cards_container = document.getElementById("cards_container")

        //  <!-- card -->
        //  <div class="card" style="width: 18rem;">
        //     <img src="" class="card-img-top" alt="...">
        //     <div class="card-body">
        //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
        //         <a href="#" class="btn btn-primary">Go somewhere</a>
        //     </div>
        // </div>

        let card = document.createElement("div")
        card.classList.add("card")
        card.style.width = "18rem"

        let img = document.createElement("img")
        img.src = post.imageURL
        img.classList.add("card-img-top")
        
        let card_body = document.createElement("div")
        card_body.classList.add("card-body")

        let card_text = document.createElement("p")
        card_text.classList.add("card-text")
        card_text.innerText = post.text

        let btn = document.createElement("a")
        btn.href = "#"
        btn.classList.add("btn")
        btn.classList.add("btn-primary")
        btn.innerText = "read more"    
        
        btn.addEventListener("click", () => {

            localStorage.setItem("post", JSON.stringify(post))

            window.location.href = "./pages/card.html"
        })

        let del_btn = document.createElement("button")
        del_btn.classList.add("btn")
        del_btn.classList.add("btn-danger")
        del_btn.classList.add("mx-3")
        del_btn.classList.add("d-none")
        del_btn.innerText = "Delete"

        if(post.username == localStorage.getItem("username")){
            del_btn.classList.remove("d-none")
        }
        
        card_body.appendChild(card_text)
        card_body.appendChild(btn)
        card_body.appendChild(del_btn)

        card.appendChild(img)
        card.appendChild(card_body)
        cards_container.appendChild(card)

    });

}

getPosts()

// add new post
btn_add_post.addEventListener("click", async () => {

    if(!localStorage.getItem("username")){
        alert("you must be logged in to add a post")
        return
    } else if(img_url.value == "" || img_text.value == ""){
        alert("all values must be filled")
        return
    }

    await fetch(api, {
        method: 'POST',
        body: JSON.stringify({
            imageURL: img_url.value,
            text: img_text.value,
            comments: [],
            username: localStorage.getItem("username")
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(() => {
        location.reload();
    })

})
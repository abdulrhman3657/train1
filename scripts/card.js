let api = "https://682199fa259dad2655afc100.mockapi.io/posts"

let post = JSON.parse(localStorage.getItem("post")) 

let btn_add_comment = document.getElementById("btn_add_comment")
let comment_text = document.getElementById("comment_text")

let img = document.getElementById("img")
img.src = post.imageURL

let text = document.getElementById("text")
text.innerText = post.text

const getComments = async () => {

    const res = await fetch(`${api}/${post.id}`)
    const data = await res.json()

    let comments = data.comments
    
    comments.forEach(comment => {
        
        let comments_list = document.getElementById("comments_list")

        let li = document.createElement("li")
        li.classList.add("border")
        li.classList.add("p-3")
        li.classList.add("d-flex")
        li.classList.add("align-items-center")
        li.classList.add("justify-content-between")
        li.classList.add("rounded")

        let span1 = document.createElement("span")
        span1.innerText = comment.username

        let span2 = document.createElement("span")
        span2.innerText = comment.comment

        let del_btn =  document.createElement("button")
        del_btn.classList.add("btn")
        del_btn.classList.add("btn-danger")
        del_btn.classList.add("d-none")

        del_btn.innerText = "Delete"

        if(comment.username == localStorage.getItem("username")){
            del_btn.classList.remove("d-none")
        }

        // delete a comment
        del_btn.addEventListener("click", async () => {

            // comment.comment: the comment clicked on with del btn

            data.comments = data.comments.filter(element => {
                return element.comment != comment.comment
            })

            await fetch(`${api}/${data.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    imageURL: data.imageURL,
                    text: data.text,
                    comments: data.comments
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(() => {
                location.reload();
            })
        })

        li.appendChild(span1)
        li.appendChild(span2)
        li.appendChild(del_btn)

        comments_list.appendChild(li)

    })


    // add new comment
    btn_add_comment.addEventListener("click", async () => {

    let username = localStorage.getItem("username")

    if(!username){
        alert("you must be logged in to add a comment")
        return
    }

    if(comment_text.value == ""){
        alert("you can not add empty comment")
        return
    }

    data.comments.push({username: username, comment: comment_text.value})
    
    await fetch(`${api}/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            imageURL: data.imageURL,
            text: data.text,
            comments: data.comments
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(() => {
        location.reload();
    })

})

}

getComments()


// let api = "https://682199fa259dad2655afc100.mockapi.io/comments"

// let post = JSON.parse(localStorage.getItem("post")) 

// let img = document.getElementById("img")
// img.src = post.imageURL

// let text = document.getElementById("text")
// text.innerText = post.text


// // get and display comments
// const getComments = async () => {

//     const res = await fetch(api)
//     const comments = await res.json()

//     comments.forEach(comment => {
        
//         let comments_list = document.getElementById("comments_list")

//         let li = document.createElement("li")
//         li.classList.add("border")
//         li.classList.add("p-3")
//         li.classList.add("d-flex")
//         li.classList.add("align-items-center")
//         li.classList.add("justify-content-between")
//         li.classList.add("rounded")

//         let span1 = document.createElement("span")
//         span1.innerText = comment.username

//         let span2 = document.createElement("span")
//         span2.innerText = comment.comment

//         let del_btn =  document.createElement("button")
//         del_btn.classList.add("btn")
//         del_btn.classList.add("btn-danger")
//         del_btn.innerText = "Delete"

//         del_btn.addEventListener("click", () => {
//             fetch(`${api}/${comment.id}`, {
//                 method: 'DELETE',
//             }).then(() => {
//                 location.reload();
//             }).catch(err => {
//                 console.log(err)
//             })
//         })

//         li.appendChild(span1)
//         li.appendChild(span2)
//         li.appendChild(del_btn)

//         comments_list.appendChild(li)

//     });

// }

// getComments()


// let btn_add_comment = document.getElementById("btn_add_comment")
// let comment_text = document.getElementById("comment_text")

// btn_add_comment.addEventListener("click", async () => {

//     let username = localStorage.getItem("username")
    
//     await fetch(api, {
//         method: 'POST',
//         body: JSON.stringify({
//             username: username,
//             comment: comment_text.value
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     }).then(() => {
//         location.reload();
//     })

// })




let likeCount = 1;
function fetchQuotes() {
    return fetch("http://localhost:3000/quotes")
    .then(resp => resp.json())
    .then(data => {
        const quoteList = document.getElementById("quote-list");
        data.forEach(quote => {
            const quoteItem = document.createElement("li");
            quoteItem.classList.add = "quote-card";
            quoteItem.innerHTML = `
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button id="${quote.id}" class='btn-danger'>Delete</button>
            `
            quoteList.appendChild(quoteItem);
        })
    })
}

function postQuotes() {
    document.getElementById("new-quote-form").addEventListener("submit", event => {
        event.preventDefault();
        let quoteObj = {
            quote: event.target.elements[0].value,
            author: event.target.elements[1].value
        }
        submitQuotes(quoteObj);
        return fetch("http://localhost:3000/quotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(quoteObj)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))  
    })

}

function submitQuotes(quoteObj) {
    let inputQuote = document.createElement("li");
    inputQuote.classList.add = "quote-card";
    inputQuote.innerHTML = `
    <p class="mb-0">${quoteObj.quote}</p>
    <footer class="blockquote-footer">${quoteObj.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>0</span></button>
    <button id = "${quoteObj.id}" class='btn-danger'>Delete</button>
    `
}

function deleteQuotes(quoteId) {
    return fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

document.addEventListener("DOMContentLoaded", () => {
    fetchQuotes();
    postQuotes();
    document.getElementById("quote-list").addEventListener("click", event => {
        if (event.target.className === "btn-success") {
            event.target.innerHTML = `Likes <span>${likeCount++}</span>`
        } if (event.target.className === "btn-danger") {
            console.log(event.target.id);
            deleteQuotes(event.target.id);
        }
    })
})